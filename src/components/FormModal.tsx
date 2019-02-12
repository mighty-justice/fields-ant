import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import FormFieldSet from '../building-blocks/FormFieldSet';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';

export interface IFormModalProps extends ISharedComponentProps, IWrappedFormProps, IFormProps {
  childrenBefore?: React.ReactNode;
}

interface IPropDefaults extends IFormModalProps {
  saveText: string;
}

@autoBindMethods
@observer
class FormModal extends Component<IFormModalProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IFormModalProps> = {
    saveText: 'Save',
  };

  public get propsWithDefaults () {
    return this.props as IPropDefaults;
  }

  public constructor (props: IFormModalProps) {
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
      , { saveText } = this.propsWithDefaults;

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

const WrappedFormModal = Antd.Form.create()(FormModal);

export default WrappedFormModal;
