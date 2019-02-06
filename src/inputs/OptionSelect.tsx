import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import * as Antd from 'antd';

import {
  IAntFormField,
  IFieldConfigOptionSelect,
  IInjected,
  IInputProps,
  IOption,
} from '../interfaces';

import { getOptions } from '../';
import { IOptionSelectProps } from '../props';

@inject('getOptions')
class OptionSelect extends Component<IOptionSelectProps> {
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
      <Antd.Select
        allowClear
        optionFilterProp='children'
        showSearch={!!this.fieldConfig.showSearch}
        {...this.props}
      >
        {this.options.map(option => (
          <Antd.Select.Option value={option.value} key={option.value}>{option.name}</Antd.Select.Option>
        ))}
      </Antd.Select>
    );
  }
}

export default OptionSelect;
