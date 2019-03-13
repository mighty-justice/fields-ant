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

  public get formModel () {
    const formValues: IModel = {};

    this.fieldConfigs.forEach(fieldConfig => {
      const isInForm = has(this.formValues, fieldConfig.field)
        , value = isInForm ? this.getFormValue(fieldConfig) : this.getDefaultValue(fieldConfig)
        ;

      set(formValues, fieldConfig.field, value);
    });

    const id = get(this.args.model, ID_ATTR);
    if (id) { set(formValues, ID_ATTR, id); }

    return formValues;
  }

  public get submitModel (): IModel {
    return modelFromFieldConfigs(this.fieldConfigs, this.formModel);
  }

  private get formValues () {
    return this.form.getFieldsValue();
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

  private notifyUserAboutErrors (errors: Array<{ field: string, message: string }>) {
    errors.forEach(({ field, message }) => {
      const description = `${field} - ${message}`;
      Antd.notification.error({ ...toastError, description });
    });
  }

  private handleBackendResponse (response?: any) {
    // istanbul ignore next
    if (get(response, 'status') !== httpStatus.BAD_REQUEST) {
      Antd.notification.error(toastError);
      return;
    }

    const { foundOnForm, errorMessages } = backendValidation(this.formFieldNames, response.data);
    this.setErrorsOnFormFields(foundOnForm);
    this.notifyUserAboutErrors(errorMessages);
  }

  private async validateThenSaveCallback (errors: any, _values: any) {
      const { onSave } = this.args;
      this.saving = true;
      if (errors) { this.saving = false; return; }

      try {
        await onSave(this.submitModel);
        this.onSuccess();
        this.form.resetFields();
      }
      catch (err) {
        this.handleBackendResponse(err.response);
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
