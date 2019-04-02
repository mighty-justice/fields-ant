import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import flattenObject from 'flat';
import httpStatus from 'http-status-codes';

import {
  get,
  has,
  mapValues,
  noop,
  pickBy,
  set,
} from 'lodash';

import * as Antd from 'antd';

import { IFieldConfigPartial, IFieldSet } from '../interfaces';
import { IForm, IModel } from '../props';

import backendValidation from './backendValidation';
import { fillInFieldConfig, getFieldSetsFields, modelFromFieldConfigs } from './common';
import { ID_ATTR } from '../consts';

export interface IFoundOnForm { [key: string]: string; }
export interface IErrorMessage { field: string; message: string; }

export interface IBackendValidation {
  errorMessages: IErrorMessage[];
  foundOnForm: IFoundOnForm;
}

interface IArgs {
  defaults: IModel;
  fieldSets: IFieldSet[];
  model: IModel;
  onSave: (data: IModel) => void | Promise<void>;
  onSuccess: () => any | Promise<any>;
}

interface IFormWrappedInstance {
  props: {
    form: IForm,
  };
}

export const toastError = {
  description: '',
  duration: null,
  message: 'Error submitting form',
};

@autoBindMethods
class FormManager {
  @observable public saving = false;
  private args: IArgs;
  public formWrappedInstance: IFormWrappedInstance;

  public constructor (formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>) {
    this.formWrappedInstance = formWrappedInstance;
    this.args = {
      defaults: {},
      fieldSets,
      model: {},
      onSave: noop,
      onSuccess: noop,
      ...pickBy(args, value => value !== undefined),
    };
  }

  public get form () {
    // The form prop continuously changes identity, so we can't just save it locally
    return this.formWrappedInstance.props.form;
  }

  public get fieldConfigs () {
    return getFieldSetsFields(this.args.fieldSets);
  }

  public getDefaultValue (fieldConfigPartial: IFieldConfigPartial) {
    const { model, defaults } = this.args
      , fieldConfig = fillInFieldConfig(fieldConfigPartial)
      , modelToValue = (from: IModel) => get(from, fieldConfig.field)
      , modelToForm = (from: IModel) => fieldConfig.toForm(modelToValue(from), fieldConfig)
      ;

    if (has(fieldConfig, 'value')) {
      return fieldConfig.toForm(fieldConfig.value, fieldConfig);
    }

    if (has(model, fieldConfig.field)) {
      return modelToForm(model);
    }

    if (has(defaults, fieldConfig.field)) {
      return modelToForm(defaults);
    }

    return modelToForm({ ...model, ...defaults });
  }

  public getFormValue (fieldConfigPartial: IFieldConfigPartial) {
    const fieldConfig = fillInFieldConfig(fieldConfigPartial)
      , formValue = get(this.formValues, fieldConfig.field)
      , convertedValue = fieldConfig.fromForm(formValue, fieldConfig)
      ;

    return convertedValue;
  }

  private get formValues () {
    // WARNING: Pure unprocessed rc-form response
    // formValues < formModel < submitModel
    return this.form.getFieldsValue();
  }

  public get formModel () {
    /*
    formValues < formModel < submitModel

    Get the current value of all fields according to rc-form,
    or so that we have the model before the first render,
    compile it from all the default values.

    WARNING: This will include many values you don't see on the page.
    Use submitModel to get the fully processed form state.
    */
    const formValues: IModel = {};

    this.fieldConfigs.forEach(fieldConfig => {
      const isInForm = has(this.formValues, fieldConfig.field)
        , value = isInForm ? this.getFormValue(fieldConfig) : this.getDefaultValue(fieldConfig)
        ;

      set(formValues, fieldConfig.field, value);
    });

    // We always include ids of models on submit
    const id = get(this.args.model, ID_ATTR);
    if (id) { set(formValues, ID_ATTR, id); }

    return formValues;
  }

  public get submitModel (): IModel {
    /*
    formValues < formModel < submitModel

    This is the finalized form model. We only use it in critical situations like onSubmit
    because many of the places we use formModel are used to build submitModel.

    For example: We can't call all insertIf functions to build submitModel if those functions
    are called with submitModel. So we use formModel unless we need perfection.
    */
    return modelFromFieldConfigs(this.fieldConfigs, this.formModel);
  }

  public get formFieldNames () {
    return Object.keys(flattenObject<{ [key: string]: any }, { [key: string]: any }>(this.formValues));
  }

  private onSuccess () {
    const { onSuccess } = this.args;
    Antd.notification.success({ description: '', duration: 3, message: 'Success' });
    onSuccess();
  }

  private setErrorsOnFormFields (errors: { [key: string]: string }) {
    this.form.setFields(mapValues(errors, (error, field) => ({
      errors: [new Error(error)],
      value: this.formValues[field],
    })));
  }

  private notifyUserAboutErrors (errors: IErrorMessage[]) {
    errors.forEach(({ field, message }) => {
      const description = `${field} - ${message}`;
      Antd.notification.error({ ...toastError, description });
    });
  }

  private handleRequestError (error: Error & { response?: any }) {
    /*
    Here we take the raw axios error and try to extract as much information from it as we can
    and use it to inform the user. If we're lucky, we have a nicely formatted JSON bad request
    response. If so, we will try to assign those validation errors to fields, and if that fails
    we will display them in toast notifications.
    */
    const status = get(error, 'response.status') as undefined | number
      , backendErrors: IBackendValidation = { foundOnForm: {}, errorMessages: [] };

    function logError () {
      // tslint:disable-next-line no-console
      console.error('Error submitting form:', { error });
    }

    // A response with no status cannot be reasoned with
    // istanbul ignore next
    if (!status) {
      backendErrors.errorMessages.push({ field: '', message: '' });
      logError();
    }

    // Errors like 500 and 403 Forbidden should be as descriptive as possible
    if (status && status !== httpStatus.BAD_REQUEST) {
      const statusMessage = httpStatus.getStatusText(status);
      backendErrors.errorMessages.push({ field: status.toString(), message: statusMessage });
      logError();
    }

    // Bad request errors are mapped to fields when possible
    if (status === httpStatus.BAD_REQUEST) {
      const { foundOnForm, errorMessages } = backendValidation(this.formFieldNames, error.response.data);
      backendErrors.errorMessages = [...backendErrors.errorMessages, ...errorMessages];
      backendErrors.foundOnForm = {...backendErrors.foundOnForm, ...foundOnForm };
    }

    this.setErrorsOnFormFields(backendErrors.foundOnForm);
    this.notifyUserAboutErrors(backendErrors.errorMessages);
  }

  private async validateThenSaveCallback (errors: any, _values: any) {
    /*
    rc-form validateFields cannot be awaited and takes a callback as input,
    so we have to split the bulk of onSave out into this function to make
    sure we don't try to submit an un-validated form.
    */
    const { onSave } = this.args;
    this.saving = true;
    if (errors) { this.saving = false; return; }

    try {
      await onSave(this.submitModel);
      this.onSuccess();
      this.form.resetFields();
    }
    catch (error) {
      this.handleRequestError(error);
    }
    finally {
      this.saving = false;
    }
  }

  public async onSave (event: any) {
    event.preventDefault();

    this.saving = true;
    this.form.validateFields(this.validateThenSaveCallback);
  }
}

export default FormManager;
