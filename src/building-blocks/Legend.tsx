import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { isPartialFieldSetSimple } from '../utilities';

import WithTooltip from './WithTooltip';
import { IFieldSetPartial } from '../interfaces';

interface IProps {
  fieldSet: IFieldSetPartial;
}

@autoBindMethods
@observer
class Legend extends Component<IProps> {
  public render () {
    const { fieldSet } = this.props;

    if (isPartialFieldSetSimple(fieldSet)) { return null; }
    const { legend, tooltip } = fieldSet;

    if (!legend) { return null; }

    return <WithTooltip tooltip={tooltip}>{legend}</WithTooltip>;
  }
}

export default Legend;
