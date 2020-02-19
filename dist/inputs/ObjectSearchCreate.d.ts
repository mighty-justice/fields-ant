import React, { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IEndpointOption, IFieldConfig, IFieldConfigObjectSearchCreate } from '../';
import { IModel } from '../props';
export declare function isTypeObjectSearchCreate(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate;
export interface IObjectSearchCreateProps {
    addNewContent?: React.ReactNode;
    className?: string;
    debounceWait?: number;
    fieldConfig: IFieldConfigObjectSearchCreate;
    fieldDecorator: <T>(component: T) => T;
    formManager: FormManager;
    formModel: IModel;
    isOptionDisabled?: (option: IEndpointOption) => boolean;
    loadingIcon?: React.ReactNode;
    noSearchContent?: React.ReactNode;
    onAddNewToggle?: (isAddingNew: boolean) => void;
    searchIcon?: React.ReactNode;
    searchOnEmpty?: boolean;
    selectProps: SelectProps;
}
declare class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
    private isAddingNew;
    private search;
    private get injected();
    private get fieldConfig();
    private get objectSearchProps();
    private onAddNew;
    private onSearch;
    private renderAddNew;
    private renderSearch;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
