import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { IFieldSetPartial } from '../interfaces';
import { IClassName } from '../props';
import { isPartialFieldSetSimple } from '../utilities';
import { CLASS_PREFIX } from '../consts';

import Legend from './Legend';

interface IProps {
  fieldSet: IFieldSetPartial;
  className?: IClassName;
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
