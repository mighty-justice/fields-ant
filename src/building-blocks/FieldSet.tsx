import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { IFieldSetPartial } from '../interfaces';
import { IClassName } from '../props';
import { isPartialFieldSetSimple } from '../utilities';

import Legend from './Legend';

interface IProps {
  fieldSet: IFieldSetPartial;
  className?: IClassName;
}

@autoBindMethods
@observer
export default class FieldSet extends Component<IProps> {
  public render () {
    const { className, fieldSet } = this.props
      , rowProps = !isPartialFieldSetSimple(fieldSet) && fieldSet.rowProps
      ;

    return (
      <Antd.Row {...rowProps} className={cx(className)}>
        <Legend fieldSet={fieldSet} />

        {this.props.children}
      </Antd.Row>
    );
  }
}
