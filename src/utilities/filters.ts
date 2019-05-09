import { IFieldConfig } from '../interfaces';
import { IModel } from '../props';

import { isBoolean } from 'lodash';

interface IFilterConditions {
  model?: IModel | IModel[];
  readOnly?: boolean;
  writeOnly?: boolean;
}

// filterFieldConfig => True means don't show
export function filterFieldConfig (fieldConfig: IFieldConfig, filterConditions: IFilterConditions): boolean {
  const { model, readOnly, writeOnly } = filterConditions
    , filterInsertIf = !!(fieldConfig.insertIf && !fieldConfig.insertIf(model))
    , filterReadOnly = !!(isBoolean(readOnly) && readOnly === fieldConfig.readOnly)
    , filterWriteOnly = !!(isBoolean(writeOnly) && writeOnly === fieldConfig.writeOnly)
    ;

  return [filterInsertIf, filterReadOnly, filterWriteOnly].some(value => value);
}
