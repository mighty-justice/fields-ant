import React from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import Form from './Form';
import FormModal from './FormModal';

@autoBindMethods
@observer
class FormDrawer extends FormModal {
  public render () {
    const { className, title, width } = this.props
      , drawerClassName = cx('mfa-form-drawer', className || null);

    if (!this.isVisible) { return null; }

    return (
      <Antd.Drawer
        className={drawerClassName}
        closable
        destroyOnClose
        maskClosable={false}
        onClose={this.onCancel}
        placement='right'
        title={title}
        visible={true}
        width={width || '600px'}
      >
        {this.props.childrenBefore}

        <Form
          {...this.formProps}
          onCancel={this.onCancel}
          onSuccess={this.onSuccess}
        />
      </Antd.Drawer>
    );
  }
}

export default FormDrawer;
