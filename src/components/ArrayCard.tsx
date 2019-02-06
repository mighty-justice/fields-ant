import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isEmpty } from 'lodash';

import * as Antd from 'antd';

import Card from './Card';
import { ICommonCardProps } from '../interfaces';

interface IProps extends ICommonCardProps {
  children?: any;
  extra?: any;
  isLoading?: boolean;
  model: any;
}

@observer
class ArrayCard extends Component<IProps> {
  public render () {
    const { title, extra, isLoading, model, fieldSets, classNameSuffix } = this.props;
    if (isEmpty(model)) { return null; }

    return (
      <Antd.Card title={title} extra={extra} loading={isLoading}>
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
