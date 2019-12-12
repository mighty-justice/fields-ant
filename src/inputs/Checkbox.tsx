import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import * as Antd from 'antd';

import { IAntFormField, ICheckboxProps, IInjected } from '../interfaces';

@autoBindMethods
@observer
export default class Checkbox extends Component <ICheckboxProps> {
  private get injected () {
    return this.props as IInjected & ICheckboxProps & IAntFormField;
  }

  public render () {
    const { description, disabled, disabledText, value, id } = this.injected
      , PROPS_TO_OMIT = ['description', 'value']
      , checkboxProps = {
        ...omit(this.props, PROPS_TO_OMIT),
        checked: value,
      };

    return (
      <Antd.Tooltip title={disabled ? disabledText : ''}>
        <span>
          <Antd.Checkbox {...checkboxProps}>
            {description || ''}
          </Antd.Checkbox>
        </span>
      </Antd.Tooltip>
    );
  }
}
