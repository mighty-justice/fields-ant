import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import { Form } from 'antd';

export interface IButtonToolbarProps {
  align?: 'between' | 'right';
  className?: ClassValue;
  fixed?: boolean;
  noSpacing?: boolean;
}

@autoBindMethods
@observer
class ButtonToolbar extends Component<IButtonToolbarProps> {
  public render () {
    const { noSpacing, align, fixed, className, ...passDownProps } = this.props
      , classNames = cx(
      'button-toolbar',
      align && `align-${align}`,
      {'no-spacing': noSpacing},
      {[`position-fixed`]: fixed},
      className,
    );

    return <Form.Item {...passDownProps} className={classNames}>{this.props.children}</Form.Item>;
  }
}

export default ButtonToolbar;
