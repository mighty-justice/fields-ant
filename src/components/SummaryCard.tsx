import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { kebabCase } from 'lodash';
import cx from 'classnames';

import * as Antd from 'antd';

import { fillInFieldSets, getFieldSetFields, renderValue } from '../utilities';
import { IFieldConfig } from '../interfaces';
import { CLASS_PREFIX } from '../consts';

import { ICardProps } from './Card';

export interface ISummaryCardProps extends ICardProps {
  column: 3 | 4 | 6;
}

const CLASS_NAME = `${CLASS_PREFIX}-summary-card`;

@autoBindMethods
@observer
class SummaryCard extends Component<ISummaryCardProps> {
  public static defaultProps: Partial<ISummaryCardProps> = {
    column: 4,
  };

  @computed
  private get fieldSets() {
    return fillInFieldSets(this.props.fieldSets);
  }

  private renderItem(fieldConfig: IFieldConfig) {
    const { model } = this.props,
      className = `summary-${kebabCase(fieldConfig.field)}`;

    return (
      <Antd.List.Item key={fieldConfig.field} className={className} extra={null}>
        <h4>{fieldConfig.label}</h4>
        <p>{renderValue(fieldConfig, model)}</p>
      </Antd.List.Item>
    );
  }

  public render() {
    const { title, column, isLoading, renderTopRight, className } = this.props;

    return (
      <Antd.Card
        className={cx(CLASS_NAME, className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={title}
      >
        {this.fieldSets.map((fieldSet, idx) => (
          <Antd.List
            className="list-summary"
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
