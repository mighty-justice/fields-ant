import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { Col } from 'antd';

import { isPartialFieldSetSimple } from '../utilities';

import WithTooltip from './WithTooltip';
import { ANT_FULL_COL_WIDTH } from '../consts';
import { IFieldSetPartial } from '../interfaces';

interface IProps {
  fieldSet: IFieldSetPartial;
}

@autoBindMethods
@observer
class Legend extends Component<IProps> {
  public render() {
    const { fieldSet } = this.props;

    if (isPartialFieldSetSimple(fieldSet)) {
      return null;
    }
    const { legend, tooltip } = fieldSet;

    if (!legend) {
      return null;
    }

    return (
      <Col span={ANT_FULL_COL_WIDTH}>
        <h3>
          <WithTooltip tooltip={tooltip}>{legend}</WithTooltip>
        </h3>
      </Col>
    );
  }
}

export default Legend;
