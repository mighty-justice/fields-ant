import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { kebabCase, result } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { ICardConfig, IFieldConfig } from './interfaces';
import { fillInFieldSets, getFieldSetFields } from './common';
import { computed } from 'mobx';

export type ISummaryCardColumns = 3 | 4 | 6;

interface IProps {
  cardConfig: ICardConfig;
  className: any;
  column: ISummaryCardColumns;
  isLoading?: boolean;
  model: any;
  renderTopRight?: () => any;
}

@autoBindMethods
@observer
class SummaryCard extends Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    column: 4,
  };

  @computed
  public get fieldSets () {
    return fillInFieldSets(this.props.cardConfig.fieldSets);
  }

  private renderItem (fieldConfig: IFieldConfig) {
    const { model } = this.props;

    const value = fieldConfig.value || result(model, fieldConfig.field)
      , className = `summary-${kebabCase(fieldConfig.field)}`;

    return (
      <Antd.List.Item key={fieldConfig.field} className={className} extra={null}>
        <h4>{fieldConfig.label}</h4>
        <p>{fieldConfig.render(value, fieldConfig)}</p>
      </Antd.List.Item>
    );
  }

  public render () {
    const { cardConfig, column, isLoading, renderTopRight, className } = this.props;

    return (
      <Antd.Card
        className={cx('summary-card', className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={cardConfig.title}
      >
        {this.fieldSets.map((fieldSet, idx) => (
          <Antd.List
            className='list-summary'
            dataSource={getFieldSetFields(fieldSet)}
            grid={{ gutter: 24, column }}
            key={idx}
            renderItem={this.renderItem}
          />
        ))}
      </Antd.Card>
    );
  }
}

export default SummaryCard;
