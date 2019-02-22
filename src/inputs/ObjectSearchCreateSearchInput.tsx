import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { get, pick, debounce } from 'lodash';

import * as Antd from 'antd';
import { SelectProps } from 'antd/lib/select';

import { toKey } from '@mighty-justice/utils';
import SmartBool from '@mighty-justice/smart-bool';

import {
  CX_PREFIX_SEARCH_CREATE,
  DEFAULT_DEBOUNCE_WAIT,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
} from '../';

export interface IObjectSearchProps {
  addNewContent?: React.ReactNode;
  debounceWait: number;
  fieldConfig: IFieldConfigObjectSearchCreate;
  loadingIcon?: React.ReactNode;
  noSearchContent?: React.ReactNode;
  onAddNew: (search: string) => void;
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

const ITEM_KEYS = {
  ADD: 'add',
  EMPTY: 'empty',
  NO_SEARCH: 'no-search',
};

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

  private get hasSearch () {
    return this.search !== '';
  }

  private get hasOptions () {
    return !!this.options.length;
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
      'placeholder',
      'removeIcon',
      'suffixIcon',
    ]);
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
    this.isLoading.setTrue();
    const response = await getEndpoint(`/${endpoint}/${toKey(params)}`);
    this.options = response.results;
    this.isLoading.setFalse();
  }

  private renderOptionAdd () {
    const { addNewContent } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.ADD}`;

    return (
      <Antd.Select.Option className={className} key={ITEM_KEYS.ADD}>
        <div>{addNewContent || <><Antd.Icon type='plus' /> Add new</>}</div>
      </Antd.Select.Option>
    );
  }

  private renderOptionEmpty () {
    const { selectProps } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.EMPTY}`;

    return (
      <Antd.Select.Option className={className} disabled key={ITEM_KEYS.EMPTY}>
        <div>{get(selectProps, 'notFoundContent') || 'No results'}</div>
      </Antd.Select.Option>
    );
  }

  private renderOptionNoSearch () {
    const { noSearchContent } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.NO_SEARCH}`;

    return (
      <Antd.Select.Option className={className} disabled key={ITEM_KEYS.NO_SEARCH}>
        <div>{noSearchContent || 'Type in search text'}</div>
      </Antd.Select.Option>
    );
  }

  private renderOption (option: IEndpointOption) {
    const className = `${CX_PREFIX_SEARCH_CREATE}-item`;

    return (
      <Antd.Select.Option
        className={className}
        key={option.id}
        value={option.id}
      >
        {option.name}
      </Antd.Select.Option>
    );
  }
  private onChange (selectedOption: any) {
    if (selectedOption.key === ITEM_KEYS.ADD) {
      this.props.onAddNew(this.search);
    }

    const foundOption = this.options.find(option => option.id === selectedOption.key);
    this.injected.onChange(toJS(foundOption));
  }

  private onFocus () {
    if (!this.hasOptions && !this.hasSearch) {
      this.handleSearch(this.search);
    }
  }

  public render () {
    const { id } = this.injected
      , showEmpty = this.hasSearch && !this.hasOptions
      , showNoSearch = !this.hasOptions && !this.hasOptions
      , showAdd = this.hasSearch
      ;

    return (
      <Antd.Select
        allowClear
        defaultActiveFirstOption={false}
        filterOption={false}
        id={id}
        labelInValue
        loading={this.isLoading.isTrue}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onSearch={this.debouncedHandleSearch}
        placeholder='Search...'
        showSearch
        suffixIcon={this.isLoading.isTrue ? this.loadingIcon : this.searchIcon}
        {...this.selectProps}
      >
        {this.options.map(this.renderOption)}
        {showEmpty && this.renderOptionEmpty()}
        {showNoSearch && this.renderOptionNoSearch()}
        {showAdd && this.renderOptionAdd()}
      </Antd.Select>
    );
  }
}

export default ObjectSearchCreateSearchInput;
