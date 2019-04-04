import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

type IField = 'years' | 'date' | 'months';

interface IValueObject {
  years: string;
  date: string;
  months: string;
}

interface IInputConfig {
  placeholder: string;
  padStart: number;
  style: { width: string, marginRight?: string };
}

const inputConfig: {
  date: IInputConfig,
  months: IInputConfig,
  years: IInputConfig,
} = {
  date: {
    padStart: 2,
    placeholder: 'Day',
    style: { width: '23%', marginRight: '3%' },
  },
  months: {
    padStart: 2,
    placeholder: 'Month',
    style: { width: '23%', marginRight: '3%' },
  },
  years: {
    padStart: 0,
    placeholder: 'Year',
    style: { width: '48%' },
  },
};

@autoBindMethods
@observer
class Birthdate extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private get valueObject (): IValueObject {
    const { value } = this.injected
      , [years, months, date] = value.split('-');

    return { years, months, date };
  }

  private getValueField (field: IField) {
    return this.valueObject[field] || '';
  }

  private onChange (field: IField, inputValue: string) {
    const valueObject = {
        ...this.valueObject,
        [field]: inputValue && inputValue.padStart(inputConfig[field].padStart, '0'),
      }
      , { years, date, months } = valueObject;

    const value = [years, months, date].join('-');
    this.injected.onChange(value);
  }

  private renderFieldInput (field: IField) {
    const { style, placeholder } = inputConfig[field]
      , defaultValue = this.getValueField(field)
      , onChange = (event: any) => this.onChange(field, event.target.value)
      ;

    return (
      <span style={{ display: 'inline-block', ...style }}>
        <Antd.Input
          defaultValue={defaultValue}
          id={field}
          onChange={onChange}
          placeholder={placeholder}
        />
      </span>
    );
  }

  public render () {
    return (
      <Antd.Input.Group compact>
        {this.renderFieldInput('months')}
        {this.renderFieldInput('date')}
        {this.renderFieldInput('years')}
      </Antd.Input.Group>
    );
  }
}

export default Birthdate;
