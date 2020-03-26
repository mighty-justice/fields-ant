// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { CLASS_PREFIX } from '../consts';

const CARD_COL_LABEL = 8;
const CARD_COL_VALUE = 16;

@autoBindMethods
@observer
class Info extends Component<any> {
  public render () {
    return (
      <Antd.Row
        {...this.props}
        className={cx(this.props.className, `${CLASS_PREFIX}-info`)}
      >
        {this.props.children}
      </Antd.Row>
    );
  }
}

@autoBindMethods
@observer
class Label extends Component<any> {
  public render () {
    return (
      <Antd.Col
        className={cx(this.props.className, `${CLASS_PREFIX}-col-label`)}
        span={CARD_COL_LABEL}
      >
        {this.props.children}
      </Antd.Col>
    );
  }
}

@autoBindMethods
@observer
class Value extends Component<any> {
  public render () {
    return (
      <Antd.Col
        className={cx(this.props.className, `${CLASS_PREFIX}-col-value`)}
        span={CARD_COL_VALUE}
      >
        {this.props.children}
      </Antd.Col>
    );
  }
}

export default Info;

export {
  CARD_COL_LABEL,
  CARD_COL_VALUE,
  Label,
  Value,
};
