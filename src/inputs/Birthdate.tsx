import React, { Component } from 'react';
import moment from 'moment';
import { isNumber } from 'lodash';

import * as Antd from 'antd';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

interface IInputConfig {
  max: number;
  min: number;
  placeholder: string;
  // style: { width: string };
}

const inputConfig: { [key: string]: IInputConfig } = {
  date: {
    max: 31,
    min: 1,
    placeholder: 'Day',
    // style: { width: '25%' },
  },
  months: {
    max: 12,
    min: 1,
    placeholder: 'Month',
    // style: { width: '25%' },
  },
  years: {
    max: 3000,
    min: 1000,
    placeholder: 'Year',
    // style: { width: '50%' },
  },
};

class Birthdate extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private get value () {
    return this.injected.value as moment.Moment | null;
  }

  private static isWAT (field: string, fieldValue: number) {
    // This function is for dealing with a JS WAT
    // https://www.destroyallsoftware.com/talks/wat

    // Months start with zero in JS because of Java
    // https://stackoverflow.com/a/41992352/224873
    // Months start with zero in Java because of C
    // Months start with zero in C because of array indexing
    // Arrays start with zero because of pointer math
    return field === 'months' && isNumber(fieldValue);
  }

  private getValueField (field: string) {
    const { value } = this.injected
      , fieldValue = value && value.toObject()[field]
      , numVal = Birthdate.isWAT(field, fieldValue) ? fieldValue + 1 : fieldValue
      ;

    return numVal && numVal.toString();
  }

  private onChange (field: string, inputValue: string) {
    const valueObject = !!this.value ? this.value.toObject() : {}
      , fieldValue = Number(inputValue)
      , adjustedValue = fieldValue && Birthdate.isWAT(field, fieldValue) ? fieldValue - 1 : fieldValue;

    console.log({ field, adjustedValue, valueObject });
    console.log(moment({ ...valueObject, [field]: adjustedValue }))

    this.injected.onChange(moment({
      ...valueObject,
      [field]: adjustedValue,
    }));
  }

  private getInputProps (field: string) {
    return {
      ...inputConfig[field],
      defaultValue: this.getValueField(field),
      id: field,
      onChange: (event: any) => this.onChange(field, event.target.value),
    };
  }

  public render () {
    return (
      <>
        <Antd.Input.Group compact>
          <span style={{ display: 'inline-block', width: '23%', marginRight: '3%' }}>
            <Antd.Input {...this.getInputProps('months')} />
          </span>
          <span style={{ display: 'inline-block', width: '23%', marginRight: '3%' }}>
            <Antd.Input {...this.getInputProps('date')} />
          </span>
          <span style={{ display: 'inline-block', width: '48%' }}>
            <Antd.Input {...this.getInputProps('years')} />
          </span>
        </Antd.Input.Group>
      </>
    );
  }
}

export default Birthdate;
