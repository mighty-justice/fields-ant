import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop } from 'lodash';

import * as Antd from 'antd';

import FormModalUtils from '../utilities/FormModalUtils';
import { FormManager } from '../utilities';
import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps } from '../props';

import Form from './Form';

@autoBindMethods
@observer
class FormModal extends Component<ISharedFormModalProps> {
  @observable private formManager?: FormManager;
  private formModalUtils: FormModalUtils;

  public constructor (props: ISharedFormModalProps) {
    super(props);
    this.formModalUtils = new FormModalUtils(props);
  }

  public static defaultProps: Partial<ISharedFormModalProps> = {
    ...formPropsDefaults,
  };

  private get modalProps () {
    const { saveText } = this.props;

    if (!this.formManager) {
      return {
        confirmLoading: true,
        okButtonProps: { disabled: true },
        okText: saveText,
        onOk: noop,
      };
    }

    return {
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
    const { title, width } = this.props
      , { isVisible, onCancel, onSuccess, formProps } = this.formModalUtils
      ;

    if (!isVisible) { return null; }

    return (
      <Antd.Modal
        onCancel={onCancel}
        title={title}
        visible={true}
        width={width}
        {...this.modalProps}
      >
        {this.props.childrenBefore}

        <Form
          {...formProps}
          onCancel={onCancel}
          onSuccess={onSuccess}
          setRefFormManager={this.setRefFormManager}
          showControls={false}
        />
      </Antd.Modal>
    );
  }
}

export default FormModal;
