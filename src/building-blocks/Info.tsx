// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import { Col } from 'antd';

import { CLASS_PREFIX } from '../consts';
import { IFieldConfigPartial } from '../interfaces';

@autoBindMethods
@observer
class Info extends Component<{ fieldConfig: IFieldConfigPartial }> {
  public render () {
    return (
      <Col {...this.props.fieldConfig.colProps} className={`${CLASS_PREFIX}-info`}>
        {this.props.children}
      </Col>
    );
  }
}

@autoBindMethods
@observer
class Label extends Component<{ className?: ClassValue }> {
  public render () {
    return (
      <div className={cx(this.props.className, `${CLASS_PREFIX}-info-label`)}>
        {this.props.children}
      </div>
    );
  }
}

@autoBindMethods
@observer
class Value extends Component<{ className?: ClassValue }> {
  public render () {
    return (
      <div className={cx(this.props.className, `${CLASS_PREFIX}-info-value`)}>
        {this.props.children}
      </div>
    );
  }
}

export default Info;

export {
  Label,
  Value,
};
