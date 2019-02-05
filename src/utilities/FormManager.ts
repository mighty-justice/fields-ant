import { get, set, noop, mapValues, pickBy } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import flatten from 'flat';
import * as Antd from 'antd';
import { observable } from 'mobx';

import { IFieldSet } from '../interfaces';

import { getFieldSetFields } from './common';
import backendValidation from './backendValidation';

interface IArgs {
  fieldSets: IFieldSet[];
  form: any;
  model: { [key: string]: any, id?: string };
  onSave: (data: { [key: string]: any }) => void | Promise<void>;
  onSuccess: () => void;
}

const toastError = {
  description: '',
  duration: null,
  message: 'Error submitting form',
};

@autoBindMethods
class FormManager {
  @observable public saving = false;
  @observable public skipFieldDecorator = new Map();
  private args: IArgs;

  public constructor (form: any, fieldSets: IFieldSet[], args: Partial<IArgs>) {
    this.args = {
      fieldSets,
      form,
      model: {},
      onSave: noop,
      onSuccess: noop,
      ...pickBy(args, value => value !== undefined),
    };
  }

  public get formModel () {
    const { form, fieldSets } = this.args
      , model = form.getFieldsValue();

    fieldSets.forEach(fieldSet => {
      getFieldSetFields(fieldSet).forEach(fieldConfig => {
        const formValue = get(model, fieldConfig.field)
          , value = fieldConfig.fromForm(formValue);

        if (!value && fieldConfig.nullify) {
          set(model, fieldConfig.field, null);
        }
        else {
          set(model, fieldConfig.field, value);
        }
      });
    });

    if (this.args.model && this.args.model.id) {
      model.id = this.args.model.id;
    }

    return model;
  }

  private get hasValidationErrors () {
    const { form } = this.args;
    return Object.values(flatten(form.getFieldsError())).some(field => !!field);
  }

  private get formValues () {
    return this.args.form.getFieldsValue();
  }

  private get formFieldNames () {
    return Object.keys(this.formValues);
  }

  private onSuccess () {
    const { onSuccess } = this.args;
    Antd.notification.success({ description: '', duration: 3, message: 'Success' });
    onSuccess();
  }

  private setErrorsOnFormFields (errors: { [key: string]: string }) {
    const { form } = this.args;
    form.setFields(mapValues(errors, (error, field) => ({
      errors: [new Error(error)],
      value: this.formValues[field],
    })));
  }

  private notifyUserAboutErrors (errors: Array<{ field: string, message: string }>) {
    errors.forEach(description => {
      Antd.notification.error({ ...toastError, description });
    });
  }

  private handleBackendResponse (response?: any) {
    if (!response || !response.data) {
      Antd.notification.error(toastError);
      return;
    }

    const { foundOnForm, errorMessages } = backendValidation(this.formFieldNames, response.data);
    this.setErrorsOnFormFields(foundOnForm);
    this.notifyUserAboutErrors(errorMessages);
  }

  public async onSave (event: any) {
    const { form, onSave } = this.args;

    event.preventDefault();
    form.validateFields();

    if (this.hasValidationErrors) { return; }

    this.saving = true;
    try {
      await onSave(this.formModel);
      this.onSuccess();
    }
    catch (err) {
      this.handleBackendResponse(err.response);
    }
    finally {
      this.args.form.resetFields();
      this.saving = false;
    }
  }
}

export default FormManager;
