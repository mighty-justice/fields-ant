import { get, set, noop } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import flatten from 'flat';
import * as Antd from 'antd';
import { observable } from 'mobx';

import { IFieldSet } from '../interfaces';
import { getFieldSetFields } from './common';

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
      const description = get(err, 'request.responseText', 'No Response from server');

      // tslint:disable-next-line no-console
      console.warn(`FormManager.onSave error: ${description}`);

      Antd.notification.error({
        description,
        duration: null,
        message: 'Error submitting form',
      });
    }
    finally {
      this.saving = false;
    }
  }
}

export default FormManager;
