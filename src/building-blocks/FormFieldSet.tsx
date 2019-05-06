import React, { Component, Fragment } from 'react';
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
import Legend from './Legend';

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
      , rowProps = !isFieldSetSimple(this.fieldSet) && this.fieldSet.rowProps
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
      <>
        <Legend fieldSet={this.fieldSet} />

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
