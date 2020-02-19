import { IFieldConfig, IFieldSet } from '../interfaces';
import { IModel } from '../props';
interface IFilterConditions {
    model?: IModel | IModel[];
    readOnly?: boolean;
    writeOnly?: boolean;
}
export declare function filterFieldConfig(fieldConfig: IFieldConfig, filterConditions: IFilterConditions): boolean;
export declare function filterFieldConfigs(fieldConfigs: IFieldConfig[], filterConditions: IFilterConditions): IFieldConfig[];
export declare function filterFieldSet(fieldSet: IFieldSet, filterConditions: IFilterConditions): import("../interfaces").IFieldSetSimple | {
    fields: IFieldConfig[];
    legend?: string | undefined;
    rowProps?: import("antd/lib/grid").RowProps | undefined;
    tooltip?: string | undefined;
};
export declare function filterFieldSets(fieldSets: IFieldSet[], filterConditions: IFilterConditions): (import("../interfaces").IFieldSetSimple | {
    fields: IFieldConfig[];
    legend?: string | undefined;
    rowProps?: import("antd/lib/grid").RowProps | undefined;
    tooltip?: string | undefined;
})[];
export {};
