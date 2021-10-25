import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Drawer } from 'antd';

import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps } from '../props';
import { CLASS_PREFIX } from '../consts';

import Form from './Form';

const CLASS_NAME = `${CLASS_PREFIX}-form-drawer`;

@autoBindMethods
@observer
class FormDrawer extends Component<ISharedFormModalProps> {
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

  public render() {
    const { title, width } = this.props,
      className = cx(CLASS_NAME, this.props.className);

    if (!this.isVisible) {
      return null;
    }

    return (
      <Drawer
        className={className}
        closable
        destroyOnClose
        maskClosable={false}
        onClose={this.onCancel}
        placement="right"
        title={title}
        visible={true}
        width={width || '600px'}
      >
        {this.props.childrenBefore}

        <Form {...this.formProps} onCancel={this.onCancel} onSuccess={this.onSuccess} />
      </Drawer>
    );
  }
}

export default FormDrawer;
