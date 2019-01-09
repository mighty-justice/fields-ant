import { ICardConfig, IFieldConfig, IFieldConfigPartial, IFieldSet, IFieldSetPartial, IFieldSetSimple, IFieldSetSimplePartial } from '../interfaces';
export declare function isPartialFieldSetSimple(fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial;
export declare function isFieldSetSimple(fieldSet: IFieldSet): fieldSet is IFieldSetSimple;
export declare function filterInsertIf(fieldConfig: IFieldConfig, model: any): boolean | undefined;
export declare function fillInFieldConfig(fieldConfig: IFieldConfigPartial): IFieldConfig;
export declare function fillInFieldSet(fieldSet: IFieldSetPartial): IFieldSet;
export declare function fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[];
export declare function getCardModel(model: any, cardConfig: ICardConfig): any;
export declare function getFieldSetFields(fieldSet: IFieldSet): IFieldConfig[];
