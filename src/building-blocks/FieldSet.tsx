import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx, { Argument as ClassValue } from 'classnames';

import { Row } from 'antd';

import { IFieldSetPartial, ILayout } from '../interfaces';
import { isPartialFieldSetSimple } from '../utilities';
import { CLASS_PREFIX } from '../consts';

import Legend from './Legend';
import { sharedComponentPropsDefaults } from '../propsDefaults';

interface IProps {
  className?: ClassValue;
  fieldSet: IFieldSetPartial;
  layout?: ILayout;
}

const CLASS_NAME = `${CLASS_PREFIX}-field-set`;

@autoBindMethods
@observer
export default class FieldSet extends Component<IProps> {
  public static defaultProps = { ...sharedComponentPropsDefaults };

  public render() {
    const { className, fieldSet, layout } = this.props,
      rowProps = !isPartialFieldSetSimple(fieldSet) && fieldSet.rowProps;

    return (
      <div className={cx(CLASS_NAME, className)}>
        <Row {...rowProps} className={`${CLASS_NAME}-row-${layout}`}>
          <Legend fieldSet={fieldSet} />

          {this.props.children}
        </Row>
      </div>
    );
  }
}
