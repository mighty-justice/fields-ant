/// <reference types="react" />
import { IFieldConfig, IFieldConfigOptionSelect, IFieldConfigPartial, IFieldSet, IFieldSetPartial, IFieldSetSimple, IFieldSetSimplePartial, IInjected, IOption } from '../interfaces';
import { IModel } from '../props';
export declare function asyncNoop(): Promise<void>;
export declare function isPartialFieldSetSimple(fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial;
export declare function isFieldSetSimple(fieldSet: IFieldSet): fieldSet is IFieldSetSimple;
export declare function filterInsertIf(fieldConfig: IFieldConfig, model: any): boolean | undefined;
export declare function fillInFieldConfig(fieldConfig: IFieldConfigPartial): IFieldConfig;
export declare function fillInFieldSet(fieldSet: IFieldSetPartial): IFieldSet;
export declare function fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[];
export declare function getFieldSetFields(fieldSet: IFieldSet): IFieldConfig[];
export declare function getFieldSetsFields(fieldSets: IFieldSet[]): IFieldConfig[];
export declare function getUnsortedOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function getOptions(fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[];
export declare function renderValue(fieldConfigPartial: IFieldConfigPartial, model?: IModel): React.ReactNode;
