// tslint:disable max-classes-per-file
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import { Col, Row } from 'antd';

import { CLASS_PREFIX } from '../consts';
import { IFieldConfigPartial, IFormatProps } from '../interfaces';
import { formatClassNames } from '../utilities';

@autoBindMethods
@observer
class Info extends Component<{ fieldConfig: IFieldConfigPartial; format?: IFormatProps }> {
  public render() {
    const { fieldConfig, format } = this.props,
      layout = format?.layout,
      customClassName = fieldConfig.className,
      rowClassName = cx(customClassName, `${CLASS_PREFIX}-info-row-${layout}`);

    return (
      <Col {...this.props.fieldConfig.colProps} className={`${CLASS_PREFIX}-info`}>
        <Row className={rowClassName}>{this.props.children}</Row>
      </Col>
    );
  }
}

@autoBindMethods
@observer
class Label extends Component<{ className?: ClassValue; format?: IFormatProps }> {
  public render() {
    const { className, format } = this.props,
      colon = format?.colon,
      layout = format?.layout,
      infoLabelClassName = `${CLASS_PREFIX}-info-label`,
      labelClassName = cx(className, infoLabelClassName, formatClassNames(infoLabelClassName, colon, layout));

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
