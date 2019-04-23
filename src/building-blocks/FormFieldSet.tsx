import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  filterInsertIf,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities/common';

import FormManager from '../utilities/FormManager';
import { IFieldSetPartial } from '../interfaces';

import FormField from './FormField';

export interface IFormFieldSetProps {
  fieldSet: IFieldSetPartial;
  formManager: FormManager;
}

@autoBindMethods
@observer
class FormFieldSet extends Component<IFormFieldSetProps> {
  @computed
  public get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  private get filteredFieldConfigs () {
    const fieldConfigs = getFieldSetFields(this.fieldSet);

    if (!fieldConfigs.some(fieldConfig => !!fieldConfig.insertIf)) {
      return fieldConfigs;
    }

    const formModel = this.props.formManager.formModel;
    return fieldConfigs.filter(fieldConfig => !filterInsertIf(fieldConfig, formModel));
  }

  public render () {
    const filteredFieldConfigs = this.filteredFieldConfigs
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
