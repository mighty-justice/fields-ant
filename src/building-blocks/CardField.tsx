import React, { Component } from 'react';
import { get } from 'lodash';

import { fillInFieldConfig, filterInsertIf } from '../utilities/common';
import { IFieldConfig } from '../interfaces';
import { IModel } from '../props';

import Info, { Label, Value } from './Info';

export interface ICardFieldProps {
  fieldConfig: IFieldConfig;
  model?: IModel;
}

class CardField extends Component<ICardFieldProps> {
  public render () {
    const { model } = this.props
      , fieldConfig = fillInFieldConfig(this.props.fieldConfig)
      , { field, render, label, showLabel, writeOnly } = fieldConfig
      , value = render(fieldConfig.value || get(model, field), fieldConfig);

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
