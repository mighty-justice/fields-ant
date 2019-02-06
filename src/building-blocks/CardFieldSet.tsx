import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  filterInsertIf,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities/common';

import CardField from '../building-blocks/CardField';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';

export interface ICardFieldSetProps {
  fieldSet: IFieldSetPartial;
  idx?: number;
  model?: IModel;
}

@observer
class CardFieldSet extends Component<ICardFieldSetProps> {
  @computed
  private get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const { model } = this.props
      , idx = this.props.idx || 0
      , legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = fieldConfigs.filter(fieldConfig => !filterInsertIf(fieldConfig, model))
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
        <Fragment key={idx}>
          {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}
          {legend && <h3>{legend}</h3>}

          {getFieldSetFields(this.fieldSet).map(fieldConfig => (
            <CardField
              fieldConfig={fieldConfig}
              key={fieldConfig.field}
              model={model}
            />
          ))}
        </Fragment>
    );
  }
}

export default CardFieldSet;
