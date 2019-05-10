import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  filterFieldConfigs,
  FormManager,
  getFieldSetFields,
  isFieldSetSimple,
} from '../utilities';

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
    // Filter out read-only fieldConfigs
    const fieldConfigs = getFieldSetFields(this.fieldSet);

    // If no fieldConfigs have an insertIf, skip costly formModel calculation
    if (!fieldConfigs.some(fieldConfig => !!fieldConfig.insertIf)) {
      return filterFieldConfigs(fieldConfigs, { readOnly: true });
    }

    // One of them does, so get formModel and filter out insertIfs
    const formModel = this.props.formManager.formModel;
    return filterFieldConfigs(fieldConfigs, { model: formModel, readOnly: true });
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
