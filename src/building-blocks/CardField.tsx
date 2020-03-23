import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import * as Antd from 'antd';

import { fillInFieldConfig, filterFieldConfig, renderLabel, renderValue } from '../utilities';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';

export interface ICardFieldProps {
  fieldConfig: IFieldConfigPartial;
  model?: IModel;
}

@autoBindMethods
@observer
class CardField extends Component<ICardFieldProps> {
  @computed
  private get fieldConfig () {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  public render () {
    const { model } = this.props
      , fieldConfig = this.fieldConfig
      , { field, showLabel } = fieldConfig
      ;

    if (filterFieldConfig(fieldConfig, { model, writeOnly: true })) {
      return null;
    }

    return (
      <Antd.Descriptions.Item
        label={showLabel && renderLabel(fieldConfig)}
        key={field}
      >
        {renderValue(fieldConfig, model)}
      </Antd.Descriptions.Item>
    );
  }
}

export default CardField;
