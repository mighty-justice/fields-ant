import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Form } from 'antd';

export interface IButtonToolbarProps {
  align?: 'between' | 'right';
  className?: any;
  fixed?: boolean;
  noSpacing?: boolean;
}

@autoBindMethods
@observer
class ButtonToolbar extends Component<IButtonToolbarProps> {
  public render () {
    const {
        align,
        className,
        fixed,
        noSpacing,
        ...passDownProps
      } = this.props
      , itemClassName = cx(
        'button-toolbar',
        align ? `align-${align}` : null,
        {'no-spacing': noSpacing},
        {[`position-fixed`]: fixed},
        className,
      );

    return (
      <Form.Item {...passDownProps} className={itemClassName}>
        {this.props.children}
      </Form.Item>
    );
  }
}

export default ButtonToolbar;
