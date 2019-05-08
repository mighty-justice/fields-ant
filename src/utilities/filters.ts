import { IFieldConfig } from '../interfaces';
import { IModel } from '../props';

interface IFilterConditions {
  model?: IModel | IModel[];
}

// filterFieldConfig => True means don't show
export function filterFieldConfig (fieldConfig: IFieldConfig, filterConditions: IFilterConditions): boolean {
  const { model } = filterConditions
    , filterInsertIf = !!(fieldConfig.insertIf && !fieldConfig.insertIf(model))
    ;

  return [filterInsertIf].every(value => value);
}
