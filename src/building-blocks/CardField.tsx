import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { fillInFieldConfig, filterFieldConfig, renderLabel, renderValue } from '../utilities';
import { IFieldConfigPartial, IFormatProps } from '../interfaces';
import { IModel } from '../props';

import Info, { Label, Value } from './Info';

export interface ICardFieldProps extends IFormatProps {
  fieldConfig: IFieldConfigPartial;
  model?: IModel;
}

@autoBindMethods
@observer
class CardField extends Component<ICardFieldProps> {
  @computed
  private get fieldConfig() {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  public render() {
    const { colon, layout, model } = this.props,
      fieldConfig = this.fieldConfig,
      format = {layout, colon};

    if (filterFieldConfig(fieldConfig, { model, writeOnly: true })) {
      return null;
    }

    return (
      <Info fieldConfig={fieldConfig}>
        {fieldConfig.showLabel && <Label format={format}>{renderLabel(fieldConfig)}</Label>}
        <Value format={format} >{renderValue(fieldConfig, model)}</Value>
      </Info>
    );
  }
}

export default CardField;
