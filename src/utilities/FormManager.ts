import { ComponentClass } from 'react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import flattenObject from 'flat';
import httpStatus from 'http-status-codes';

import { get, has, mapValues, noop, pickBy, set } from 'lodash';

import * as Antd from 'antd';
import { FormInstance } from 'antd/es/form';

import { ID_ATTR, TOAST_DURATION } from '../consts';
import { IFieldConfig, IFieldSet } from '../interfaces';
import { IFormWrappedProps } from '../components/Form';
import { IModel, IValue } from '../props';

import backendValidation from './backendValidation';
import { getFieldSetsFields, modelFromFieldConfigs } from './common';
import { fillInFieldSets } from './fillIn';

export interface IFoundOnForm {
  [key: string]: string;
}
export interface IErrorMessage {
  field: string;
  message: string;
}

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
  processErrors: (errors: IBackendValidation) => IBackendValidation;
  resetOnSuccess: boolean;
  successText: null | string;
}

type IFormWrappedInstance = InstanceType<ComponentClass<IFormWrappedProps>>;

export const ERROR_WITH_DESCRIPTION = [httpStatus.BAD_REQUEST, httpStatus.FORBIDDEN];

export const toastError = {
  description: '',
  duration: TOAST_DURATION,
  message: 'Error submitting form',
};

@autoBindMethods
class FormManager {
  @observable public isSaving = false;
  private args: IArgs;
  public formWrappedInstance: IFormWrappedInstance;

  public constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>) {
    this.formWrappedInstance = formWrappedInstance;
    this.args = {
      defaults: {},
      fieldSets,
      model: {},
      onSave: noop,
      onSuccess: noop,
      processErrors: errors => errors,
      resetOnSuccess: true,
      successText: 'Success',
      ...pickBy(args, value => value !== undefined),
    };
  }

  public get form(): FormInstance { // WrappedFormUtils {
    // The form prop continuously changes identity, so we can't just save it locally
    return this.formWrappedInstance.props.form;
  }

  public get isFormDisabled(): boolean {
    // The disabled prop can be changed any time, so we can't just save it locally
    return this.isSaving || !!this.formWrappedInstance.props.disabled;
  }

  public get fieldSets(): IFieldSet[] {
    // The fieldSets prop can be changed any time, so try to get them dynamically if you can
    const fieldSetsProp = this.formWrappedInstance.props.fieldSets;
    return fieldSetsProp ? fillInFieldSets(fieldSetsProp) : this.args.fieldSets;
  }

  public get fieldConfigs(): IFieldConfig[] {
    return getFieldSetsFields(this.fieldSets);
  }

  public get isSubmitButtonDisabled(): boolean {
    return this.hasErrors() || this.isFormDisabled;
  }

  public get isCancelButtonDisabled(): boolean {
    return this.isFormDisabled;
  }

  public getDefaultValue(fieldConfig: IFieldConfig): IValue {
    const { model, defaults } = this.args,
      modelToValue = (from: IModel) => get(from, fieldConfig.field),
      modelToForm = (from: IModel) => fieldConfig.toForm(modelToValue(from), fieldConfig);

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

  public getFormValue(fieldConfig: IFieldConfig, formValues: IModel): IValue {
    const formValue = get(formValues, fieldConfig.field),
      convertedValue = fieldConfig.fromForm(formValue, fieldConfig);

    return convertedValue;
  }

  private get formValues() {
    // WARNING: Pure unprocessed rc-form response
    // formValues < formModel < submitModel
    return this.form.getFieldsValue();
  }

  public get formModel() {
    /*
    formValues < formModel < submitModel

    Get the current value of all fields according to rc-form,
    or so that we have the model before the first render,
    compile it from all the default values.

    WARNING: This will include many values you don't see on the page.
    Use submitModel to get the fully processed form state.
    */
    const formModel: IModel = {},
      formValues = this.formValues;

    this.fieldConfigs.forEach(fieldConfig => {
      const isInForm = has(formValues, fieldConfig.field),
        value = isInForm
          ? this.getFormValue(fieldConfig, formValues)
          : fieldConfig.fromForm(this.getDefaultValue(fieldConfig), fieldConfig);

      set(formModel, fieldConfig.field, value);
    });

    // We always include ids of models on submit
    const id = get(this.args.model, ID_ATTR);
    if (id) {
      set(formModel, ID_ATTR, id);
    }

    return formModel;
  }

  public get submitModel(): IModel {
    /*
    formValues < formModel < submitModel

    This is the finalized form model. We only use it in critical situations like onSubmit
    because many of the places we use formModel are used to build submitModel.

    For example: We can't call all insertIf functions to build submitModel if those functions
    are called with submitModel. So we use formModel unless we need perfection.
    */
    return modelFromFieldConfigs(this.fieldConfigs, this.formModel);
  }

  public get formFieldNames() {
    return Object.keys(flattenObject<{ [key: string]: any }, { [key: string]: any }>(this.formValues));
  }

  private onSuccess() {
    const { onSuccess, successText } = this.args;

    if (successText) {
      Antd.notification.success({
        description: '',
        duration: TOAST_DURATION,
        message: successText,
      });
    }
    onSuccess();
  }

  private setErrorsOnFormFields(errors: { [key: string]: string }) {
    const formValues = this.formValues;
    this.form.setFields(
      mapValues(errors, (error, field) => ({
        errors: [new Error(error)],
        value: get(formValues, field),
      })) as any,
    );
  }

  private notifyUserAboutErrors(errors: IErrorMessage[]) {
    errors.forEach(({ field, message }) => {
      const description = [field, message].filter(s => !!s).join(' - ');
      Antd.notification.error({ ...toastError, description });
    });
  }

  private hasErrors() {
    const fieldsError = flattenObject<{ [key: string]: any }, { [key: string]: any }>(this.form.getFieldsError());
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  private handleRequestError(error: Error & { response?: any }) {
    /*
    Here we take the raw axios error and try to extract as much information from it as we can
    and use it to inform the user. If we're lucky, we have a nicely formatted JSON bad request
    response. If so, we will try to assign those validation errors to fields, and if that fails
    we will display them in toast notifications.
    */
    const status = get(error, 'response.status') as undefined | number;
    let backendErrors: IBackendValidation = { foundOnForm: {}, errorMessages: [] };

    function logError() {
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
    if (status && !ERROR_WITH_DESCRIPTION.includes(status)) {
      const statusMessage = httpStatus.getStatusText(status);
      backendErrors.errorMessages.push({ field: status.toString(), message: statusMessage });
      logError();
    }

    // Bad request errors are mapped to fields when possible
    if (status && ERROR_WITH_DESCRIPTION.includes(status)) {
      const { foundOnForm, errorMessages } = backendValidation(this.formFieldNames, error.response.data);
      backendErrors.errorMessages = [...backendErrors.errorMessages, ...errorMessages];
      backendErrors.foundOnForm = { ...backendErrors.foundOnForm, ...foundOnForm };
    }

    // This gives the user an opportunity to override, rewrite, or add errors
    backendErrors = this.args.processErrors(backendErrors);
    this.setErrorsOnFormFields(backendErrors.foundOnForm);
    this.notifyUserAboutErrors(backendErrors.errorMessages);
  }

  private async validateThenSaveCallback(errors: any, _values: any) {
    /*
    rc-form validateFields cannot be awaited and takes a callback as input,
    so we have to split the bulk of onSave out into this function to make
    sure we don't try to submit an un-validated form.
    */
    const { onSave } = this.args;
    this.isSaving = true;
    if (errors) {
      this.isSaving = false;
      return;
    }

    try {
      await onSave(this.submitModel);
      this.onSuccess();
      if (this.args.resetOnSuccess) {
        this.form.resetFields();
      }
    } catch (error) {
      this.handleRequestError(error);
    } finally {
      this.isSaving = false;
    }
  }

  public async onSave(event?: any) {
    if (event) {
      event.preventDefault();
    }

    this.isSaving = true;
    this.form.validateFields(this.validateThenSaveCallback as any);
  }
}

export default FormManager;
