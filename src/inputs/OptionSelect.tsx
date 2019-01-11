import React, { Component } from 'react';
import * as Antd from 'antd';
import { inject } from 'mobx-react';
import { sortBy } from 'lodash';

import { IFieldConfig, IFieldConfigOptionSelect, IOption } from '../interfaces';

interface IProps {
  fieldConfig: IFieldConfig;
}

interface IInjected extends IProps {
  getOptions: (optionType: string) => IOption[];
}

@inject('getOptions')
class OptionSelect extends Component<IProps> {
  private get injected () {
    return this.props as IInjected;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  private get unsortedOptions (): IOption[] {
    const { options, optionType } = this.fieldConfig;

    if (options) { return options; }
    if (this.fieldConfig.getOptions) { return this.fieldConfig.getOptions(optionType); }
    if (this.injected.getOptions) { return this.injected.getOptions(optionType); }
    return [];
  }

  private get options (): IOption[] {
    return this.fieldConfig.sorted ? sortBy(this.unsortedOptions, 'name') : this.unsortedOptions;
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
