import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { kebabCase, result } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { ICommonCardProps, IFieldConfig } from '../interfaces';
import { fillInFieldSets, getFieldSetFields } from '../utilities/common';
import { computed } from 'mobx';

interface IProps extends ICommonCardProps {
  className: any;
  column: 3 | 4 | 6;
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
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
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
    const { title, column, isLoading, renderTopRight, className } = this.props;

    return (
      <Antd.Card
        className={cx('summary-card', className)}
        extra={renderTopRight && renderTopRight()}
        loading={isLoading}
        title={title}
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
