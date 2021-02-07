import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { fillInFieldSets, filterFieldSets } from '../utilities';
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
  private get fieldSets() {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render() {
    const { className, title, renderTopRight, isLoading, model } = this.props,
      filteredFieldSets = filterFieldSets(this.fieldSets, { model, writeOnly: true });

    return (
      <Antd.Card
        className={cx(CLASS_NAME, className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={title}
      >
        {filteredFieldSets.map((fieldSet, idx) => (
          <CardFieldSet fieldSet={fieldSet} key={idx} model={model} />
        ))}

        {this.props.children}
      </Antd.Card>
    );
  }
}

export default Card;
