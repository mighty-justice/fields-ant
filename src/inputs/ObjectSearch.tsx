import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit, debounce, get, uniqBy } from 'lodash';

import { Select } from 'antd';
import { SelectProps } from 'antd/es/select';
import { LoadingOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';

import { toKey } from '@mighty-justice/utils';
import SmartBool from '@mighty-justice/smart-bool';

import {
  CLASS_PREFIX,
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
  selectProps: SelectProps<any>;
}

export const CLASS_NAME = `${CLASS_PREFIX}-input-object-search`;

export const OPTION_KEYS = {
  ADD: `${CLASS_NAME}-add`,
  EMPTY: `${CLASS_NAME}-empty`,
  NO_SEARCH: `${CLASS_NAME}-no-search`,
  OPTION: `${CLASS_NAME}-option`,
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

  public constructor(props: IObjectSearchProps) {
    super(props);
    this.debouncedHandleSearch = debounce(this.handleSearch, props.debounceWait);
    this.updateValueCaches();
  }

  private get injected() {
    return this.props as IObjectSearchProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig() {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private get hasSearch() {
    return this.search !== '';
  }

  private get hasOptions() {
    return !!this.options.length;
  }

  private updateValueCaches() {
    this.previousEndpoint = this.fieldConfig.endpoint;
    this.previousSearchFilters = toKey(this.fieldConfig.searchFilters || {});
  }

  private get hasNewEndpoint() {
    return this.previousEndpoint !== this.fieldConfig.endpoint;
  }

  private get hasNewSearchFilters() {
    return this.previousSearchFilters !== toKey(this.fieldConfig.searchFilters || {});
  }

  private get hasNewProps() {
    return this.hasNewEndpoint || this.hasNewSearchFilters;
  }

  private get isPristine() {
    return !this.hasOptions && !this.hasSearch;
  }

  private get isMultiSelect() {
    const { mode } = this.selectProps;
    return mode && ['multiple', 'tags'].includes(mode);
  }

  private get loadingIcon() {
    return this.props.loadingIcon || <LoadingOutlined />;
  }

  private get searchIcon() {
    return this.props.searchIcon || <SearchOutlined />;
  }

  private get selectProps() {
    // Omitting specific props to avoid unintentional behaviors
    return omit(this.props.selectProps, ['id', 'loading', 'onBlur', 'onChange', 'onFocus', 'onSearch', 'showSearch']);
  }

  private async handleSearch(value: string) {
    const { getEndpoint, searchOnEmpty } = this.injected,
      { endpoint, searchFilters } = this.fieldConfig,
      params = {
        search: value,
        ...searchFilters,
      };

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

  private renderAddOption() {
    const { addNewContent } = this.props;

    return (
      <Select.Option className={OPTION_KEYS.ADD} key={OPTION_KEYS.ADD} value={OPTION_KEYS.ADD}>
        <div>
          {addNewContent || (
            <>
              <PlusOutlined /> <b>{this.search}</b>
            </>
          )}
        </div>
      </Select.Option>
    );
  }

  private renderNoResultsOption() {
    const { selectProps } = this.props;

    return (
      <Select.Option className={OPTION_KEYS.EMPTY} disabled key={OPTION_KEYS.EMPTY} value={OPTION_KEYS.EMPTY}>
        <div>{get(selectProps, 'notFoundContent') || 'No results'}</div>
      </Select.Option>
    );
  }

  private renderNoSearchOption() {
    const { noSearchContent } = this.props;

    return (
      <Select.Option
        className={OPTION_KEYS.NO_SEARCH}
        disabled
        key={OPTION_KEYS.NO_SEARCH}
        value={OPTION_KEYS.NO_SEARCH}
      >
        {this.isLoading.isTrue ? (
          <div>{this.loadingIcon} Loading...</div>
        ) : (
          <div>{noSearchContent || 'Type to search or filter'}</div>
        )}
      </Select.Option>
    );
  }

  private renderOption(option: IEndpointOption) {
    const { renderOption, renderSelected } = this.fieldConfig,
      { isOptionDisabled } = this.props;

    return (
      <Select.Option
        className={OPTION_KEYS.OPTION}
        disabled={isOptionDisabled ? isOptionDisabled(option) : false}
        key={option.id}
        title={renderSelected(option)}
        value={option.id}
      >
        {renderOption(option)}
      </Select.Option>
    );
  }

  private onChange(selectedOption: any) {
    const { onChange, onAddNew } = this.injected;

    // Clear
    if (!selectedOption) {
      onChange(null);
      return;
    }

    // Add new
    if (onAddNew && selectedOption.key === OPTION_KEYS.ADD) {
      onAddNew(this.search);
      return;
    }

    // Select from search
    if (this.isMultiSelect) {
      const selectedOptionIds = selectedOption.map((_selectedOption: any) => _selectedOption.key),
        optionsToSearch = uniqBy([...this.injected.value, ...this.options], 'id'),
        foundOptions = optionsToSearch.filter((option: any) => selectedOptionIds.includes(option.id));
      onChange(toJS(foundOptions));
    } else {
      const foundOption = this.options.find(option => option.id === selectedOption.key);
      onChange(toJS(foundOption));
    }
  }

  // istanbul ignore next
  private onBlur() {
    this.search = '';
  }

  // istanbul ignore next
  private onFocus() {
    if (this.isPristine || this.hasNewProps) {
      // Trigger empty search
      this.handleSearch(this.search);
    }
  }

  private get valueProp(): { value?: { key: string; label: string; value: string } } {
    const { value } = this.injected,
      { renderSelected } = this.fieldConfig;

    if (this.isMultiSelect) {
      if (!value) {
        return { value: undefined };
      }

      return {
        value: value.map((_value: any) => ({
          key: _value.id,
          label: renderSelected(_value),
          value: _value.id,
        })),
      };
    }

    const valueId = get(value, 'id');
    if (!valueId) {
      return { value: undefined };
    }

    return {
      value: {
        key: valueId,
        label: renderSelected(value),
        value: valueId,
      },
    };
  }

  private renderDropdownWrapper(menu: React.ReactNode) {
    const { className } = this.selectProps;
    return <div className={className}>{menu}</div>;
  }

  public render() {
    const { id, onAddNew, searchOnEmpty, disabled } = this.injected,
      isLoading: boolean = this.isLoading.isTrue,
      canSearch: boolean = this.hasSearch || !!searchOnEmpty,
      showNoResultsOption: boolean = canSearch && !isLoading && !this.hasOptions,
      showAddOption: boolean = !!(this.hasSearch && onAddNew),
      showNoSearch: boolean = !this.hasSearch,
      { label, showLabel } = this.fieldConfig,
      placeholderLabel: string = showLabel && label ? ` ${label}` : '',
      placeholder = `Search${placeholderLabel}...`;

    return (
      <Select
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
        optionLabelProp="title"
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
      </Select>
    );
  }
}

export default ObjectSearch;
