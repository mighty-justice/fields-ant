import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import moment from 'moment';

import * as Antd from 'antd';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';
import { varToLabel } from '@mighty-justice/utils';

type IField = 'year' | 'day' | 'month';

interface IValueObject {
  year: string;
  day: string;
  month: string;
}

interface IInputConfig {
  padStart: number;
  style: { width: string, marginRight?: string };
}

export function isValidDate (value: string) {
  return !!value && value.length === '####-##-##'.length && moment(value).isValid();
}

const inputConfig: {
  day: IInputConfig,
  month: IInputConfig,
  year: IInputConfig,
} = {
  day: {
    padStart: 2,
    style: { width: '23%', marginRight: '3%' },
  },
  month: {
    padStart: 2,
    style: { width: '23%', marginRight: '3%' },
  },
  year: {
    padStart: 0,
    style: { width: '48%' },
  },
};

@autoBindMethods
@observer
class Birthday extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
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
    const valueObject = {
        ...this.valueObject,
        [field]: inputValue && inputValue.padStart(inputConfig[field].padStart, '0'),
      }
      , { year, day, month } = valueObject;

    const value = [year, month, day].join('-');
    this.injected.onChange(value);
  }

  private renderFieldInput (field: IField) {
    const { style } = inputConfig[field]
      , placeholder = varToLabel(field)
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
        {this.renderFieldInput('month')}
        {this.renderFieldInput('day')}
        {this.renderFieldInput('year')}
      </Antd.Input.Group>
    );
  }
}

export default Birthday;
