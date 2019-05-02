import {
  flatten as flattenArray,
  get,
  has,
  isArray,
  isObject,
  set,
  sortBy,
} from 'lodash';

import * as Antd from 'antd';
import { ColumnProps } from 'antd/es/table';

import {
  getOrDefault,
  varToLabel,
} from '@mighty-justice/utils';

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

import { IModel, IValue } from '../props';
import { isTypeObjectSearchCreate } from '../inputs/ObjectSearchCreate';
import { ID_ATTR } from '../consts';

import { TYPES } from './types';
import { renderWithTooltip } from './renderWithTooltip';

// istanbul ignore next
export async function asyncNoop () { return; }

export function falseyToString (value: IValue) { return value || ''; }

const typeDefaults = {
  editComponent: Antd.Input,
  fieldConfigProp: false,
  formValidationRules: {},
  fromForm: falseyToString,
  nullify: false,
  toForm: falseyToString,
};

function stripFieldConfig (func: (...args: any[]) => any) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: any) => func(value);
}

function getFieldSuffix (field?: string) {
  return (field || '').split('.').pop() || '';
}

// tslint:disable-next-line cyclomatic-complexity
function inferType (fieldConfig: Partial<IFieldConfig>) {
  if (fieldConfig.type) {
    return fieldConfig.type;
  }

  const field = getFieldSuffix(fieldConfig.field);

  if (field.includes('amount')) { return 'money'; }
  if (field.includes('body')) { return 'text'; }
  if (field.includes('note')) { return 'text'; }
  if (field.includes('percent')) { return 'percentage'; }
  if (field.includes('summary')) { return 'text'; }

  if (field.endsWith('_on')) { return 'date'; }
  if (field.endsWith('_at')) { return 'date'; }
  if (field.startsWith('is_')) { return 'boolean'; }

  // Putting this ahead of loop so phone_number => phone, and not number
  if (field.includes('phone')) { return 'phone'; }

  // date => date etc.
  for (const type in TYPES) {
    if (field === type) { return type; }
  }

  // start_date => date etc.
  for (const type in TYPES) {
    if (field.includes(type)) { return type; }
  }

  return 'string';
}

export function isPartialFieldSetSimple (fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial {
  return isArray(fieldSet);
}

export function isFieldSetSimple (fieldSet: IFieldSet): fieldSet is IFieldSetSimple {
  return isArray(fieldSet);
}

export function filterInsertIf (fieldConfig: IFieldConfig, model?: IModel | IModel[]): boolean {
  return !!fieldConfig.insertIf && !fieldConfig.insertIf(model);
}

export function fillInFieldConfig (fieldConfig: IFieldConfigPartial): IFieldConfig {
  const type = inferType(fieldConfig)
    , label = varToLabel(getFieldSuffix(fieldConfig.field));

  const requiredValidationRule = fieldConfig.required
    ? {
      required: {
        message: `Please input a valid ${label || 'value'}`,
        required: true,
      },
    } : undefined;

  if (!TYPES[type]) {
    // istanbul ignore next
    throw new Error(`Type '${type}' not in fields-ant TYPES`);
  }

  return {
    // Universal defaults
    disabled: false,
    key: fieldConfig.field,
    label,
    populateFromSearch: false,
    populateNameFromSearch: false,
    readOnly: false,
    render: stripFieldConfig(getOrDefault),
    required: false,
    showLabel: true,
    skipFieldDecorator: false,
    type,
    writeOnly: false,

    // Overrides prioritized
    ...typeDefaults,
    ...TYPES[type],
    ...fieldConfig,

    // Merge nested object
    editProps: {
      ...fieldConfig.editProps,
      ...TYPES[type].editProps,
    },

    // Merge nested object
    formValidationRules: {
      ...fieldConfig.formValidationRules,
      ...TYPES[type].formValidationRules,
      ...requiredValidationRule,
    },
  };
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

export function fillInFieldSet (fieldSet: IFieldSetPartial): IFieldSet {
  // Fills in the defaults from common so we can keep configurations light
  return mapFieldSetFields(fieldSet, fillInFieldConfig) as IFieldSet;
}

export function fillInFieldSets (fieldSets: IFieldSetPartial[]): IFieldSet[] {
  return fieldSets.map(fillInFieldSet);
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
  if (tooltip) { return renderWithTooltip(label, tooltip); }
  return label;
}

type IColumns = Array<ColumnProps<IModel>>;

export function fieldSetsToColumns (fieldSets: IFieldSetPartial[], tableModel: IModel[] = []): IColumns {
  return getFieldSetsFields(fillInFieldSets(fieldSets))
    .filter(fieldConfig => !fieldConfig.writeOnly)
    .filter(fieldConfig => !filterInsertIf(fieldConfig, tableModel))
    .map(fieldConfig => ({
      dataIndex: fieldConfig.field,
      key: fieldConfig.field,
      render: (value: IValue, model: IModel) => fieldConfig.render(value, fieldConfig, model),
      title: renderLabel(fieldConfig),
      ...fieldConfig.tableColumnProps,
    }));
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
      .filter(fieldConfig => !filterInsertIf(fieldConfig, data))
      .filter(fieldConfig => !fieldConfig.readOnly)
      .forEach(fieldConfig => {
        const { field, nullify } = fieldConfig
          , formValue = get(data, field)
          , shouldNullify = nullify && !formValue && formValue !== false
          , nullifiedValue = shouldNullify ? null : formValue

          // When using the add new feature of objectSearchCreate, we should
          // make sure to nullify the appropriate fields in the new model
          , isAddingNew = isObject(formValue) && !has(formValue, ID_ATTR)
          , value = (isTypeObjectSearchCreate(fieldConfig) && isAddingNew)
            ? modelFromFieldConfigs(getFieldSetFields(fieldConfig.createFields).map(fillInFieldConfig), formValue)
            : nullifiedValue
            ;

        set(returnValues, field, value);
      });

    // We always include ids of models on submit
    const id = get(data, ID_ATTR);
    if (id) { set(returnValues, ID_ATTR, id); }

    return returnValues;
  }
