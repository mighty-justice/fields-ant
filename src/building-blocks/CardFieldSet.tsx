import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  filterInsertIf,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities/common';

import CardField from '../building-blocks/CardField';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';
import { renderWithTooltip } from '../utilities/renderWithTooltip';

export interface ICardFieldSetProps {
  fieldSet: IFieldSetPartial;
  idx?: number;
  model?: IModel;
}

@observer
class CardFieldSet extends Component<ICardFieldSetProps> {
  @computed
  private get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  private renderLegend () {
    const fieldSet = this.fieldSet;

    if (isFieldSetSimple(fieldSet)) { return null; }
    const { legend, tooltip } = fieldSet;

    if (!legend) { return null; }

    return (
      <h3>
        {tooltip
          ? renderWithTooltip(legend, tooltip)
          : legend
        }
      </h3>
    );
  }

  public render () {
    const { model } = this.props
      , idx = this.props.idx || 0
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = fieldConfigs.filter(fieldConfig => !filterInsertIf(fieldConfig, model))
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
        <Fragment key={idx}>
          {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}

          {this.renderLegend()}

          {filteredFieldConfigs.map(fieldConfig => (
            <CardField
              fieldConfig={fieldConfig}
              key={fieldConfig.field}
              model={model}
            />
          ))}
        </Fragment>
    );
  }
}

export default CardFieldSet;
