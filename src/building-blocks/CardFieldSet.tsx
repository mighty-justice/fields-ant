import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { fillInFieldSet } from '../utilities/fillIn';
import { filterFieldConfigs } from '../utilities/filters';
import { getFieldSetFields } from '../utilities/common';

import CardField from '../building-blocks/CardField';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';

import FieldSet from './FieldSet';

export interface ICardFieldSetProps {
  fieldSet: IFieldSetPartial;
  model?: IModel;
}

@autoBindMethods
@observer
class CardFieldSet extends Component<ICardFieldSetProps> {
  @computed
  private get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const { model , fieldSet} = this.props
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = filterFieldConfigs(fieldConfigs, { model, writeOnly: true })
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
      <FieldSet fieldSet={fieldSet}>
        {filteredFieldConfigs.map(fieldConfig => (
          <CardField
            fieldConfig={fieldConfig}
            key={fieldConfig.field}
            model={model}
          />
        ))}
      </FieldSet>
    );
  }
}

export default CardFieldSet;
