// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import * as Antd from 'antd';

import { CLASS_PREFIX } from '../consts';
import { IFieldConfigPartial, IFormatProps } from '../interfaces';

@autoBindMethods
@observer
class Info extends Component<{ fieldConfig: IFieldConfigPartial; format?: IFormatProps }> {
  public render() {
    const { format } = this.props,
      layout = format && format.layout,
      rowClassName = layout !== 'inline' ? '' : `${CLASS_PREFIX}-info-item-inline`;

    return (
      <Antd.Col {...this.props.fieldConfig.colProps} className={`${CLASS_PREFIX}-info`}>
        <Antd.Row className={rowClassName}>{this.props.children}</Antd.Row>
      </Antd.Col>
    );
  }
}

@autoBindMethods
@observer
class Label extends Component<{ className?: ClassValue; format?: IFormatProps }> {
  public render() {
    const { className, format } = this.props,
      colon = format && format.colon,
      colonClassName = colon === false ? `${CLASS_PREFIX}-info-label-no-colon` : `${CLASS_PREFIX}-info-label`,
      labelClassName = cx(className, colonClassName);

    return (
      <div className={labelClassName}>
        <label>{this.props.children}</label>
      </div>
    );
  }
}

@autoBindMethods
@observer
class Value extends Component<{ className?: ClassValue }> {
  public render() {
    return <div className={cx(this.props.className, `${CLASS_PREFIX}-info-value`)}>{this.props.children}</div>;
  }
}

export default Info;

export { Label, Value };
