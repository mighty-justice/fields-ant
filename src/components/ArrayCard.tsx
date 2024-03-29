import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { Card as AntCard } from 'antd';

import { IModel } from '../props';

import Card, { ICardProps } from './Card';
import { isEmpty } from 'lodash';

export interface IArrayCardProps extends ICardProps {
  model: IModel[];
}

@autoBindMethods
@observer
class ArrayCard extends Component<IArrayCardProps> {
  public render() {
    const { title, renderTopRight, isLoading, model, fieldSets, classNameSuffix, ...passDownProps } = this.props;

    return (
      <AntCard title={title} extra={renderTopRight && renderTopRight()} loading={isLoading}>
        {isEmpty(model) && <p className="empty-message">No records</p>}

        {model.map((modelItem: any) => (
          <Card
            {...passDownProps}
            classNameSuffix={classNameSuffix}
            fieldSets={fieldSets}
            key={modelItem.id}
            model={modelItem}
            title=""
          />
        ))}
      </AntCard>
    );
  }
}

export default ArrayCard;
