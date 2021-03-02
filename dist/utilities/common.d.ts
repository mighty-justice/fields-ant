import React from 'react';
import { ColumnProps } from 'antd/es/table';
import { IFieldConfig, IFieldConfigOptionSelect, IFieldConfigPartial, IFieldSet, IFieldSetPartial, IFieldSetSimple, IFieldSetSimplePartial, IInjected, IOption } from '../interfaces';
import { IModel } from '../props';
export declare function isPartialFieldSetSimple(fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial;
export declare function isFieldSetSimple(fieldSet: IFieldSet): fieldSet is IFieldSetSimple;
declare type IMapper = (fields: IFieldConfigPartial) => IFieldConfigPartial;
export declare function mapFieldSetFields(fieldSet: IFieldSetPartial, mapper: IMapper): IFieldSetPartial;
export declare function setFieldSetFields(fieldSet: IFieldSet, fields: IFieldConfig[]): IFieldSetSimple | {
    fields: IFieldConfig[];
    legend?: string | undefined;
    rowProps?: import("antd/es/grid").RowProps | undefined;
    tooltip?: string | undefined;
};
export declare function getFieldSetFields(fieldSet: IFieldSet): IFieldConfig[];
export declare function getFieldSetsFields(fieldSets: IFieldSet[]): IFieldConfig[];
export declare function getUnsortedOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function getOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function renderValue(fieldConfigPartial: IFieldConfigPartial, model?: IModel): React.ReactNode;
export declare function renderLabel(fieldConfig: IFieldConfig): React.ReactNode;
export interface ITableModel extends IModel {
    key: string;
}
export declare type IColumns = Array<ColumnProps<ITableModel>>;
export declare function fieldSetsToColumns(fieldSets: IFieldSetPartial[], tableModel?: ITableModel[]): IColumns;
export declare function modelFromFieldConfigs(fieldConfigs: IFieldConfig[], data: IModel): IModel;
export declare function noopValidator(_rule: any, _value: any, callback: (message?: string) => void): void;
export declare function getBtnClassName(action: string, classNameSuffix?: string, title?: React.ReactNode): string;
export {};
