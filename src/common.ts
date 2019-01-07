import { get, isArray } from 'lodash';
import moment from 'moment';
import { format } from 'date-fns';
import { pattern as iso8601pattern } from 'iso8601-duration';

import * as Antd from 'antd';

import {
  ICardConfig,
  IFieldConfig,
  IFieldConfigPartial,
  IFieldSet,
  IFieldSetPartial,
  IFieldSetSimple,
  IFieldSetSimplePartial,
} from './interfaces';

import {
  formatCommaSeparatedNumber,
  formatDate,
  formatMoney,
  formatPercentage,
  getOrDefault,
  getPercentDisplay,
  getPercentValue,
  mapBooleanToText,
  parseAndPreserveNewlines,
  varToLabel,
} from '@mighty-justice/utils';

import OptionSelect from './OptionSelect';
import Rate, { formatRating } from './Rate';
import { formatOptionSelect } from './OptionSelectDisplay';

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

export const TYPES: { [key: string]: Partial<IFieldConfig> } = {
  boolean: {
    render: stripFieldConfig(mapBooleanToText),
  },
  date: {
    editComponent: Antd.DatePicker,
    fromForm: (value: any) => value && format(value, 'YYYY-MM-DD'),
    render: stripFieldConfig(formatDate),
    toForm: (data: any, field: string) => get(data, field, null) && moment(data[field]),
  },
  duration: {
    formValidationRules: [
      {
        message: 'Must be a valid iso8601 duration',
        pattern: iso8601pattern,
      },
    ],
    nullify: true,
  },
  money: {
    editProps: {
      addonBefore: '$',
      type: 'number',
    },
    formValidationRules: [
      {
        message: 'Amount must be greater than or equal to 0',
        min: 0,
        transform: (value?: string) => value ? Number(value) : undefined,
        type: 'number',
      },
    ],
    nullify: true,
    render: stripFieldConfig(formatMoney),
    toForm: (data: any, field: string) => get(data, field, ''),
  },
  number: {
    editComponent: Antd.Input,
    editProps: { type: 'number' },
    nullify: true,
    render: formatCommaSeparatedNumber,
  },
  optionSelect: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    nullify: true,
    render: formatOptionSelect,
  },
  percent: {
    editProps: {
      addonAfter: '%',
      type: 'number',
    },
    formValidationRules: [
      {
        max: 100,
        message: 'Percentage must be an integer between 0 and 100',
        min: 0,
        transform: (value?: string) => value ? Number(value) : undefined,
        type: 'integer',
      },
    ],
    fromForm: (value: any) => value && getPercentValue(value),
    render: stripFieldConfig(formatPercentage),
    toForm: (data: any, field: string) => getPercentDisplay(get(data, field)),
  },
  rating: {
    editComponent: Rate,
    nullify: true,
    render: formatRating,
  },
  string: {},
  text: {
    editComponent: Antd.Input.TextArea,
    editProps: {
      autosize: { minRows: 4 },
    },
    render: stripFieldConfig(parseAndPreserveNewlines),
  },
};

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
