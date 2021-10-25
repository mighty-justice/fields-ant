import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { isBoolean, get, isObject } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';
import { SelectProps } from 'antd';

import { getNameOrDefault } from '@mighty-justice/utils';

import { IAntFormField, IFieldConfigOptionSelect, IInjected, IFormFieldProps } from '../interfaces';

import { getOptions } from '../utilities';
import { IModel } from '../props';

export interface IObjectSelectProps extends IFormFieldProps {
  keyBy: string;
  renderOption: (option: IModel) => React.ReactNode;
  renderSelected: (option: IModel) => string;
}

// 8 is the most number of options you can show with no scroll
export const SHOW_OPTION_SEARCH_IF_OVER = 8;

@inject('getOptions')
@autoBindMethods
@observer
class ObjectSelect extends Component<IObjectSelectProps> {
  private get injected() {
    return this.props as IObjectSelectProps & IInjected & IFormFieldProps & IAntFormField;
  }

  public static defaultProps = {
    keyBy: 'id',
    renderOption: getNameOrDefault,
    renderSelected: getNameOrDefault,
  };

  private get fieldConfig() {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  @computed
  private get options(): IModel[] {
    return getOptions(this.fieldConfig, this.injected);
  }

  private get showSearch(): boolean {
    // the showSearch fieldConfig option will override this
    if (isBoolean(this.fieldConfig.showSearch)) {
      return this.fieldConfig.showSearch;
    }

    return this.options.length > SHOW_OPTION_SEARCH_IF_OVER;
  }

  private get selectProps(): SelectProps<any> {
    const {
      fieldConfig: _fieldConfig,
      formManager: _formManager,
      formModel: _formModel,
      getOptions: _getOptions,
      keyBy: _keyBy,
      renderOption: _renderOption,
      renderSelected: _renderSelected,
      ...selectProps
    } = this.injected;

    return {
      ...selectProps,
    };
  }

  private renderOption(option: IModel) {
    const { renderSelected, renderOption, keyBy } = this.injected,
      key = get(option, keyBy);

    return (
      <Antd.Select.Option disabled={option.disabled} key={key} title={renderSelected(option)} value={key}>
        {renderOption(option)}
      </Antd.Select.Option>
    );
  }

  public render() {
    const { keyBy, value } = this.injected,
      selectValue = isObject(value) ? get(value, keyBy) : value;

    return (
      <Antd.Select
        allowClear
        optionFilterProp="children"
        showSearch={this.showSearch}
        {...this.selectProps}
        value={selectValue}
      >
        {this.options.map(this.renderOption)}
      </Antd.Select>
    );
  }
}

export default ObjectSelect;
