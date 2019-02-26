import React, { Component } from 'react';
import { computed } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import { inject, observer } from 'mobx-react';

import * as Antd from 'antd';

import {
  IAntFormField,
  IFieldConfigOptionSelect,
  IInjected,
  IInputProps,
  IOption,
} from '../interfaces';

import { getOptions } from '..';

@inject('getOptions')
@autoBindMethods
@observer
class RadioGroup extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  @computed
  private get options (): IOption[] {
    return getOptions(this.fieldConfig, this.injected);
  }

  public render () {
    return (
      <Antd.Radio.Group {...this.props}>
        {this.options.map(option => (
          <Antd.Radio
            key={option.value}
            value={option.value}
          >
            {option.name}
          </Antd.Radio>
        ))}
      </Antd.Radio.Group>
    );
  }
}

export default RadioGroup;
