import React, { Component } from 'react';

import { isPartialFieldSetSimple } from '../utilities';

import WithTooltip from './WithTooltip';
import { IFieldSetPartial } from '../interfaces';

interface IProps {
  fieldSet: IFieldSetPartial;
}

class Legend extends Component<IProps> {
  public render () {
    const { fieldSet } = this.props;

    if (isPartialFieldSetSimple(fieldSet)) { return null; }
    const { legend, tooltip } = fieldSet;

    if (!legend) { return null; }

    return (
      <h3>
        <WithTooltip tooltip={tooltip}>{legend}</WithTooltip>
      </h3>
    );
  }
}

export default Legend;
