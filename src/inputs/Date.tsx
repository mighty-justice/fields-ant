import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { Input } from 'antd';

import { inferCentury } from '@mighty-justice/utils';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

type IField = 'year' | 'day' | 'month';

interface IValueObject {
  day: string;
  month: string;
  year: string;
}

interface IInputConfig {
  placeholder: string;
  style: { width: string, marginRight?: string };
}

const inputConfig: {
    day: IInputConfig,
    month: IInputConfig,
    year: IInputConfig,
  } = {
    day: {
      placeholder: 'DD',
      style: { width: '29%', marginRight: '3%' },
    },
    month: {
      placeholder: 'MM',
      style: { width: '29%', marginRight: '3%' },
    },
    year: {
      placeholder: 'YYYY',
      style: { width: '36%' },
    },
  }
  , INPUT_ORDER: IField[] = ['month', 'day', 'year']
  ;

@autoBindMethods
@observer
class Date extends Component<IInputProps> {
  private inputRefs: { [key: string]: any } = {};

  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private get inputProps () {
    return omit(this.props, ['id', 'onChange', 'value']);
  }

  private getRefSetter (field: IField) {
    return (ref: any) => this.inputRefs[field] = ref;
  }

  private get valueObject (): IValueObject {
    const { value } = this.injected
      , [year, month, day] = value.split('-');

    return { year, month, day };
  }

  private getValueField (field: IField) {
    return this.valueObject[field] || '';
  }

  private onChange (field: IField, inputValue: string) {
    const regexNumbers = /[^0-9]+/
      , trimmedValue = inputValue.trim()
      , cleanedValue = regexNumbers.test(trimmedValue) ? 'invalid' : trimmedValue
      , filledInValue = (field === 'year')
        ? inferCentury(cleanedValue)
        : cleanedValue ? cleanedValue.padStart(2, '0') : ''
      , valueObject = { ...this.valueObject, [field]: filledInValue }
      , { year, day, month } = valueObject
      , value = (year || month || day) ? [year, month, day].join('-') : ''
      ;

    this.injected.onChange(value);

    // Auto-increment to next input if input length 2 and in one of the first 2 boxes
    const inputNum = INPUT_ORDER.findIndex((s) => s === field);
    if (inputNum < 2 && cleanedValue.length === 2) {
      const goTo = INPUT_ORDER[inputNum + 1]
        , ref = this.inputRefs[goTo];
      ref.focus();
    }
  }

  private renderFieldInput (field: IField) {
    const { id } = this.injected
      , { style, placeholder } = inputConfig[field]
      , defaultValue = this.getValueField(field)
      , onChange = (event: any) => this.onChange(field, event.target.value)
      , key = [id, field].join('.')
      ;

    return (
      <span key={key} style={{ display: 'inline-block', ...style }}>
        <Input
          defaultValue={defaultValue}
          id={key}
          onChange={onChange}
          placeholder={placeholder}
          ref={this.getRefSetter(field)}
          {...this.inputProps}
        />
      </span>
    );
  }

  public render () {
    return (
      <Input.Group compact>
        {INPUT_ORDER.map(this.renderFieldInput)}
      </Input.Group>
    );
  }
}

export default Date;
