import { IFieldConfig, IFieldSet } from '../interfaces';
import { IModel } from '../props';

import { isBoolean } from 'lodash';
import { getFieldSetFields, setFieldSetFields } from './common';

interface IFilterConditions {
  model?: IModel | IModel[];
  readOnly?: boolean;
  writeOnly?: boolean;
}

// filterFieldConfig => True means don't show
export function filterFieldConfig(fieldConfig: IFieldConfig, filterConditions: IFilterConditions): boolean {
  const { model, readOnly, writeOnly } = filterConditions,
    filterInsertIf = !!(fieldConfig.insertIf && !fieldConfig.insertIf(model)),
    filterReadOnly = !!(isBoolean(readOnly) && readOnly === fieldConfig.readOnly),
    filterWriteOnly = !!(isBoolean(writeOnly) && writeOnly === fieldConfig.writeOnly);

  return [filterInsertIf, filterReadOnly, filterWriteOnly].some(value => value);
}

export function filterFieldConfigs(fieldConfigs: IFieldConfig[], filterConditions: IFilterConditions) {
  return fieldConfigs.filter(fieldConfig => !filterFieldConfig(fieldConfig, filterConditions));
}

export function filterFieldSet(fieldSet: IFieldSet, filterConditions: IFilterConditions) {
  const fieldConfigs = getFieldSetFields(fieldSet).filter(
    fieldConfig => !filterFieldConfig(fieldConfig, filterConditions),
  );
  return setFieldSetFields(fieldSet, fieldConfigs);
}

export function filterFieldSets(fieldSets: IFieldSet[], filterConditions: IFilterConditions) {
  return fieldSets
    .map(fieldSet => filterFieldSet(fieldSet, filterConditions))
    .filter(fieldSet => !!getFieldSetFields(fieldSet).length);
}
