import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { pick, debounce } from 'lodash';

import * as Antd from 'antd';
import { SelectProps } from 'antd/lib/select';

import { toKey } from '@mighty-justice/utils';
import SmartBool from '@mighty-justice/smart-bool';

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
  loadingIcon?: React.ReactNode;
  onSearchChange: (search: string) => void;
  searchIcon?: React.ReactNode;
  selectProps: SelectProps;
}

interface IEndpointOption {
  id: string;
  name: string;
}

/*
This component performs the 'search' action of ObjectSearchCreate.
It must be a separate component so that Ant Design / rc-form can
inject their own props, do validation, and correctly show help:

{formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
  <ObjectSearchCreateSearchInput
*/

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreateSearchInput extends Component<IObjectSearchProps> {
  @observable private options: IEndpointOption[] = [];
  @observable private isLoading = new SmartBool();
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

  private get loadingIcon () {
    return this.props.loadingIcon || <Antd.Icon type='loading' />;
  }

  private get searchIcon () {
    return this.props.searchIcon || <Antd.Icon type='search' />;
  }

  private get selectProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.selectProps as SelectProps, [
      'clearIcon',
      'removeIcon',
      'suffixIcon',
    ]);
  }

  private async handleSearch (value: string) {
    const { getEndpoint, onSearchChange } = this.injected
      , { endpoint, searchFilters } = this.fieldConfig
      , params = {
        search: value,
        ...searchFilters,
      }
      ;

    this.search = value;
    this.isLoading.setTrue();
    onSearchChange(this.search);
    const response = await getEndpoint(`/${endpoint}/${toKey(params)}`);
    this.options = response.results;
    this.isLoading.setFalse();
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
        loading={this.isLoading.isTrue}
        onChange={this.onChange}
        onSearch={this.debouncedHandleSearch}
        placeholder='Search...'
        showSearch
        suffixIcon={this.isLoading.isTrue ? this.loadingIcon : this.searchIcon}
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

export default ObjectSearchCreateSearchInput;
