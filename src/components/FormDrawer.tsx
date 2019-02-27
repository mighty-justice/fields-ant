import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import cx from 'classnames';

import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';

import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps, ISharedComponentProps } from '../props';

import Form from './Form';

export interface IFormDrawerProps extends ISharedComponentProps, ISharedFormProps {
  isVisible: SmartBool;
  width?: number | string;
}

@autoBindMethods
@observer
class FormDrawer extends Component<IFormDrawerProps> {
  public static defaultProps: Partial<IFormDrawerProps> = {
    ...formPropsDefaults,
  };

  private onCancel () {
    const { onCancel, isVisible } = this.props;
    onCancel();
    isVisible.setFalse();
  }

  public render () {
    const { className, isVisible, title, width } = this.props
      , drawerClassName = cx('mfa-form-drawer', className || null)
      , HANDLED_PROPS = ['title', 'isVisible'];

    return (
      <Antd.Drawer
        className={drawerClassName}
        closable
        destroyOnClose
        maskClosable={false}
        onClose={this.onCancel}
        placement='right'
        title={title}
        visible={isVisible.isTrue}
        width={width}
      >
        <Form
          {...omit(this.props, HANDLED_PROPS)}
          onCancel={this.onCancel}
        />
      </Antd.Drawer>
    );
  }
}

export default FormDrawer;
