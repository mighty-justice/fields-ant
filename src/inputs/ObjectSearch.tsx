import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { pick, debounce } from 'lodash';

import * as Antd from 'antd';
import { SelectProps } from 'antd/lib/select';

import { toKey } from '@mighty-justice/utils';

import {
  DEFAULT_DEBOUNCE_WAIT,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
} from '../';

export interface IObjectSearchProps {
  debounceWait: number;
  fieldConfig: IFieldConfigObjectSearchCreate;
  onSearchChange: (search: string) => void;
  selectProps: SelectProps;
}

interface IEndpointOption {
  id: string;
  name: string;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearch extends Component<IObjectSearchProps> {
  @observable private options: IEndpointOption[] = [];
  @observable private search = '';

  public static defaultProps: Partial<IObjectSearchProps> = {
    debounceWait: DEFAULT_DEBOUNCE_WAIT,
  };

  private debouncedHandleSearch: (search: string) => void;

  public constructor (props: IObjectSearchProps) {
    super(props);
    this.debouncedHandleSearch = debounce(this.handleSearch, props.debounceWait);
  }

  private get injected () {
    return this.props as IObjectSearchProps & IInjected & IInputProps & IAntFormField;
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
        onSearch={this.debouncedHandleSearch}
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
