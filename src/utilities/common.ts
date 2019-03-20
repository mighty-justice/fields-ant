import { flatten as flattenArray, get, isArray, sortBy, has, set } from 'lodash';

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

import { TYPES } from './types';

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

export function filterInsertIf (fieldConfig: IFieldConfig, model?: IModel | IModel[]) {
  return fieldConfig.insertIf && !fieldConfig.insertIf(model);
}

export function fillInFieldConfig (fieldConfig: IFieldConfigPartial): IFieldConfig {
  const type = inferType(fieldConfig)
    , label = varToLabel(getFieldSuffix(fieldConfig.field));

  const requiredValidationRule = fieldConfig.required
    ? {
      required: {
        message: 'Field required',
        required: true,
      },
    } : undefined;

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

export function fillInFieldSet (fieldSet: IFieldSetPartial): IFieldSet {
  // Fills in the defaults from common so we can keep configurations light
  if (isPartialFieldSetSimple(fieldSet)) {
    return fieldSet.map(fillInFieldConfig);
  }

  return {
    ...fieldSet,
    fields: fieldSet.fields.map(fillInFieldConfig),
  };
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
  throw new Error ('FieldConfig missing options, getOptions; getOptions not injected');
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

type IColumns = Array<ColumnProps<IModel>>;

export function fieldSetsToColumns (fieldSets: IFieldSetPartial[], tableModel: IModel[] = []): IColumns {
  return getFieldSetsFields(fillInFieldSets(fieldSets))
    .filter(fieldConfig => !fieldConfig.writeOnly)
    .filter(fieldConfig => !filterInsertIf(fieldConfig, tableModel))
    .map(fieldConfig => ({
      dataIndex: fieldConfig.field,
      key: fieldConfig.field,
      render: (value: IValue, model: IModel) => fieldConfig.render(value, fieldConfig, model),
      title: fieldConfig.showLabel ? fieldConfig.label : '',
      ...fieldConfig.tableColumnProps,
    }));
}

export function modelFromFieldConfigs (fieldConfigs: IFieldConfigPartial[], data: IModel) {
    const returnValues: IModel = {};

    fieldConfigs
      .map(fillInFieldConfig)
      .filter(fieldConfig => !filterInsertIf(fieldConfig, data))
      .filter(fieldConfig => !fieldConfig.readOnly)
      .forEach(fieldConfig => {
        const { field, nullify } = fieldConfig
          , formValue = get(data, field)
          , shouldNullify = nullify && !formValue && formValue !== false
          , value = shouldNullify ? null : formValue
          ;

        set(returnValues, field, value);
      });

    return returnValues;
  }
