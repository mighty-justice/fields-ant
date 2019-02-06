import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import * as Antd from 'antd';

import { IModel } from '../props';

import Card, { ICardProps } from './Card';

export interface IArrayCardProps extends ICardProps {
    model: IModel[];
}

@observer
class ArrayCard extends Component<IArrayCardProps> {
  public render () {
    const { title, renderTopRight, isLoading, model, fieldSets, classNameSuffix } = this.props;
    if (isEmpty(model)) { return null; }

    return (
      <Antd.Card title={title} extra={renderTopRight && renderTopRight()} loading={isLoading}>
        {model.map((modelItem: any) => (
          <Card
            classNameSuffix={classNameSuffix}
            fieldSets={fieldSets}
            key={modelItem.id}
            model={modelItem}
            title=''
          />
        ))}
      </Antd.Card>
    );
  }
}

export default ArrayCard;
