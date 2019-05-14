import { IFieldConfig, IFieldConfigPartial, IFieldSet, IFieldSetPartial } from '../interfaces';
import { IValue } from '../props';
export declare function falseyToString(value: IValue): any;
export declare function fillInFieldConfig(fieldConfig: IFieldConfigPartial): IFieldConfig;
export declare function fillInFieldSet(fieldSet: IFieldSetPartial): IFieldSet;
export declare function fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[];
