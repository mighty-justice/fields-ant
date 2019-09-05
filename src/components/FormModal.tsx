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

  public constructor (props: ISharedFormModalProps) {
    super(props);
  }

  public static defaultProps: Partial<ISharedFormModalProps> = {
    ...formPropsDefaults,
  };

  public get isVisible () {
    const { isVisible } = this.props;
    return isVisible ? isVisible.isTrue : true;
  }

  public get formProps () {
    const HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];
    return omit(this.props, HANDLED_PROPS);
  }

  public onCancel () {
    const { onCancel, isVisible } = this.props;
    if (onCancel) { onCancel(); }
    if (isVisible && !onCancel) { isVisible.setFalse(); }
  }

  public async onSuccess () {
    const { onSuccess, isVisible } = this.props;
    if (onSuccess) { await onSuccess(); }
    if (isVisible && !onSuccess) { isVisible.setFalse(); }
  }

  private get modalProps () {
    const { cancelText, saveText, className } = this.props;

    if (!this.formManager) {
      return {
        cancelText,
        className,
        confirmLoading: true,
        okButtonProps: { disabled: true },
        okText: saveText,
        onOk: noop,
      };
    }

    return {
      cancelText,
      className,
      confirmLoading: this.formManager.saving,
      okButtonProps: { disabled: this.formManager.submitButtonDisabled },
      okText: this.formManager.saving ? 'Saving...' : saveText,
      onOk: this.formManager.onSave,
    };
  }

  private setRefFormManager (formManager: FormManager) {
    this.formManager = formManager;
  }

  public render () {
    const { title, width } = this.props;

    if (!this.isVisible) { return null; }

    return (
      <Antd.Modal
        onCancel={this.onCancel}
        title={title}
        visible={true}
        width={width}
        {...this.modalProps}
      >
        {this.props.childrenBefore}

        <Form
          {...this.formProps}
          onCancel={this.onCancel}
          onSuccess={this.onSuccess}
          setRefFormManager={this.setRefFormManager}
          showControls={false}
        />
      </Antd.Modal>
    );
  }
}

export default FormModal;
