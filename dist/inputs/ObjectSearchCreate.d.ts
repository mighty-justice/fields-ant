import React, { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfigObjectSearchCreate } from '../';
export interface IObjectSearchCreateProps {
    addNewContent?: React.ReactNode;
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
    render(): JSX.Element;
}
export default ObjectSearchCreate;
