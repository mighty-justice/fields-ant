import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject } from 'mobx-react';

import * as Antd from 'antd';

import {
  IAntFormField,
  IFieldConfig,
  IFieldConfigOptionSelect,
  IInjected,
  IInputProps,
  IOption,
} from '../interfaces';

import { getOptions } from '../';

export interface IOptionSelectProps {
  fieldConfig: IFieldConfig;
  renderOption: (option: IOption) => React.ReactNode;
}

@inject('getOptions')
class OptionSelect extends Component<IOptionSelectProps> {
  private get injected () {
    return this.props as IOptionSelectProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  @computed
  private get options (): IOption[] {
    return getOptions(this.fieldConfig, this.injected);
  }

  public render () {
    const { renderOption } = this.props;
    console.log('renderOption', renderOption);

    return (
      <Antd.Select
        allowClear
        optionFilterProp='children'
        showSearch={!!this.fieldConfig.showSearch}
        {...this.props}
      >
        {this.options.map(option => (
          <Antd.Select.Option
            key={option.value}
            value={option.value}
          >
            {renderOption ? renderOption(option) : option.name}
          </Antd.Select.Option>
        ))}
      </Antd.Select>
    );
  }
}

export default OptionSelect;
