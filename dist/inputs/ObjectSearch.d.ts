import React, { Component } from 'react';
import { SelectProps } from 'antd/es/select';
import { IEndpointOption, IFieldConfigObjectSearchCreate } from '../';
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
export declare const CLASS_NAME: string;
export declare const OPTION_KEYS: {
    ADD: string;
    EMPTY: string;
    NO_SEARCH: string;
    OPTION: string;
};
declare class ObjectSearch extends Component<IObjectSearchProps> {
    private options;
    private isLoading;
    private search;
    private previousEndpoint;
    private previousSearchFilters;
    static defaultProps: Partial<IObjectSearchProps>;
    private debouncedHandleSearch;
    constructor(props: IObjectSearchProps);
    private readonly injected;
    private readonly fieldConfig;
    private readonly hasSearch;
    private readonly hasOptions;
    private updateValueCaches;
    private readonly hasNewEndpoint;
    private readonly hasNewSearchFilters;
    private readonly hasNewProps;
    private readonly isPristine;
    private readonly isMultiSelect;
    private readonly loadingIcon;
    private readonly searchIcon;
    private readonly selectProps;
    private handleSearch;
    private renderAddOption;
    private renderNoResultsOption;
    private renderNoSearchOption;
    private renderOption;
    private onChange;
    private onBlur;
    private onFocus;
    private readonly valueProp;
    private renderDropdownWrapper;
    render(): JSX.Element;
}
export default ObjectSearch;
