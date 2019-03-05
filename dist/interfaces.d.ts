/// <reference types="react" />
import { ColProps } from 'antd/lib/col';
import { RowProps } from 'antd/lib/row';
import { IForm, IModel, IValue } from './props';
interface IFieldConfigBase {
    field: string;
    type: string;
    className?: string;
    label: string | null;
    nullify: boolean;
    render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
    showLabel: boolean;
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
    formValidationRules: {
        [ruleName: string]: {
            [attribute: string]: any;
        };
    };
    fromForm: (value: IValue) => any;
    icon?: string;
    required: boolean;
    toForm: (data: any, field: string) => any;
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
    searchFilters?: {
        [key: string]: any;
    };
}
export declare type IFieldConfig = IFieldConfigBase | IFieldConfigObjectSearchCreate | IFieldConfigOptionSelect;
export declare type IFieldConfigPartial = Partial<IFieldConfig> & {
    field: string;
};
export declare type IFieldSetSimplePartial = IFieldConfigPartial[];
export declare type IFieldSetSimple = IFieldConfig[];
export interface IFieldSetComplex {
    fields: IFieldSetSimple;
    legend: string;
    rowProps?: RowProps;
}
export interface IFieldSetComplexPartial {
    fields: IFieldSetSimplePartial;
    legend: string;
    rowProps?: RowProps;
}
export declare type IFieldSet = IFieldSetSimple | IFieldSetComplex;
export declare type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;
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
    name: string;
}
export {};
