import React, { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { IEndpointOption, IFieldConfigObjectSearchCreate } from '../';
export interface IObjectSearchProps {
    addNewContent?: React.ReactNode;
    debounceWait: number;
    fieldConfig: IFieldConfigObjectSearchCreate;
    loadingIcon?: React.ReactNode;
    noSearchContent?: React.ReactNode;
    onAddNew: (search: string) => void;
    renderOption?: (option: IEndpointOption) => React.ReactNode;
    searchIcon?: React.ReactNode;
    selectProps: SelectProps;
}
declare class ObjectSearchCreateSearchInput extends Component<IObjectSearchProps> {
    private options;
    private isLoading;
    private search;
    static defaultProps: Partial<IObjectSearchProps>;
    private debouncedHandleSearch;
    constructor(props: IObjectSearchProps);
    private readonly injected;
    private readonly fieldConfig;
    private readonly hasSearch;
    private readonly hasOptions;
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
    render(): JSX.Element;
}
export default ObjectSearchCreateSearchInput;