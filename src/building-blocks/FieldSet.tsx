import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import * as Antd from 'antd';

import { IFieldSetPartial } from '../interfaces';
import { isPartialFieldSetSimple } from '../utilities';
import { CLASS_PREFIX } from '../consts';

import Legend from './Legend';

interface IProps {
  className?: ClassValue;
  fieldSet: IFieldSetPartial;
}

const CLASS_NAME = `${CLASS_PREFIX}-field-set`;

@autoBindMethods
@observer
export default class FieldSet extends Component<IProps> {
  public render () {
    const { className, fieldSet } = this.props
      , rowProps = !isPartialFieldSetSimple(fieldSet) && fieldSet.rowProps
      ;

    return (
      <div className={cx(CLASS_NAME, className)}>
        <Antd.Row {...rowProps}>
          <Legend fieldSet={fieldSet} />

          {this.props.children}
        </Antd.Row>
      </div>
    );
  }
}
