import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx, { Argument as ClassValue } from 'classnames';

import { Form } from 'antd';

import { CLASS_PREFIX } from '../consts';

export interface IButtonToolbarProps {
  align?: 'right';
  className?: ClassValue;
  noSpacing?: boolean;
}

const CLASS_NAME = `${CLASS_PREFIX}-button-toolbar`;

@autoBindMethods
@observer
class ButtonToolbar extends Component<IButtonToolbarProps> {
  public render() {
    const { noSpacing, align } = this.props,
      className = cx(align && `${CLASS_NAME}-align-${align}`, CLASS_NAME, this.props.className, {
        [`${CLASS_NAME}-no-spacing`]: noSpacing,
      });

    return <Form.Item className={className}>{this.props.children}</Form.Item>;
  }
}

export default ButtonToolbar;
