import { get, isArray } from 'lodash';

import * as Antd from 'antd';

import {
  getOrDefault,
  varToLabel,
} from '@mighty-justice/utils';

import {
  ICardConfig,
  IFieldConfig,
  IFieldConfigPartial,
  IFieldSet,
  IFieldSetPartial,
  IFieldSetSimple,
  IFieldSetSimplePartial,
} from '../interfaces';

import { TYPES } from './types';

const typeDefaults = {
  editComponent: Antd.Input,
  fieldConfigProp: false,
  formValidationRules: [],
  fromForm: (value: any) => value,
  nullify: false,
  toForm: (data: any, field: string) => get(data, field, ''),
};

function stripFieldConfig (func: (...args: any[]) => any) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: any) => func(value);
}

const FORM_INPUT_WIDTH = 220;

function getFieldSuffix (field?: string) {
  return (field || '').split('.').pop() || '';
}

// tslint:disable-next-line cyclomatic-complexity
function inferType (fieldConfig: Partial<IFieldConfig>) {
  if (fieldConfig.type) {
    return fieldConfig.type;
  }

  const field = getFieldSuffix(fieldConfig.field);

  if (field.includes('duration')) { return 'duration'; }
  if (field.includes('rating')) { return 'rating'; }
  if (field.includes('amount')) { return 'money'; }
  if (field.endsWith('_on')) { return 'date'; }
  if (field.startsWith('date')) { return 'date'; }
  if (field.endsWith('date')) { return 'date'; }
  if (field.endsWith('_at')) { return 'date'; }
  if (field.startsWith('is_')) { return 'boolean'; }
  if (field.includes('note')) { return 'text'; }
  if (field.includes('body')) { return 'text'; }
  if (field.includes('summary')) { return 'text'; }
  if (field.includes('percent')) { return 'percent'; }

  return 'string';
}

export function isPartialFieldSetSimple (fieldSet: IFieldSetPartial): fieldSet is IFieldSetSimplePartial {
  return isArray(fieldSet);
}

export function isFieldSetSimple (fieldSet: IFieldSet): fieldSet is IFieldSetSimple {
  return isArray(fieldSet);
}

export function filterInsertIf (fieldConfig: IFieldConfig, model: any) {
  return fieldConfig.insertIf && !fieldConfig.insertIf(model);
}

export function fillInFieldConfig (fieldConfig: IFieldConfigPartial): IFieldConfig {
  const type = inferType(fieldConfig)
    , label = varToLabel(getFieldSuffix(fieldConfig.field));

  const requiredValidationRule = [];
  if (fieldConfig.required) {
    requiredValidationRule.push({
      message: 'Field required',
      required: true,
    });
  }

  return {
    key: fieldConfig.field,
    label,
    readOnly: false,
    render: stripFieldConfig(getOrDefault),
    required: false,
    showLabel: true,
    type,

    ...typeDefaults,
    ...TYPES[type],
    ...fieldConfig,

    editProps: {
      style: { width: FORM_INPUT_WIDTH },
      ...fieldConfig.editProps,
      ...TYPES[type].editProps,
    },

    formValidationRules: [
      ...(fieldConfig.formValidationRules || []),
      ...(TYPES[type].formValidationRules || []),
      ...requiredValidationRule,
    ],
  };
}

export function fillInFieldSets (fieldSets: IFieldSetPartial[]): IFieldSet[] {
  // Fills in the defaults from common so we can keep configurations light
  return fieldSets.map(fieldSet => {
    if (isPartialFieldSetSimple(fieldSet)) {
      return fieldSet.map(fillInFieldConfig);
    }

    return {
      ...fieldSet,
      fields: fieldSet.fields.map(fillInFieldConfig),
    };
  });
}

export function getCardModel (model: any, cardConfig: ICardConfig) {
  const { accessor } = cardConfig;

  if (accessor) {
    return get(model, accessor);
  }

  return model;
}

export function getFieldSetFields (fieldSet: IFieldSet): IFieldConfig[] {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return fieldSet.fields;
}
