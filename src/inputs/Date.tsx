import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import { inferCentury } from '@mighty-justice/utils';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

type IField = 'year' | 'day' | 'month';

interface IValueObject {
  year: string;
  day: string;
  month: string;
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
        [field]: (field === 'year') ? inferCentury(inputValue) : inputValue.padStart(2, '0'),
      }
      , { year, day, month } = valueObject;

    const value = [year, month, day].join('-');
    this.injected.onChange(value);
  }

  private renderFieldInput (field: IField) {
    const { id } = this.injected
      , { style, placeholder } = inputConfig[field]
      , defaultValue = this.getValueField(field)
      , onChange = (event: any) => this.onChange(field, event.target.value)
      ;

    return (
      <span style={{ display: 'inline-block', ...style }}>
        <Antd.Input
          defaultValue={defaultValue}
          id={[id, field].join('.')}
          onChange={onChange}
          placeholder={placeholder}
        />
      </span>
    );
  }

  public render () {
    return (
      <Antd.Input.Group compact>
        {INPUT_ORDER.map(this.renderFieldInput)}
      </Antd.Input.Group>
    );
  }
}

export default Date;
