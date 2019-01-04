import React, { Component } from 'react';
import { get } from 'lodash';

import Info, { Label, Value } from './Info';
import { IFieldConfig } from './interfaces';

import { fillInFieldConfig } from './common';

interface IProps {
  fieldConfig: IFieldConfig;
  model: { [key: string]: any };
}

class CardRow extends Component<IProps> {
  public render () {
    const { model } = this.props
      , fieldConfig = fillInFieldConfig(this.props.fieldConfig)
      , { field, render, label, showLabel, writeOnly } = fieldConfig;

    if (!render) {
      // istanbul ignore next
      return;
    }

    const value = render(fieldConfig.value || get(model, field), fieldConfig);

    if (writeOnly) {
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

export default CardRow;
