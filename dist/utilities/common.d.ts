import React from 'react';
import { ColumnProps } from 'antd/es/table';
import { IFieldConfig, IFieldConfigOptionSelect, IFieldConfigPartial, IFieldSet, IFieldSetPartial, IFieldSetSimple, IFieldSetSimplePartial, IInjected, IOption } from '../interfaces';
import { IModel, IValue } from '../props';
export declare function asyncNoop(): Promise<void>;
export declare function falseyToString(value: IValue): any;
export declare function isPartialFieldSetSimple(fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial;
export declare function isFieldSetSimple(fieldSet: IFieldSet): fieldSet is IFieldSetSimple;
export declare function filterInsertIf(fieldConfig: IFieldConfig, model?: IModel | IModel[]): boolean;
export declare function fillInFieldConfig(fieldConfig: IFieldConfigPartial): IFieldConfig;
declare type IMapper = (fields: IFieldConfigPartial) => IFieldConfigPartial;
export declare function mapFieldSetFields(fieldSet: IFieldSetPartial, mapper: IMapper): IFieldSetPartial;
export declare function fillInFieldSet(fieldSet: IFieldSetPartial): IFieldSet;
export declare function fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[];
export declare function getFieldSetFields(fieldSet: IFieldSet): IFieldConfig[];
export declare function getFieldSetsFields(fieldSets: IFieldSet[]): IFieldConfig[];
export declare function getUnsortedOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function getOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function renderValue(fieldConfigPartial: IFieldConfigPartial, model?: IModel): React.ReactNode;
export declare function renderLabel(fieldConfig: IFieldConfig): React.ReactNode;
declare type IColumns = Array<ColumnProps<IModel>>;
export declare function fieldSetsToColumns(fieldSets: IFieldSetPartial[], tableModel?: IModel[]): IColumns;
export declare function modelFromFieldConfigs(fieldConfigs: IFieldConfig[], data: IModel): IModel;
export {};
