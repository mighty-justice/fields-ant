import React from 'react';
import {
  flatten as flattenArray,
  get,
  has,
  isArray,
  isObject,
  set,
  some,
  sortBy,
} from 'lodash';

import { ColumnProps } from 'antd/es/table';

import {
  IFieldConfig,
  IFieldConfigOptionSelect,
  IFieldConfigPartial,
  IFieldSet,
  IFieldSetPartial,
  IFieldSetSimple,
  IFieldSetSimplePartial,
  IInjected,
  IOption,
} from '../interfaces';

import { ID_ATTR } from '../consts';
import { IModel, IValue } from '../props';
import { isTypeAddress } from '../inputs/Address';
import { isTypeObjectSearchCreate } from '../inputs/ObjectSearchCreate';
import WithTooltip from '../building-blocks/WithTooltip';

import { fillInFieldConfig, fillInFieldSets } from './fillIn';
import { filterFieldConfig } from './filters';

export function isPartialFieldSetSimple (fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial {
  return isArray(fieldSet);
}

export function isFieldSetSimple (fieldSet: IFieldSet): fieldSet is IFieldSetSimple {
  return isArray(fieldSet);
}

type IMapper = (fields: IFieldConfigPartial) => IFieldConfigPartial;

export function mapFieldSetFields (fieldSet: IFieldSetPartial, mapper: IMapper): IFieldSetPartial {
  if (isPartialFieldSetSimple(fieldSet)) {
    return fieldSet.map(mapper);
  }

  return {
    ...fieldSet,
    fields: fieldSet.fields.map(mapper),
  };
}

export function setFieldSetFields (fieldSet: IFieldSet, fields: IFieldConfig[]) {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return {
    ...fieldSet,
    fields,
  };
}

export function getFieldSetFields (fieldSet: IFieldSet): IFieldConfig[] {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return fieldSet.fields;
}

export function getFieldSetsFields (fieldSets: IFieldSet[]): IFieldConfig[] {
  return flattenArray(fieldSets.map(getFieldSetFields));
}

export function getUnsortedOptions (fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[] {
  const { options, optionType } = fieldConfig;

  if (options) { return options; }
  if (fieldConfig.getOptions && optionType) { return fieldConfig.getOptions(optionType); }
  if (injected.getOptions && optionType) { return injected.getOptions(optionType); }

  // istanbul ignore next
  if (!optionType) {
    throw new Error (`optionType missing in config for ${fieldConfig.field}`);
  }

  // istanbul ignore next
  if (!injected.getOptions) {
    throw new Error (`getOptions not injected for ${fieldConfig.field}`);
  }

  // istanbul ignore next
  throw new Error ('Unknown error in getUnsortedOptions');
}

export function getOptions (fieldConfig: IFieldConfigOptionSelect, injected: IInjected): IOption[] {
  const unsortedOptions = getUnsortedOptions(fieldConfig, injected);
  return fieldConfig.sorted ? sortBy(unsortedOptions, 'name') : unsortedOptions;
}

export function renderValue (fieldConfigPartial: IFieldConfigPartial, model?: IModel): React.ReactNode {
  const fieldConfig = fillInFieldConfig(fieldConfigPartial)
    , { field, render } = fieldConfig
    , value = has(fieldConfig, 'value') ? fieldConfig.value : get(model, field);

  return render(value, fieldConfig, model || {});
}

export function renderLabel (fieldConfig: IFieldConfig): React.ReactNode {
  const { label, showLabel, tooltip } = fieldConfig;
  if (!showLabel) { return ''; }
  if (tooltip) { return <WithTooltip tooltip={tooltip}>{label}</WithTooltip>; }
  return label;
}

type IColumns = Array<ColumnProps<IModel>>;

export function fieldSetsToColumns (fieldSets: IFieldSetPartial[], tableModel: IModel[] = []): IColumns {
  return getFieldSetsFields(fillInFieldSets(fieldSets))
    .filter(fieldConfig => !filterFieldConfig(fieldConfig, { model: tableModel, writeOnly: true }))
    .map(fieldConfig => ({
      dataIndex: fieldConfig.field,
      key: fieldConfig.field,
      render: (value: IValue, model: IModel) => fieldConfig.render(value, fieldConfig, model),
      title: renderLabel(fieldConfig),
      ...fieldConfig.tableColumnProps,
    }));
}

function nullifyValue (fieldConfig: IFieldConfig, data: IModel) {
  const { field, nullify } = fieldConfig
    , formValue = get(data, field)
    , shouldNullify = nullify && !formValue && formValue !== false
    , nullifiedValue = shouldNullify ? null : formValue
    , isAddingNew = isObject(formValue) && !has(formValue, ID_ATTR)
    ;

  // When using the add new feature of objectSearchCreate, we should
  // make sure to nullify the appropriate fields in the new model
  if (isTypeObjectSearchCreate(fieldConfig) && isAddingNew) {
    return modelFromFieldConfigs(getFieldSetFields(fieldConfig.createFields).map(fillInFieldConfig), formValue);
  }

  // When saving an address, nullify if no attributes
  if (nullify && isTypeAddress(fieldConfig) && !some(formValue)) {
    return null;
  }

  return nullifiedValue;
}

export function modelFromFieldConfigs (fieldConfigs: IFieldConfig[], data: IModel) {
    /*
    This function takes in a model with ALL form values, including those that should be hidden like
    readOnly fieldConfigs and those hidden by insertIf. We build a new model from scratch, only
    including those that should be there. We also nullify falsey values that require it here, and
    include the id from the model even if there is no fieldConfig for it.
    */
    const returnValues: IModel = {};

    fieldConfigs
      .filter(fieldConfig => !filterFieldConfig(fieldConfig, { model: data, readOnly: true }))
      .forEach(fieldConfig => {
        const { field } = fieldConfig
          , value = nullifyValue(fieldConfig, data);

        set(returnValues, field, value);
      });

    // We always include ids of models on submit
    const id = get(data, ID_ATTR);
    if (id) { set(returnValues, ID_ATTR, id); }

    return returnValues;
  }

export function noopValidator (_rule: any, _value: any, callback: (message?: string) => void) {
  // Useful for clearing manually-set backend validation errors
  callback();
}
