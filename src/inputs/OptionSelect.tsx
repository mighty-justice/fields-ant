import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject } from 'mobx-react';
import { isBoolean } from 'lodash';

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
  renderOption?: (option: IOption) => React.ReactNode;
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

  private get showSearch (): boolean {
    // 8 is the most number of options you can show with no scroll
    const SHOW_SEARCH_IF_OVER = 8;

    // the showSearch fieldConfig option will override this
    if (isBoolean(this.fieldConfig.showSearch)) {
      return this.fieldConfig.showSearch;
    }

    return this.options.length > SHOW_SEARCH_IF_OVER;
  }

  public render () {
    const { renderOption } = this.props;

    return (
      <Antd.Select
        allowClear
        optionFilterProp='children'
        showSearch={this.showSearch}
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
