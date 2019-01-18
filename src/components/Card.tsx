import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import { ICardConfig } from '../interfaces';
import { fillInFieldSets } from '../utilities/common';
import CardFieldSet from '../building-blocks/CardFieldSet';

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
  private get fieldSets () {
    return fillInFieldSets(this.props.cardConfig.fieldSets);
  }

  public render () {
    const { cardConfig, renderTopRight, isLoading, model } = this.props;

    return (
      <Antd.Card title={cardConfig.title} extra={renderTopRight && renderTopRight()} loading={isLoading}>
        {this.fieldSets.map((fieldSet, idx) => (
          <CardFieldSet
            cardConfig={cardConfig}
            fieldSet={fieldSet}
            idx={idx}
            key={idx}
            model={model}
          />
        ))}

        {this.props.children}
      </Antd.Card>
    );
  }
}

export default Card;
