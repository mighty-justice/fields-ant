import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import { Form } from 'antd';

import { CLASS_PREFIX } from '../consts';

export interface IButtonToolbarProps {
  align?: 'between' | 'right';
  className?: ClassValue;
  fixed?: boolean;
  noSpacing?: boolean;
}

const CLASS_NAME = `${CLASS_PREFIX}-button-toolbar`;

@autoBindMethods
@observer
class ButtonToolbar extends Component<IButtonToolbarProps> {
  public render () {
    const { noSpacing, align, fixed, ...passDownProps } = this.props
      , className = cx(
        align && `${CLASS_NAME}-align-${align}`,
        CLASS_NAME,
        this.props.className,
        {[`${CLASS_NAME}-no-spacing`]: noSpacing},
        {[`${CLASS_NAME}-position-fixed`]: fixed},
      );

    return <Form.Item {...passDownProps} className={className}>{this.props.children}</Form.Item>;
  }
}

export default ButtonToolbar;
