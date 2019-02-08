import React, { Component } from 'react';

import { EMPTY_FIELD } from '@mighty-justice/utils';

import * as Antd from 'antd';

export function formatRating (value: string) {
  return value ? <Antd.Rate disabled defaultValue={+value} /> : EMPTY_FIELD;
}

class Rate extends Component<any> {
  public render () {
    return (
      <Antd.Rate {...this.props} value={Number(this.props.value)} />
    );
  }
}

export default Rate;
