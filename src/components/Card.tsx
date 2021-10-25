import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { fillInFieldSets, filterFieldSets } from '../utilities';
import CardFieldSet from '../building-blocks/CardFieldSet';
import { ISharedComponentProps } from '../props';
import { cardPropsDefaults } from '../propsDefaults';
import { CLASS_PREFIX } from '../consts';

export interface ICardProps extends ISharedComponentProps {
  bordered?: boolean;
  renderTopRight?: () => any;
}

const CLASS_NAME = `${CLASS_PREFIX}-card`;

@autoBindMethods
@observer
class Card extends Component<ICardProps> {
  public static defaultProps = { ...cardPropsDefaults };

  @computed
  private get fieldSets() {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render() {
    const { bordered, className, title, renderTopRight, isLoading, model, ...passDownProps } = this.props,
      filteredFieldSets = filterFieldSets(this.fieldSets, { model, writeOnly: true });

    return (
      <Antd.Card
        bordered={bordered}
        className={cx(CLASS_NAME, className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={title}
      >
        {filteredFieldSets.map((fieldSet, idx) => (
          <CardFieldSet {...passDownProps} fieldSet={fieldSet} key={idx} model={model} />
        ))}

        {this.props.children}
      </Antd.Card>
    );
  }
}

export default Card;
