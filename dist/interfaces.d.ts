/// <reference types="react" />
import { ColProps } from 'antd/lib/col';
import { ColumnProps } from 'antd/es/table';
import { RowProps } from 'antd/lib/row';
import { IForm, IModel, IValue } from './props';
import { ValidationRule as AntValidationRule } from 'antd/lib/form';
export declare type IFieldsValidator = (value: IValue, fieldConfig: IFieldConfig, model: IModel) => boolean;
export interface IValidationRule extends AntValidationRule {
    fieldsValidator?: IFieldsValidator;
}
interface IFieldConfigBase {
    field: string;
    type: string;
    className?: string;
    label: string | null;
    nullify: boolean;
    render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
    showLabel: boolean;
    tooltip?: string;
    value?: string | number;
    insertIf?: (model: any) => boolean;
    readOnly: boolean;
    writeOnly: boolean;
    disabled: boolean;
    editComponent: any;
    editProps: {
        [key: string]: any;
    };
    formItemProps?: {
        [key: string]: any;
    };
    fromForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
    icon?: string;
    required: boolean;
    toForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
    formValidationRules: {
        [ruleName: string]: IValidationRule;
    };
    tableColumnProps?: Partial<ColumnProps<IModel>>;
    populateFromSearch: boolean;
    populateNameFromSearch: boolean;
    colProps?: ColProps;
    fieldConfigProp: boolean;
    key: string;
    skipFieldDecorator: boolean;
}
export interface IAntFormField {
    id: string;
    onChange: (value: IValue) => void;
    value: IValue;
}
export interface IOption {
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
export interface IFieldConfigObjectSearchCreate extends IFieldConfigBase {
    createFields: IFieldConfigBase[];
    endpoint: string;
    renderOption: (option: IEndpointOption) => React.ReactNode;
    renderSelected: (option: IEndpointOption) => string;
    searchFilters?: {
        [key: string]: any;
    };
}
export declare type IFieldConfig = IFieldConfigBase | IFieldConfigObjectSearchCreate | IFieldConfigOptionSelect;
export declare type IFieldSetSimple = IFieldConfig[];
export interface IFieldSetComplex {
    fields: IFieldSetSimple;
    legend: string;
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
    legend: string;
    rowProps?: RowProps;
    tooltip?: string;
}
export declare type IGetOptions = (optionType: string) => IOption[];
export interface IInjected {
    getEndpoint: (endpoint: string) => Promise<any>;
    getOptions: IGetOptions;
}
export interface IInputProps {
    fieldConfig: IFieldConfig;
    form: IForm;
}
export interface IEndpointOption {
    id: string;
}
export {};
