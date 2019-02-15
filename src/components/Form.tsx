// tslint:disable max-classes-per-file
import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import FormFieldSet from '../building-blocks/FormFieldSet';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';
import { formPropsDefaults } from '../propsDefaults';
import { IFieldSet } from '../interfaces';

import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
import { ButtonToolbar } from '../index';

export interface IFormComponentProps extends ISharedComponentProps, IFormProps {
  setRefFormManager?: (formManager: FormManager) => void;
}

export interface IFormWrappedProps extends IFormComponentProps, IWrappedFormProps {}

@autoBindMethods
@observer
export class UnwrappedForm extends Component<IFormWrappedProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IFormWrappedProps> = {
    ...formPropsDefaults,
  };

  public constructor (props: IFormWrappedProps) {
    super(props);
    const { model, onSave, onCancel, form, setRefFormManager } = props as IFormWrappedProps;

    this.formManager = new FormManager(
      form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: onCancel,
      },
    );

    if (setRefFormManager) {
      setRefFormManager(this.formManager);
    }
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render () {
    const { onCancel, defaults, model, form, saveText } = this.props;

    return (
      <Antd.Form layout='vertical' onSubmit={this.formManager.onSave} className='mfa-form'>
        {this.fieldSets.map((fieldSet: IFieldSet, idx: number) => (
          <Fragment key={idx}>
            {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}
            <div>
              <FormFieldSet
                defaults={defaults}
                fieldSet={fieldSet}
                form={form}
                formManager={this.formManager}
                model={model}
              />
            </div>
          </Fragment>
        ))}

        {this.props.children}

        <Antd.Divider />

        <ButtonToolbar align='right'>
          <Antd.Button
            disabled={this.formManager.saving}
            onClick={onCancel}
            size='large'
          >
            Cancel
          </Antd.Button>

          <Antd.Button
            htmlType='submit'
            loading={this.formManager.saving}
            size='large'
            type='primary'
          >
            {saveText}
          </Antd.Button>
        </ButtonToolbar>
      </Antd.Form>
    );
  }
}

// istanbul ignore next
const WrappedForm = Antd.Form.create()(UnwrappedForm);

@autoBindMethods
@observer
export class Form extends Component<IFormComponentProps> {
  public static defaultProps: Partial<IFormWrappedProps> = {
    ...formPropsDefaults,
  };

  public render () {
    return <WrappedForm {...this.props} />;
  }
}

export default Form;
