import React, { Component } from 'react';
import { computed } from 'mobx';

import { fillInFieldConfig, filterInsertIf, renderValue } from '../utilities/common';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';

import Info, { Label, Value } from './Info';

export interface ICardFieldProps {
  fieldConfig: IFieldConfigPartial;
  model?: IModel;
}

class CardField extends Component<ICardFieldProps> {
  @computed
  private get fieldConfig () {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  public render () {
    const { model } = this.props
      , fieldConfig = this.fieldConfig
      , { field, label, showLabel, writeOnly } = fieldConfig
      , value = renderValue(fieldConfig, model);

    if (writeOnly || filterInsertIf(fieldConfig, model)) {
      return null;
    }

    return (
      <Info key={field}>
        {!showLabel ? value
        : (
          <>
            <Label>{label}</Label>
            <Value>{value}</Value>
          </>
        )}
      </Info>
    );
  }
}

export default CardField;
