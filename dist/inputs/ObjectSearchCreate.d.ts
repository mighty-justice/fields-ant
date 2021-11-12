import React, { Component } from 'react';
import { ClassValue } from 'classnames/types';
import { SelectProps } from 'antd/es/select';
import { FormManager, IEndpointOption, IFieldConfig, IFieldConfigObjectSearchCreate } from '../';
import { IModel } from '../props';
export declare function isTypeObjectSearchCreate(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate;
export interface IObjectSearchCreateProps {
    addNewContent?: React.ReactNode;
    className?: ClassValue;
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
    selectProps: SelectProps<any>;
}
export declare const CLASS_NAME: string;
export declare const CLASS_NAME_BTN_BACK: string;
export declare const CLASS_NAME_CREATING: string;
declare class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
    private isAddingNew;
    private search;
    private get injected();
    private get fieldConfig();
    private get createFields();
    private onSwitchToAddNew;
    private onSwitchBackToSearch;
    private renderAddNew;
    private renderSearch;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
