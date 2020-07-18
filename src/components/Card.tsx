import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Card as AntCard } from 'antd';

import { filterFieldSets } from '../utilities/filters';
import { fillInFieldSets } from '../utilities/fillIn';
import CardFieldSet from '../building-blocks/CardFieldSet';
import { ISharedComponentProps } from '../props';
import { CLASS_PREFIX } from '../consts';

export interface ICardProps extends ISharedComponentProps {
  renderTopRight?: () => any;
}

const CLASS_NAME = `${CLASS_PREFIX}-card`;

@autoBindMethods
@observer
class Card extends Component<ICardProps> {
  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render () {
    const { className, title, renderTopRight, isLoading, model } = this.props
      , filteredFieldSets = filterFieldSets(this.fieldSets, { model, writeOnly: true });

    return (
      <AntCard
        className={cx(CLASS_NAME, className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={title}
      >
        {filteredFieldSets.map((fieldSet, idx) => (
          <CardFieldSet
            fieldSet={fieldSet}
            key={idx}
            model={model}
          />
        ))}

        {this.props.children}
      </AntCard>
    );
  }
}

export default Card;
