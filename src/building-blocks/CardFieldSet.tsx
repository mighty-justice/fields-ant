import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { fillInFieldSet, filterFieldConfigs, getFieldSetFields } from '../utilities';

import CardField from '../building-blocks/CardField';
import { IFieldSetPartial, IFormatProps } from '../interfaces';
import { IModel } from '../props';

import FieldSet from './FieldSet';

export interface ICardFieldSetProps extends IFormatProps {
  fieldSet: IFieldSetPartial;
  model?: IModel;
}

@autoBindMethods
@observer
class CardFieldSet extends Component<ICardFieldSetProps> {
  @computed
  private get fieldSet() {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render() {
    const { model, fieldSet, ...passDownProps } = this.props,
      fieldConfigs = getFieldSetFields(this.fieldSet),
      filteredFieldConfigs = filterFieldConfigs(fieldConfigs, { model, writeOnly: true });

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
      <FieldSet fieldSet={fieldSet} {...passDownProps}>
        {filteredFieldConfigs.map(fieldConfig => (
          <CardField {...passDownProps} fieldConfig={fieldConfig} key={fieldConfig.field} model={model} />
        ))}
      </FieldSet>
    );
  }
}

export default CardFieldSet;
