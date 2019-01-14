/// <reference types="react" />
interface IFieldConfigUniversal {
    className?: any;
    disabled?: boolean;
    editComponent: any;
    editProps: {
        [key: string]: any;
    };
    field: string;
    fieldConfigProp: boolean;
    formItemProps?: {
        [key: string]: any;
    };
    icon?: string;
    insertIf?: (model: any) => boolean;
    key: string;
    label: string | null;
    nullify: boolean;
    readOnly: boolean;
    render: (...args: any[]) => string | JSX.Element | JSX.Element[];
    required: boolean;
    showLabel: boolean;
    type: string;
    writeOnly?: boolean;
}
interface IFieldConfigBase extends IFieldConfigUniversal {
    formValidationRules: any[];
    fromForm: (value: any) => any;
    toForm: (data: any, field: string) => any;
    value?: string | number;
}
export interface IAntFormField {
    id: string;
    onChange: (value: any) => void;
    value: any;
}
export interface IOption {
    name: string;
    value: string;
}
export interface IFieldConfigOptionSelect extends IFieldConfigBase {
    getOptions?: (optionType: string) => IOption[];
    options?: IOption[];
    optionType: string;
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
}
export interface IFieldSetComplexPartial {
    fields: IFieldSetSimplePartial;
    legend: string;
}
export declare type IFieldSet = IFieldSetSimple | IFieldSetComplex;
export declare type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;
export interface ICardConfig {
    accessor?: string;
    classNameSuffix?: string;
    fieldSets: IFieldSet[] | IFieldSetPartial[];
    isArray?: boolean;
    title?: string;
}
export {};
