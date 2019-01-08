import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import '../../assets/styles/components/common/button-toolbar.less';
import { Form } from 'antd';

interface IProps {
  align?: 'between' | 'right';
  className?: any;
  children?: any;
  fixed?: boolean;
  noSpacing?: boolean;
}

@autoBindMethods
class ButtonToolbar extends Component<IProps> {
  public render () {
    const className = cx(
      'button-toolbar',
      this.props.align ? `align-${this.props.align}` : null,
      {'no-spacing': this.props.noSpacing},
      {[`position-fixed`]: this.props.fixed},
      this.props.className,
    );
    return <Form.Item {...this.props} className={className}>{this.props.children}</Form.Item>;
  }
}

export default ButtonToolbar;
