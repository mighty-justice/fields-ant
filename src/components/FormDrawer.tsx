import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { ISharedFormModalProps } from '../props';
import FormModalUtils from '../utilities/FormModalUtils';

import Form from './Form';

@autoBindMethods
@observer
class FormDrawer extends Component<ISharedFormModalProps> {
  private formModalUtils: FormModalUtils;

  public constructor (props: ISharedFormModalProps) {
    super(props);
    this.formModalUtils = new FormModalUtils(props);
  }

  public render () {
    const { className, title, width } = this.props
      , { isVisible, onCancel, onSuccess, formProps } = this.formModalUtils
      , drawerClassName = cx('mfa-form-drawer', className || null);

    if (!isVisible) { return null; }

    return (
      <Antd.Drawer
        className={drawerClassName}
        closable
        destroyOnClose
        maskClosable={false}
        onClose={onCancel}
        placement='right'
        title={title}
        visible={true}
        width={width || '600px'}
      >
        {this.props.childrenBefore}

        <Form
          {...formProps}
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      </Antd.Drawer>
    );
  }
}

export default FormDrawer;
