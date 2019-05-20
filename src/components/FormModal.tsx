import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop, omit } from 'lodash';

import * as Antd from 'antd';

import { FormManager } from '../utilities';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps } from '../props';

import Form from './Form';

@autoBindMethods
@observer
class FormModal extends Component<ISharedFormModalProps> {
  @observable private formManager?: FormManager;

  public static defaultProps: Partial<ISharedFormModalProps> = {
    ...formPropsDefaults,
  };

  private onCancel () {
    const { onCancel, isVisible } = this.props;
    if (onCancel) { onCancel(); }
    if (isVisible && !onCancel) { isVisible.setFalse(); }
  }

  private async onSuccess () {
    const { onSuccess, isVisible } = this.props;
    if (onSuccess) { await onSuccess(); }
    if (isVisible && !onSuccess) { isVisible.setFalse(); }
  }

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
    const { isVisible, title, width } = this.props
      , HANDLED_PROPS = ['title', 'isVisible', 'children', 'childrenBefore'];

    return (
      <Antd.Modal
        onCancel={this.onCancel}
        title={title}
        visible={isVisible ? isVisible.isTrue : true}
        width={width}
        {...this.modalProps}
      >
        {this.props.childrenBefore}

        <Form
          {...omit(this.props, HANDLED_PROPS)}
          onCancel={this.onCancel}
          onSuccess={this.onSuccess}
          setRefFormManager={this.setRefFormManager}
          showControls={false}
        />

        {this.props.children}
      </Antd.Modal>
    );
  }
}

export default FormModal;
