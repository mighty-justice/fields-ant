import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { pick } from 'lodash';

import { toKey } from '@mighty-justice/utils';

import * as Antd from 'antd';
import { SelectProps } from 'antd/lib/select';

import {
  FormManager,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
} from '../';

interface IProps {
  fieldConfig: IFieldConfigObjectSearchCreate;
  formManager: FormManager;
  onSearchChange: any;
  selectProps: SelectProps;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearch extends Component<IProps> {
  @observable private options: Array<{ id: string, name: string }> = [];
  @observable private search = '';

  private get injected () {
    return this.props as IProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private get selectProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.selectProps as SelectProps, ['suffixIcon', 'clearIcon', 'removeIcon']);
  }

  private async handleSearch (value: string) {
    const { getEndpoint } = this.injected
      , { endpoint, searchFilters } = this.fieldConfig
      , params = {
        search: value,
        ...searchFilters,
      }
      ;

    this.search = value;
    this.props.onSearchChange(this.search);
    const response = await getEndpoint(`/${endpoint}/${toKey(params)}`);
    this.options = response.results;
  }

  private onChange (value: any) {
    const foundOption = this.options.find(option => option.id === value.key);
    this.injected.onChange(toJS(foundOption));
  }

  public render () {
    const { id } = this.injected;

    return (
      <Antd.Select
        allowClear
        defaultActiveFirstOption={false}
        filterOption={false}
        id={id}
        labelInValue
        onChange={this.onChange}
        onSearch={this.handleSearch}
        placeholder='Select existing'
        showSearch
        {...this.selectProps}
      >
        {this.options.map(option => (
          <Antd.Select.Option
            key={option.id}
            value={option.id}
          >
            {option.name}
          </Antd.Select.Option>
        ))}
      </Antd.Select>
    );
  }
}

export default ObjectSearch;