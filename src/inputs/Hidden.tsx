import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import * as Antd from 'antd';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

@autoBindMethods
@observer
class Hidden extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  public render () {
    const { formManager, fieldConfig, fieldConfig: { field } } = this.injected
      , initialValue = formManager.getDefaultValue(fieldConfig)
      , { getFieldDecorator } = formManager.form
      , HANDLED_PROPS = ['formManager', 'formModel', 'fieldConfig']
      , inputProps = { ...omit(this.props, HANDLED_PROPS), type: 'hidden' }
      ;

    return (
      getFieldDecorator(field, { initialValue })(<Antd.Input {...inputProps} />)
    );
  }
}

export default Hidden;
