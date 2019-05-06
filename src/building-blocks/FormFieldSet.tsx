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
import WithTooltip from './WithTooltip';

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

  private renderLegend () {
    const fieldSet = this.fieldSet;

    if (isFieldSetSimple(fieldSet)) { return null; }
    const { legend, tooltip } = fieldSet;

    if (!legend) { return null; }

    return (
      <h3>
        {tooltip
          ? <WithTooltip tooltip={tooltip}>{legend}</WithTooltip>
          : legend
        }
      </h3>
    );
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
        {this.renderLegend()}

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
