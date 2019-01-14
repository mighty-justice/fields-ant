import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { IFieldSetPartial } from '../interfaces';

import {
  fillInFieldSet,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities/common';

import { computed } from 'mobx';
import FormField from './FormField';

interface IProps {
  defaults?: object;
  fieldSet: IFieldSetPartial;
  form: any;
  model?: any;
}

@autoBindMethods
@observer
class FormFields extends Component<IProps> {
  @computed
  public get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const fieldConfigs = getFieldSetFields(this.fieldSet)
      , legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend
      ;

    return (
      <>
        {legend && <h3>{legend}</h3>}

        {fieldConfigs.map((fieldConfig, idx) => (
          <FormField
            {...this.props}
            fieldConfig={fieldConfig}
            key={`field-config-${fieldConfig.field}-${idx}`}
          />
         ))}
      </>
    );

  }
}

export default FormFields;
