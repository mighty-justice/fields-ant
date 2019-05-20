import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import cx from 'classnames';

import * as Antd from 'antd';

import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormModalProps } from '../props';

import Form from './Form';

@autoBindMethods
@observer
class FormDrawer extends Component<ISharedFormModalProps> {
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

  public render () {
    const { className, isVisible, title, width } = this.props
      , drawerClassName = cx('mfa-form-drawer', className || null)
      , HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];

    return (
      <Antd.Drawer
        className={drawerClassName}
        closable
        destroyOnClose
        maskClosable={false}
        onClose={this.onCancel}
        placement='right'
        title={title}
        visible={isVisible ? isVisible.isTrue : true}
        width={width || '600px'}
      >
        {this.props.childrenBefore}

        <Form
          {...omit(this.props, HANDLED_PROPS)}
          onCancel={this.onCancel}
          onSuccess={this.onSuccess}
        />
      </Antd.Drawer>
    );
  }
}

export default FormDrawer;
