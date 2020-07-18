import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { fillInFieldConfig } from '../utilities/fillIn';
import { renderLabel, renderValue } from '../utilities/common';
import { filterFieldConfig } from '../utilities/filters';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';

import Info, { Label, Value } from './Info';

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
      , fieldConfig = this.fieldConfig;

    if (filterFieldConfig(fieldConfig, { model, writeOnly: true })) {
      return null;
    }

    return (
      <Info fieldConfig={fieldConfig}>
        {fieldConfig.showLabel && <Label>{renderLabel(fieldConfig)}</Label>}
        <Value>{renderValue(fieldConfig, model)}</Value>
      </Info>
    );
  }
}

export default CardField;
