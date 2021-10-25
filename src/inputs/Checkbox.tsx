import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { Tooltip, Checkbox as AntCheckbox } from 'antd';

import { IAntFormField, ICheckboxProps, IInjected } from '../interfaces';

@autoBindMethods
@observer
export default class Checkbox extends Component<ICheckboxProps> {
  private get injected() {
    return this.props as IInjected & ICheckboxProps & IAntFormField;
  }

  public render() {
    const { description, disabled, disabledText, value } = this.injected,
      PROPS_TO_OMIT = ['description', 'value'],
      checkboxProps = {
        ...omit(this.props, PROPS_TO_OMIT),
        checked: !!value,
      };

    return (
      <Tooltip title={disabled ? disabledText : ''}>
        <span>
          <AntCheckbox {...checkboxProps}>{description || ''}</AntCheckbox>
        </span>
      </Tooltip>
    );
  }
}
