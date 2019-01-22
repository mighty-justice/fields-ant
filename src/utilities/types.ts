import { get } from 'lodash';
import moment from 'moment';
import { format } from 'date-fns';
import { pattern as iso8601pattern } from 'iso8601-duration';

import * as Antd from 'antd';

import {
  IFieldConfig,
} from '../interfaces';

import {
  formatCommaSeparatedNumber,
  formatDate,
  formatMoney,
  formatPercentage,
  getNameOrDefault,
  getPercentDisplay,
  getPercentValue,
  mapBooleanToText,
  parseAndPreserveNewlines,
} from '@mighty-justice/utils';

import ObjectSearchCreate from '../inputs/ObjectSearchCreate';
import OptionSelect from '../inputs/OptionSelect';
import Rate, { formatRating } from '../inputs/Rate';
import { formatOptionSelect } from '../inputs/OptionSelectDisplay';
import RadioGroup from '../inputs/RadioGroup';

function stripFieldConfig (func: (...args: any[]) => any) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: any) => func(value);
}

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
    formValidationRules: {
      iso8601: {
        message: 'Must be a valid iso8601 duration',
        pattern: iso8601pattern,
      },
    },
    nullify: true,
  },
  email: {
    formValidationRules: {
      email: {
        message: 'Must be a valid email address',
        type: 'email',
      },
    },
  },
  money: {
    editProps: {
      addonBefore: '$',
      type: 'number',
    },
    formValidationRules: {
      gteZero: {
        message: 'Amount must be greater than or equal to 0',
        min: 0,
        transform: (value?: string) => value ? Number(value) : undefined,
        type: 'number',
      },
    },
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
  objectSearchCreate: {
    editComponent: ObjectSearchCreate,
    fieldConfigProp: true,
    nullify: true,
    render: stripFieldConfig(getNameOrDefault),
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
    formValidationRules: {
      percentage: {
        max: 100,
        message: 'Percentage must be an integer between 0 and 100',
        min: 0,
        transform: (value?: string) => value ? Number(value) : undefined,
        type: 'integer',
      },
    },
    fromForm: (value: any) => value && getPercentValue(value),
    render: stripFieldConfig(formatPercentage),
    toForm: (data: any, field: string) => getPercentDisplay(get(data, field)),
  },
  radio: {
    editComponent: RadioGroup,
    fieldConfigProp: true,
    nullify: true,
    render: formatOptionSelect,
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
