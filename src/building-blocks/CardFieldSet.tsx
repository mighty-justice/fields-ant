import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  filterFieldConfigs,
  getFieldSetFields,
} from '../utilities';

import CardField from '../building-blocks/CardField';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';

import Legend from './Legend';

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
    const { model , fieldSet} = this.props
      , idx = this.props.idx || 0
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = filterFieldConfigs(fieldConfigs, { model, writeOnly: true })
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
        <Fragment key={idx}>
          {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}

          <Legend fieldSet={fieldSet} />

          {filteredFieldConfigs.map(fieldConfig => (
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
