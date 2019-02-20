import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import flattenObject from 'flat';

import {
  flatten as flattenArray,
  get,
  mapValues,
  noop,
  pickBy,
  set,
} from 'lodash';

import * as Antd from 'antd';

import { IFieldConfigPartial, IFieldSet } from '../interfaces';
import { IForm, IModel } from '../props';

import backendValidation from './backendValidation';
import { fillInFieldConfig, getFieldSetFields } from './common';

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

const toastError = {
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
    return flattenArray(this.args.fieldSets.map(getFieldSetFields));
  }

  public getDefaultValue (fieldConfigPartial: IFieldConfigPartial) {
    const { model, defaults } = this.args
      , fieldConfig = fillInFieldConfig(fieldConfigPartial);

    return (
      fieldConfig.value
      || fieldConfig.toForm(model, fieldConfig.field)
      || fieldConfig.toForm(defaults, fieldConfig.field)
    );
  }

  public get formModel () {
    const model = this.form.getFieldsValue();

    this.fieldConfigs.forEach(fieldConfig => {
      const formValue = get(model, fieldConfig.field)
        , value = fieldConfig.fromForm(formValue);

      if (!value && fieldConfig.nullify) {
        set(model, fieldConfig.field, null);
      }
      else {
        set(model, fieldConfig.field, value);
      }
    });

    if (this.args.model && this.args.model.id) {
      model.id = this.args.model.id;
    }

    return model;
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
    if (!response || !response.data) {
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
        await onSave(this.formModel);
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
