import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit, debounce, get, uniqBy } from 'lodash';

import * as Antd from 'antd';
import { SelectProps } from 'antd/es/select';

import { toKey } from '@mighty-justice/utils';
import SmartBool from '@mighty-justice/smart-bool';

import {
  CX_PREFIX_SEARCH_CREATE,
  DEFAULT_DEBOUNCE_WAIT,
  IAntFormField,
  IEndpointOption,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
} from '../';
import { IValue } from '../props';

export interface IObjectSearchProps {
  addNewContent?: React.ReactNode;
  debounceWait: number;
  fieldConfig: IFieldConfigObjectSearchCreate;
  isOptionDisabled?: (option: IEndpointOption) => boolean;
  loadingIcon?: React.ReactNode;
  noSearchContent?: React.ReactNode;
  onAddNew?: (search: string) => void;
  onChange: (value: IValue) => void;
  searchIcon?: React.ReactNode;
  searchOnEmpty?: boolean;
  selectProps: SelectProps;
}

const ITEM_KEYS = {
  ADD: 'add',
  EMPTY: 'empty',
  NO_SEARCH: 'no-search',
};

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearch extends Component<IObjectSearchProps> {
  @observable private options: IEndpointOption[] = [];
  @observable private isLoading = new SmartBool();
  @observable private search = '';

  @observable private previousEndpoint = '';
  @observable private previousSearchFilters = '';

  public static defaultProps: Partial<IObjectSearchProps> = {
    debounceWait: DEFAULT_DEBOUNCE_WAIT,
  };

  private debouncedHandleSearch: (search: string) => void;

  public constructor (props: IObjectSearchProps) {
    super(props);
    this.debouncedHandleSearch = debounce(this.handleSearch, props.debounceWait);
    this.updateValueCaches();
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

  private updateValueCaches () {
    this.previousEndpoint = this.fieldConfig.endpoint;
    this.previousSearchFilters = toKey(this.fieldConfig.searchFilters || {});
  }

  private get hasNewEndpoint () {
    return this.previousEndpoint !== this.fieldConfig.endpoint;
  }

  private get hasNewSearchFilters () {
    return this.previousSearchFilters !== toKey(this.fieldConfig.searchFilters || {});
  }

  private get hasNewProps () {
    return this.hasNewEndpoint || this.hasNewSearchFilters;
  }

  private get isPristine () {
    return !this.hasOptions && !this.hasSearch;
  }

  private get isMultiSelect () {
    const { mode } = this.selectProps;
    return mode && ['multiple', 'tags'].includes(mode);
  }

  private get loadingIcon () {
    return this.props.loadingIcon || <Antd.Icon type='loading' />;
  }

  private get searchIcon () {
    return this.props.searchIcon || <Antd.Icon type='search' />;
  }

  private get selectProps () {
    // Omitting specific props to avoid unintentional behaviors
    return omit(this.props.selectProps, [
      'id',
      'loading',
      'onBlur',
      'onChange',
      'onFocus',
      'onSearch',
      'showSearch',
    ]);
  }

  private async handleSearch (value: string) {
    const { getEndpoint, searchOnEmpty } = this.injected
      , { endpoint, searchFilters } = this.fieldConfig
      , params = {
        search: value,
        ...searchFilters,
      }
      ;

    this.search = value;
    if (!searchOnEmpty && !this.hasSearch) {
      this.options = [];
      return;
    }

    this.isLoading.setTrue();
    this.updateValueCaches();

    try {
      const response = await getEndpoint(`${endpoint}${toKey(params)}`);
      this.options = get(response, 'results', []);

    // istanbul ignore next
    } catch (error) {
      // tslint:disable no-console
      // istanbul ignore next
      console.error(error);
      // tslint:enable no-console

    } finally {
      this.isLoading.setFalse();
    }
  }

  private renderAddOption () {
    const { addNewContent } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.ADD}`;

    return (
      <Antd.Select.Option className={className} key={ITEM_KEYS.ADD}>
        <div>{addNewContent || (<><Antd.Icon type='plus' /> <b>{this.search}</b></>)}</div>
      </Antd.Select.Option>
    );
  }

  private renderNoResultsOption () {
    const { selectProps } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.EMPTY}`;

    return (
      <Antd.Select.Option className={className} disabled key={ITEM_KEYS.EMPTY}>
        <div>{get(selectProps, 'notFoundContent') || 'No results'}</div>
      </Antd.Select.Option>
    );
  }

  private renderNoSearchOption () {
    const { noSearchContent } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item-${ITEM_KEYS.NO_SEARCH}`;

    return (
      <Antd.Select.Option className={className} disabled key={ITEM_KEYS.NO_SEARCH}>
        {this.isLoading.isTrue
          ? <div>{this.loadingIcon} Loading...</div>
          : <div>{noSearchContent || 'Type to search or filter'}</div>
        }
      </Antd.Select.Option>
    );
  }

  private renderOption (option: IEndpointOption) {
    const { renderOption, renderSelected } = this.fieldConfig
      , { isOptionDisabled } = this.props
      , className = `${CX_PREFIX_SEARCH_CREATE}-item`;

    return (
      <Antd.Select.Option
        className={className}
        disabled={isOptionDisabled ? isOptionDisabled(option) : false}
        key={option.id}
        title={renderSelected(option)}
        value={option.id}
      >
        {renderOption(option)}
      </Antd.Select.Option>
    );
  }

  private onChange (selectedOption: any) {
    const { onChange, onAddNew } = this.injected;

    // Clear
    if (!selectedOption) {
      onChange(null);
      return;
    }

    // Add new
    if (onAddNew && selectedOption.key === ITEM_KEYS.ADD) {
      onAddNew(this.search);
      return;
    }

    // Select from search
    if (this.isMultiSelect) {
      const selectedOptionIds = selectedOption.map((_selectedOption: any) => _selectedOption.key)
        , optionsToSearch = uniqBy([...this.injected.value, ...this.options], 'id')
        , foundOptions = optionsToSearch.filter((option: any) => selectedOptionIds.includes(option.id));
      onChange(toJS(foundOptions));
    } else {
      const foundOption = this.options.find(option => option.id === selectedOption.key);
      onChange(toJS(foundOption));
    }
  }

  // istanbul ignore next
  private onBlur () {
    this.search = '';
  }

  // istanbul ignore next
  private onFocus () {
    if (this.isPristine || this.hasNewProps) {
      // Trigger empty search
      this.handleSearch(this.search);
    }
  }

  private get valueProp (): { value?: { key: string, label: string } } {
    const { value } = this.injected
      , { renderSelected } = this.fieldConfig;

    if (this.isMultiSelect) {
      if (!value) { return { value: undefined }; }

      return {
        value: value.map((_value: any) => ({
          key: _value.id,
          label: renderSelected(_value),
        })),
      };
    }

    const valueId = get(value, 'id');
    if (!valueId) { return { value: undefined }; }

    return {
      value: {
        key: valueId,
        label: renderSelected(value),
      },
    };
  }

  private renderDropdownWrapper (menu: React.ReactNode) {
    const { className } = this.selectProps;
    return <div className={className}>{menu}</div>;
  }

  public render () {
    const { id, onAddNew, searchOnEmpty, disabled } = this.injected
      , isLoading: boolean = this.isLoading.isTrue
      , canSearch: boolean = this.hasSearch || !!searchOnEmpty
      , showNoResultsOption: boolean = canSearch && !isLoading && !this.hasOptions
      , showAddOption: boolean = !!(this.hasSearch && onAddNew)
      , showNoSearch: boolean = !this.hasSearch
      , { label, showLabel } = this.fieldConfig
      , placeholderLabel: string = (showLabel && label) ? ` ${label}` : ''
      , placeholder = `Search${placeholderLabel}...`
      ;

    return (
      <Antd.Select
        allowClear={!isLoading}
        defaultActiveFirstOption={false}
        disabled={disabled}
        dropdownRender={this.renderDropdownWrapper}
        filterOption={false}
        id={id}
        labelInValue
        loading={isLoading}
        notFoundContent={null}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onSearch={this.debouncedHandleSearch}
        optionLabelProp='title'
        placeholder={placeholder}
        showSearch
        suffixIcon={isLoading ? this.loadingIcon : this.searchIcon}
        {...this.valueProp}
        {...this.selectProps}
      >
        {showNoSearch && this.renderNoSearchOption()}
        {showAddOption && this.renderAddOption()}
        {this.options.map(this.renderOption)}
        {showNoResultsOption && this.renderNoResultsOption()}
      </Antd.Select>
    );
  }
}

export default ObjectSearch;
