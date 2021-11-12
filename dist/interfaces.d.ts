/// <reference types="react" />
import { ClassValue } from 'classnames/types';
import { ColProps } from 'antd/es/col';
import { ColumnProps } from 'antd/es/table';
import { RowProps } from 'antd/es/row';
import { FormItemProps } from 'antd/es/form';
import { Rule } from 'rc-field-form/lib/interface';
import { IModel, IValue } from './props';
import { FormManager, ITableModel } from './utilities';
interface IFieldConfigBase {
    className?: ClassValue;
    colProps?: ColProps;
    disabled: boolean;
    editComponent: any;
    editProps: {
        [key: string]: any;
    };
    field: string;
    fieldConfigProp: boolean;
    formItemProps?: Partial<FormItemProps>;
    formItemRenderExtra?: (value: IValue) => React.ReactNode;
    formValidationRules: {
        [ruleName: string]: Rule;
    };
    fromForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
    icon?: string;
    insertIf?: (model: any) => boolean;
    key: string;
    label: string | null;
    name: string[];
    nullify: boolean;
    populateFromSearch: boolean;
    populateNameFromSearch: boolean;
    readOnly: boolean;
    render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
    required: boolean;
    showLabel: boolean;
    skipFieldDecorator: boolean;
    tableColumnProps?: Partial<ColumnProps<ITableModel>>;
    toForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
    tooltip?: string;
    type: string;
    value?: string | number | boolean;
    writeOnly: boolean;
}
export interface IAntFormField {
    disabled: boolean;
    id: string;
    onChange: (value: IValue) => void;
    value: IValue;
}
export interface IOption {
    disabled?: boolean;
    name: string;
    value: string;
}
export interface IFieldConfigOptionSelect extends IFieldConfigBase {
    getOptions?: (optionType: string) => IOption[];
    options?: IOption[];
    optionType?: string;
    showSearch?: boolean;
    sorted?: boolean;
}
export interface IFieldConfigAddress extends IFieldConfigBase {
    stateProps?: Partial<IFieldConfigOptionSelect>;
}
export interface IFieldConfigObjectSearchCreate extends IFieldConfigBase {
    createFields: IFieldSet;
    endpoint: string;
    renderOption: (option: IEndpointOption) => React.ReactNode;
    renderSelected: (option: IEndpointOption) => string;
    searchFilters?: {
        [key: string]: any;
    };
}
export declare type IFieldConfig = IFieldConfigBase | IFieldConfigAddress | IFieldConfigObjectSearchCreate | IFieldConfigOptionSelect;
export declare type IFieldSetSimple = IFieldConfig[];
export interface IFieldSetComplex {
    fields: IFieldSetSimple;
    legend?: string;
    rowProps?: RowProps;
    tooltip?: string;
}
export declare type IFieldSet = IFieldSetSimple | IFieldSetComplex;
export declare type IFieldConfigPartial = Partial<IFieldConfig> & {
    field: string;
};
export declare type IFieldSetSimplePartial = IFieldConfigPartial[];
export declare type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;
export interface IFieldSetComplexPartial {
    fields: IFieldSetSimplePartial;
    legend?: string;
    rowProps?: RowProps;
    tooltip?: string;
}
export declare type IGetOptions = (optionType: string) => IOption[];
export interface IInjected {
    getEndpoint: (endpoint: string) => Promise<any>;
    getOptions: IGetOptions;
}
export interface IFormFieldProps {
    fieldConfig: IFieldConfig;
    formManager: FormManager;
    formModel: IModel;
}
export interface ICheckboxProps extends IFormFieldProps {
    description?: string;
    disabledText?: string;
}
export interface IEndpointOption {
    id: string;
}
export declare type ILayout = 'horizontal' | 'inline' | 'vertical';
export interface IFormatProps {
    layout?: ILayout;
    colon?: boolean;
}
export {};
