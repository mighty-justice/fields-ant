import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { EMPTY_FIELD } from '@mighty-justice/utils';

import { Rate as AntRate } from 'antd';

import { IAntFormField, IInjected, IFormFieldProps } from '../interfaces';

export function formatRating(value: string) {
  return value ? <AntRate disabled defaultValue={+value} /> : EMPTY_FIELD;
}

@autoBindMethods
@observer
class Rate extends Component<IFormFieldProps> {
  private get injected() {
    return this.props as IInjected & IFormFieldProps & IAntFormField;
  }

  public render() {
    return <AntRate {...this.props} value={Number(this.injected.value)} />;
  }
}

export default Rate;
