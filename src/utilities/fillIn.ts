import { Input } from 'antd';

import { Rule } from 'rc-field-form/lib/interface';

import { getOrDefault, varToLabel } from '@mighty-justice/utils';

import { IFieldConfig, IFieldConfigPartial, IFieldSet, IFieldSetPartial } from '../interfaces';
import { IValue } from '../props';

import { TYPES } from './types';
import { mapFieldSetFields } from './common';

export function falseyToString(value: IValue) {
  return value || '';
}

const typeDefaults = {
  editComponent: Input,
  fieldConfigProp: false,
  formValidationRules: {},
  fromForm: falseyToString,
  nullify: false,
  toForm: falseyToString,
};

function stripFieldConfig(func: (...args: any[]) => any) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: any) => func(value);
}

export function getFieldSuffix(field?: string) {
  return (field || '').split('.').pop() || '';
}

// tslint:disable-next-line cyclomatic-complexity
function inferType(fieldConfig: Partial<IFieldConfig>) {
  if (fieldConfig.type) {
    return fieldConfig.type;
  }

  const field = getFieldSuffix(fieldConfig.field);

  if (field.includes('amount')) {
    return 'money';
  }
  if (field.includes('body')) {
    return 'text';
  }
  if (field.includes('note')) {
    return 'text';
  }
  if (field.includes('percent')) {
    return 'percentage';
  }
  if (field.includes('summary')) {
    return 'text';
  }

  if (field.endsWith('_on')) {
    return 'date';
  }
  if (field.endsWith('_at')) {
    return 'date';
  }
  if (field.startsWith('is_')) {
    return 'boolean';
  }

  // Putting this ahead of loop so phone_number => phone, and not number
  if (field.includes('phone')) {
    return 'phone';
  }

  // date => date etc.
  for (const type in TYPES) {
    if (field === type) {
      return type;
    }
  }

  // start_date => date etc.
  for (const type in TYPES) {
    if (field.includes(type)) {
      return type;
    }
  }

  return 'string';
}

export function fillInFieldConfig(fieldConfig: IFieldConfigPartial): IFieldConfig {
  const type: string = inferType(fieldConfig),
    label: string = fieldConfig.label || varToLabel(getFieldSuffix(fieldConfig.field));

  const requiredValidationRule: undefined | { [key: string]: Rule } = fieldConfig.required
    ? {
        required: {
          message: `'${label}' is required`,
          required: true,
        },
      }
    : undefined;

  // istanbul ignore next
  if (!TYPES[type]) {
    // istanbul ignore next
    throw new Error(`Type '${type}' not in fields-ant TYPES`);
  }

  return {
    // Universal defaults
    disabled: false,
    key: fieldConfig.field,
    label,
    name: fieldConfig.field.split('.'),
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
      ...TYPES[type].formValidationRules,
      ...fieldConfig.formValidationRules,
      ...requiredValidationRule,
    },
  };
}

export function fillInFieldSet(fieldSet: IFieldSetPartial): IFieldSet {
  // Fills in the defaults from common so we can keep configurations light
  return mapFieldSetFields(fieldSet, fillInFieldConfig) as IFieldSet;
}

export function fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[] {
  return fieldSets.map(fillInFieldSet);
}
