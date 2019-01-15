import { get, set, noop, mapValues } from 'lodash';
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

@autoBindMethods
class FormManager {
  @observable public saving = false;
  private args: IArgs;

  public constructor (form: any, fieldSets: IFieldSet[], args: Partial<IArgs>) {
    this.args = {
      fieldSets,
      form,
      model: {},
      onSave: noop,
      onSuccess: noop,
      ...args,
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

  public async onSave (event: any) {
    const { form, onSave, onSuccess } = this.args;
    event.preventDefault();

    form.validateFields();

    const hasValidationErrors = Object.values(flatten(form.getFieldsError())).some(field => !!field);
    if (hasValidationErrors) { return; }

    this.saving = true;
    try {
      await onSave(this.formModel);

      Antd.notification.success({
        description: '',
        duration: 3,
        message: 'Success',
      });
      onSuccess();
    }
    catch (err) {
      const fieldValues = form.getFieldsValue()
        , fieldNames = Object.keys(fieldValues)
        , { foundOnForm, errorMessages } = backendValidation(fieldNames, err.response.data);

      form.setFields(mapValues(foundOnForm, (error, field) => ({
        errors: [new Error(error)],
        value: fieldValues[field],
      })));

      errorMessages.forEach(description => {
        Antd.notification.error({
          description,
          duration: null,
          message: 'Error submitting form',
        });
      });
    }
    finally {
      this.args.form.resetFields();
      this.saving = false;
    }
  }
}

export default FormManager;
