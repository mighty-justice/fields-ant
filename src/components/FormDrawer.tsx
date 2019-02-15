import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

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

  public render () {
    const { isVisible, title, width } = this.props
      , HANDLED_PROPS = ['title', 'isVisible'];

    return (
      <Antd.Drawer
        className='mfa-form-drawer'
        closable
        destroyOnClose
        maskClosable={false}
        onClose={isVisible.setFalse}
        placement='right'
        title={title}
        visible={isVisible.isTrue}
        width={width}
      >
        <Form
          onCancel={isVisible.setFalse}
          {...omit(this.props, HANDLED_PROPS)}
        />
      </Antd.Drawer>
    );
  }
}

export default FormDrawer;
