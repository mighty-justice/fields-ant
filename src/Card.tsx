import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import { ICardConfig } from './interfaces';
import { fillInFieldSets, getCardModel, getFieldSetFields } from './common';
import CardRow from './CardRow';

interface IProps {
  cardConfig: ICardConfig;
  children?: any;
  isLoading?: boolean;
  model: any;
  renderTopRight?: () => any;
}

@observer
class Card extends Component<IProps> {
  @computed
  public get fieldSets () {
    return fillInFieldSets(this.props.cardConfig.fieldSets);
  }

  public render () {
    const { cardConfig, renderTopRight, isLoading } = this.props
      , model = getCardModel(this.props.model, cardConfig);

    return (
      <Antd.Card title={cardConfig.title} extra={renderTopRight && renderTopRight()} loading={isLoading}>
        {this.fieldSets.map((fieldSet, idx) => (
          <Fragment key={idx}>
            {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}

            {getFieldSetFields(fieldSet).map(fieldConfig => (
              <CardRow
                fieldConfig={fieldConfig}
                key={fieldConfig.field}
                model={model}
              />
            ))}
          </Fragment>
        ))}

        {this.props.children}
      </Antd.Card>
    );
  }
}

export default Card;
