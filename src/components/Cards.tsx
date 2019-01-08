import React, { Component } from 'react';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import ArrayCard from './ArrayCard';
import Card from './Card';
import { ICardConfig } from '../interfaces';

interface IProps {
  cardConfigs: ICardConfig[];
  isLoading: boolean;
  model: {[key: string]: any};
}

@observer
class Cards extends Component<IProps> {
  public render () {
    const { model, isLoading, cardConfigs } = this.props;

    return cardConfigs.map((cardConfig, idx) => {
      if (cardConfig.isArray) {
        return (
          <Antd.Row key={`detail-cards-${idx}`}>
            <ArrayCard cardConfig={cardConfig} model={model} isLoading={isLoading} />
          </Antd.Row>
        );
      }

      return (
        <Antd.Row key={`detail-cards-${idx}`}>
          <Card cardConfig={cardConfig} model={model} isLoading={isLoading} />
        </Antd.Row>
      );
    });
  }
}

export default Cards;
