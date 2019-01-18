import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import { ICardConfig, IFieldSetPartial } from '../interfaces';
import { fillInFieldSet, filterInsertIf, getCardModel, getFieldSetFields, isFieldSetSimple } from '../utilities/common';
import CardRow from '../building-blocks/CardRow';

interface IProps {
  cardConfig: ICardConfig;
  fieldSet: IFieldSetPartial;
  idx?: number;
  model: any;
}

@observer
class CardFieldSet extends Component<IProps> {
  @computed
  private get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const { cardConfig } = this.props
      , idx = this.props.idx || 0
      , model = getCardModel(this.props.model, cardConfig)
      , legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = fieldConfigs.filter(fieldConfig => !filterInsertIf(fieldConfig, model))
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
        <Fragment key={idx}>
          {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}
          {legend && <h3>{legend}</h3>}

          {getFieldSetFields(this.fieldSet).map(fieldConfig => (
            <CardRow
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
