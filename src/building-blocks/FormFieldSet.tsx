import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import { IFieldSetPartial } from '../interfaces';

import {
  fillInFieldSet,
  filterInsertIf,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities/common';

import FormManager from '../utilities/FormManager';

import FormField from './FormField';

export interface IFormFieldSetProps {
  defaults?: object;
  fieldSet: IFieldSetPartial;
  form: any;
  formManager: FormManager;
  model?: any;
}

@autoBindMethods
@observer
class FormFieldSet extends Component<IFormFieldSetProps> {
  @computed
  public get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const fieldConfigs = getFieldSetFields(this.fieldSet)
      , formValues = this.props.form.getFieldsValue()
      , filteredFieldConfigs = fieldConfigs.filter(fieldConfig => !filterInsertIf(fieldConfig, formValues))
      , legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend
      , rowProps = !isFieldSetSimple(this.fieldSet) && this.fieldSet.rowProps
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
      <>
        {legend && <h3>{legend}</h3>}

        <Antd.Row {...rowProps}>
          {filteredFieldConfigs.map((fieldConfig, idx) => (
            <FormField
              {...this.props}
              fieldConfig={fieldConfig}
              key={`field-config-${fieldConfig.field}-${idx}`}
            />
          ))}
        </Antd.Row>
      </>
    );

  }
}

export default FormFieldSet;
