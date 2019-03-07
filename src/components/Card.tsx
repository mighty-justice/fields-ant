import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import { fillInFieldSets } from '../utilities/common';
import CardFieldSet from '../building-blocks/CardFieldSet';
import { ISharedComponentProps } from '../props';

export interface ICardProps extends ISharedComponentProps {
  renderTopRight?: () => any;
}

@autoBindMethods
@observer
class Card extends Component<ICardProps> {
  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render () {
    const { title, renderTopRight, isLoading, model } = this.props;

    return (
      <Antd.Card title={title} extra={renderTopRight && renderTopRight()} loading={isLoading}>
        {this.fieldSets.map((fieldSet, idx) => (
          <CardFieldSet
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
