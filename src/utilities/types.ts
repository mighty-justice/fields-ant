import { isBoolean } from 'lodash';
import moment from 'moment';
import { format } from 'date-fns';
import { pattern as iso8601pattern } from 'iso8601-duration';

import * as Antd from 'antd';

import {
  IFieldConfig,
} from '../interfaces';

import {
  EMPTY_FIELD,
  formatCommaSeparatedNumber,
  formatDate,
  formatMoney,
  formatPercentage,
  formatPhoneNumber,
  formatSocialSecurityNumber,
  formatWebsite,
  getNameOrDefault,
  getPercentDisplay,
  getPercentValue,
  isValidDate,
  mapBooleanToText,
  parseAndPreserveNewlines,
} from '@mighty-justice/utils';

import Date from '../inputs/Date';
import ObjectSearchCreate from '../inputs/ObjectSearchCreate';
import OptionSelect from '../inputs/OptionSelect';
import RadioGroup from '../inputs/RadioGroup';
import Rate, { formatRating } from '../inputs/Rate';
import { formatOptionSelect } from '../inputs/OptionSelectDisplay';
import { IModel, IValue } from '../props';
import { REGEXP_SSN } from '../consts';
import { getDateFormatList } from './getDateFormatList';
import ObjectSearch from '../inputs/ObjectSearch';
import Hidden from '../inputs/Hidden';
import Checkbox from '../inputs/Checkbox';

function passRenderOnlyValue (func: (value: IValue) => React.ReactNode) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: IValue, _fieldConfig: IFieldConfig, _model: IModel) => func(value);
}

function passRenderOnlyValueAndFieldConfig (func: (value: IValue, fieldConfig: IFieldConfig) => React.ReactNode) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: IValue, fieldConfig: IFieldConfig, _model: IModel) => func(value, fieldConfig);
}

function passToFormOnlyValue (func: (value: IValue) => IValue) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return (value: IValue, _fieldConfig: IFieldConfig) => func(value);
}

export function booleanToForm (value: IValue) {
  return isBoolean(value) ? value.toString() : value;
}

function booleanFromForm (value: IValue) {
  for (const bool of [true, false]) {
    if (value === bool || value === bool.toString()) {
      return bool;
    }
  }
  return value;
}

const dateFormatList = getDateFormatList();

export const TYPES: { [key: string]: Partial<IFieldConfig> } = {
  boolean: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    fromForm: booleanFromForm,
    nullify: true,
    options: [{ value: 'false', name: 'No' }, { value: 'true', name: 'Yes' }],
    render: passRenderOnlyValue(mapBooleanToText),
    toForm: passToFormOnlyValue(booleanToForm),
  },
  checkbox: {
    editComponent: Checkbox,
    fromForm: (value) => !!value,
    render: passRenderOnlyValue(mapBooleanToText),
  },
  date: {
    editComponent: Date,
    formValidationRules: {
      isValidDate: {
        fieldsValidator: isValidDate,
        message: 'Must be a valid date',
      },
    },
    nullify: true,
    render: passRenderOnlyValue(formatDate),
  },
  datepicker: {
    editComponent: Antd.DatePicker,
    editProps: { format: dateFormatList },
    fromForm: (value: any) => value && format(value, 'YYYY-MM-DD'),
    render: passRenderOnlyValue(formatDate),
    toForm: (value: any) => (value || null) && moment(value),
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
  hidden: {
    editComponent: Hidden,
    fieldConfigProp: true,
    render: () => null,
    showLabel: false,
    skipFieldDecorator: true,
    writeOnly: true,
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
    render: passRenderOnlyValue(formatMoney),
  },
  number: {
    editComponent: Antd.Input,
    editProps: { type: 'number' },
    nullify: true,
    render: formatCommaSeparatedNumber,
  },
  objectSearch: {
    editComponent: ObjectSearch,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(getNameOrDefault),
    renderOption: passRenderOnlyValue(getNameOrDefault),
    renderSelected: passRenderOnlyValue(getNameOrDefault),
  },
  objectSearchCreate: {
    editComponent: ObjectSearchCreate,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(getNameOrDefault),
    renderOption: passRenderOnlyValue(getNameOrDefault),
    renderSelected: passRenderOnlyValue(getNameOrDefault),
    skipFieldDecorator: true,
  },
  optionSelect: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValueAndFieldConfig(formatOptionSelect),
  },
  password: {
    editComponent: Antd.Input.Password,
    render: (value) => value ? '********' : EMPTY_FIELD,
  },
  percentage: {
    editProps: {
      addonAfter: '%',
      type: 'number',
    },
    formValidationRules: {
      percentage: {
        max: 100,
        message: 'Percentage must be an integer between 0 and 100',
        min: 0,
        transform: (value?: string) => value ? Math.floor(Number(value)) : undefined,
        type: 'integer',
      },
    },
    fromForm: (value: any) => value && getPercentValue(value),
    render: passRenderOnlyValue(formatPercentage),
    toForm: passToFormOnlyValue(getPercentDisplay),
  },
  phone: {
    editComponent: Antd.Input,
    render: passRenderOnlyValue(formatPhoneNumber),
  },
  radio: {
    editComponent: RadioGroup,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValueAndFieldConfig(formatOptionSelect),
  },
  rating: {
    editComponent: Rate,
    nullify: true,
    render: formatRating,
  },
  ssn: {
    editComponent: Antd.Input,
    formValidationRules: {
      ssn: {
        message: 'Must be a valid social security number',
        pattern: REGEXP_SSN,
      },
    },
    render: passRenderOnlyValue(formatSocialSecurityNumber),
  },
  string: {},
  text: {
    editComponent: Antd.Input.TextArea,
    editProps: {
      autosize: { minRows: 4 },
    },
    render: passRenderOnlyValue(parseAndPreserveNewlines),
  },
  url: {
    editComponent: Antd.Input,
    editProps: { type: 'url' },
    formValidationRules: {
      url: {
        message: 'Not a valid website (URLs should start with http:// or https://)',
        type: 'url',
      },
    },
    render: passRenderOnlyValue(formatWebsite),
  },
};
