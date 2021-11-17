import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop } from 'lodash';
import cx from 'classnames';

import { Modal } from 'antd';
import { ModalProps } from 'antd/es/modal';

import { FormManager } from '../utilities';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps } from '../props';
import { CLASS_PREFIX } from '../consts';

import Form from './Form';

const CLASS_NAME = `${CLASS_PREFIX}-form-modal`;

@autoBindMethods
@observer
class FormModal extends Component<ISharedFormModalProps> {
  @observable private formManager?: FormManager;

  public constructor(props: ISharedFormModalProps) {
    super(props);
  }

  public static defaultProps = {
    ...formPropsDefaults,
  };

  public get isVisible() {
    const { isVisible } = this.props;
    return isVisible ? isVisible.isTrue : true;
  }

  public get formProps() {
    const { title: _title, isVisible: _isVisible, childrenBefore: _childrenBefore, ...formProps } = this.props;

    return formProps;
  }

  public onCancel() {
    const { onCancel, isVisible } = this.props;
    if (onCancel) {
      onCancel();
    }
    if (isVisible && !onCancel) {
      isVisible.setFalse();
    }
  }

  public async onSuccess() {
    const { onSuccess, isVisible } = this.props;
    if (onSuccess) {
      await onSuccess();
    }
    if (isVisible && !onSuccess) {
      isVisible.setFalse();
    }
  }

  private get modalProps(): Partial<ModalProps> {
    const { cancelText, saveText } = this.props,
      className = cx(CLASS_NAME, this.props.className);

    if (!this.formManager) {
      return {
        cancelButtonProps: { disabled: true },
        cancelText,
        className,
        confirmLoading: true,
        okButtonProps: { disabled: true },
        okText: saveText,
        onOk: noop,
      };
    }

    const { isCancelButtonDisabled, isSubmitButtonDisabled, onSubmit, isSaving } = this.formManager;

    return {
      cancelButtonProps: { disabled: isCancelButtonDisabled },
      cancelText,
      className,
      confirmLoading: isSaving,
      okButtonProps: { disabled: isSubmitButtonDisabled, htmlType: 'submit' },
      okText: isSaving ? 'Saving...' : saveText,
      onOk: onSubmit,
    };
  }

  private setRefFormManager(formManager: FormManager) {
    const { setRefFormManager } = this.props;
    this.formManager = formManager;
    if (setRefFormManager) {
      setRefFormManager(formManager);
    }
  }

  public render() {
    const { title, width } = this.props;

    if (!this.isVisible) {
      return null;
    }

    return (
      <Modal onCancel={this.onCancel} title={title} visible={true} width={width} {...this.modalProps}>
        {this.props.childrenBefore}

        <Form
          {...this.formProps}
          onCancel={this.onCancel}
          onSuccess={this.onSuccess}
          setRefFormManager={this.setRefFormManager}
          showControls={false}
        />
      </Modal>
    );
  }
}

export default FormModal;
