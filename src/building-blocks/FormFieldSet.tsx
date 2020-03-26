import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import {
  fillInFieldSet,
  filterFieldConfigs,
  FormManager,
  getFieldSetFields,
} from '../utilities';

import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';

import FormField from './FormField';
import FieldSet from './FieldSet';

export interface IFormFieldSetProps {
  fieldSet: IFieldSetPartial;
  formManager: FormManager;
  formModel: IModel;
}

@autoBindMethods
@observer
class FormFieldSet extends Component<IFormFieldSetProps> {
  @computed
  public get fieldSet () {
    return fillInFieldSet(this.props.fieldSet);
  }

  public render () {
    const { formModel, fieldSet, formManager } = this.props
      , fieldConfigs = getFieldSetFields(this.fieldSet)
      , filteredFieldConfigs = filterFieldConfigs(fieldConfigs, { model: formModel, readOnly: true })
      ;

    if (!filteredFieldConfigs.length) {
      return null;
    }

    return (
      <FieldSet fieldSet={fieldSet}>
        {filteredFieldConfigs.map(fieldConfig => (
          <FormField
            fieldConfig={fieldConfig}
            formManager={formManager}
            formModel={formModel}
            key={fieldConfig.field}
          />
        ))}
      </FieldSet>
    );

  }
}

export default FormFieldSet;
