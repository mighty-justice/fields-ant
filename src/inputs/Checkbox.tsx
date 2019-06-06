import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import { ICheckboxProps } from '../interfaces';

import * as Antd from 'antd';

@autoBindMethods()
@observer
export default class Checkbox extends Component <ICheckboxProps> {
  public render () {
    const { description, disabled, disabledText } = this.props;

    return (
      <Antd.Tooltip title={disabled ? disabledText : ''}>
        <span>
          <Antd.Checkbox {...omit(this.props, 'description')}>
            {description || ''}
          </Antd.Checkbox>
        </span>
      </Antd.Tooltip>
    );
  }
}
