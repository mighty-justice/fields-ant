import React, { Component } from 'react';

import { EMPTY_FIELD } from '@mighty-justice/utils';

import * as Antd from 'antd';

import {
  IAntFormField,
  IInjected,
  IInputProps,
} from '../interfaces';

export function formatRating (value: string) {
  return value ? <Antd.Rate disabled defaultValue={+value} /> : EMPTY_FIELD;
}

class Rate extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  public render () {
    return (
      <Antd.Rate {...this.props} value={Number(this.injected.value)} />
    );
  }
}

export default Rate;
