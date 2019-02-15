import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import FormManager from '../utilities/FormManager';
import { formPropsDefaults } from '../propsDefaults';
import { IFormProps, ISharedComponentProps } from '../props';

import Form from './Form';

export interface IFormModalProps extends ISharedComponentProps, IFormProps {
  childrenBefore?: React.ReactNode;
}

@autoBindMethods
@observer
class FormModal extends Component<IFormModalProps> {
  private formManager?: FormManager;

  public static defaultProps: Partial<IFormModalProps> = {
    ...formPropsDefaults,
  };

  private get modalProps () {
    const { saveText } = this.props;

    if (!this.formManager) {
      return {};
    }

    return {
      confirmLoading: this.formManager.saving,
      okText: this.formManager.saving ? 'Saving...' : saveText,
      onOk: this.formManager.onSave,
    };
  }

  private setRefFormManager (formManager: FormManager) {
    this.formManager = formManager;
  }

  public render () {
    const { title, onCancel } = this.props;

    return (
      <Antd.Modal
        onCancel={onCancel}
        title={title}
        visible
        {...this.modalProps}
      >
        {this.props.childrenBefore}

        <Form
          setRefFormManager={this.setRefFormManager}
          {...this.props}
        />

        {this.props.children}
      </Antd.Modal>
    );
  }
}

export default FormModal;
