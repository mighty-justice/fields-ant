import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import * as Antd from 'antd';

import Card from './Card';
import { ICardConfig } from '../interfaces';

interface IProps {
  cardConfig: ICardConfig;
  children?: any;
  extra?: any;
  isLoading?: boolean;
  model: any;
}

@observer
class ArrayCard extends Component<IProps> {
  public render () {
    const { cardConfig, extra, isLoading, model } = this.props;

    if (isEmpty(model)) { return null; }

    return (
      <Antd.Card title={cardConfig.title} extra={extra} loading={isLoading}>
        {model.map((modelItem: any) => (
          <Card key={modelItem.id} cardConfig={{ ...cardConfig, title: '' }} model={modelItem} />
        ))}
      </Antd.Card>
    );
  }
}

export default ArrayCard;
