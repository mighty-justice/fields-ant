import React, { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfig, IFieldConfigObjectSearchCreate } from '../';
export declare function isTypeObjectSearchCreate(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate;
export interface IObjectSearchCreateProps {
    addNewContent?: React.ReactNode;
    className?: string;
    debounceWait?: number;
    decoratorOptions: {
        [key: string]: any;
    };
    fieldConfig: IFieldConfigObjectSearchCreate;
    fieldDecorator: <T>(component: T) => T;
    formManager: FormManager;
    loadingIcon?: React.ReactNode;
    noSearchContent?: React.ReactNode;
    onAddNewToggle?: (isAddingNew: boolean) => void;
    searchIcon?: React.ReactNode;
    selectProps: SelectProps;
}
declare class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
    private isAddingNew;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly objectSearchProps;
    private onAddNew;
    private onSearch;
    private renderAddNew;
    private renderSearch;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
