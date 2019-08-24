import React, { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { IFieldConfigObjectSearchCreate } from '../';
export interface IObjectSearchProps {
    addNewContent?: React.ReactNode;
    debounceWait: number;
    fieldConfig: IFieldConfigObjectSearchCreate;
    loadingIcon?: React.ReactNode;
    noSearchContent?: React.ReactNode;
    onAddNew?: (search: string) => void;
    searchIcon?: React.ReactNode;
    selectProps: SelectProps;
}
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
    private readonly loadingIcon;
    private readonly searchIcon;
    private readonly selectProps;
    private handleSearch;
    private renderOptionAdd;
    private renderOptionEmpty;
    private renderOptionNoSearch;
    private renderOption;
    private onChange;
    private onBlur;
    private onFocus;
    private readonly valueProp;
    render(): JSX.Element;
}
export default ObjectSearch;
