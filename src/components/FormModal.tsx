// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import FormFieldSet from '../building-blocks/FormFieldSet';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';
import { formPropsDefaults } from '../propsDefaults';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';

export interface IFormModalProps extends ISharedComponentProps, IFormProps {
  childrenBefore?: React.ReactNode;
}

export interface IFormModalWrappedProps extends IFormModalProps, IWrappedFormProps {}

@autoBindMethods
@observer
class UnwrappedFormModal extends Component<IFormModalWrappedProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IFormModalWrappedProps> = {
    ...formPropsDefaults,
  };

  public constructor (props: IFormModalWrappedProps) {
    super(props);
    const { model, onSave, onCancel } = props;

    this.formManager = new FormManager(
      props.form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: onCancel,
      },
    );
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render () {
    const { title, onCancel, defaults, model, form } = this.props
      , { saveText } = this.props;

    return (
      <Antd.Modal
        confirmLoading={this.formManager.saving}
        okText={this.formManager.saving ? 'Saving...' : saveText}
        onCancel={onCancel}
        onOk={this.formManager.onSave}
        title={title}
        visible
      >
        <Antd.Form onSubmit={this.formManager.onSave} className='notes-form'>
          {this.props.childrenBefore}

          {this.fieldSets.map((fieldSet, idx) => (
            <div key={idx}>
              <FormFieldSet
                defaults={defaults}
                fieldSet={fieldSet}
                form={form}
                formManager={this.formManager}
                model={model}
              />
            </div>
          ))}

          {this.props.children}
        </Antd.Form>
      </Antd.Modal>
    );
  }
}

const WrappedFormModal = Antd.Form.create()(UnwrappedFormModal);

@autoBindMethods
@observer
export class FormModal extends Component<IFormModalProps> {
  public static defaultProps: Partial<IFormModalProps> = {
    ...formPropsDefaults,
  };

  public render () {
    return <WrappedFormModal {...this.props} />;
  }
}

export default FormModal;
