import React, { Component } from 'react';
import { computed } from 'mobx';

import { fillInFieldConfig, filterFieldConfig, renderLabel, renderValue } from '../utilities';
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
      , { field, showLabel, writeOnly } = fieldConfig
      , renderWithoutStructure = !showLabel
      ;

    if (writeOnly || filterFieldConfig(fieldConfig, { model })) {
      return null;
    }

    return (
      <Info key={field}>
        {renderWithoutStructure
          ? renderValue(fieldConfig, model)
          : (
            <>
              <Label>{renderLabel(fieldConfig)}</Label>
              <Value>{renderValue(fieldConfig, model)}</Value>
            </>
          )}
      </Info>
    );
  }
}

export default CardField;
