import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop, omit } from 'lodash';

import * as Antd from 'antd';

import FormManager from '../utilities/FormManager';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps, ISharedComponentProps } from '../props';

import Form from './Form';

export interface IFormModalProps extends ISharedComponentProps, ISharedFormProps {
  childrenBefore?: React.ReactNode;
}

@autoBindMethods
@observer
class FormModal extends Component<IFormModalProps> {
  @observable private formManager?: FormManager;

  public static defaultProps: Partial<IFormModalProps> = {
    ...formPropsDefaults,
  };

  private get modalProps () {
    const { saveText } = this.props;

    if (!this.formManager) {
      return {
        confirmLoading: true,
        okText: saveText,
        onOk: noop,
      };
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
    const { title, onCancel } = this.props
      , HANDLED_PROPS = ['title', 'children', 'childrenBefore'];

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
          showControls={false}
          {...omit(this.props, HANDLED_PROPS)}
        />

        {this.props.children}
      </Antd.Modal>
    );
  }
}

export default FormModal;
