import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { splitName } from '@mighty-justice/utils';

import FormManager from '../utilities/FormManager';
import { fillInFieldSet, mapFieldSetFields } from '../utilities/fillIn';
import { IFieldConfigPartial, IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';

import FormFieldSet from './FormFieldSet';

export interface INestedFieldSetProps {
  fieldSet: IFieldSetPartial;
  formManager: FormManager;
  formModel: IModel;
  id: string;
  label: React.ReactNode;
  search?: string;
}

@autoBindMethods
@observer
class NestedFieldSet extends Component<INestedFieldSetProps> {
  private fieldValueMapper (fieldConfig: IFieldConfigPartial) {
    const { id } = this.props;

    return {
      ...fieldConfig,
      field: `${id}.${fieldConfig.field}`,
      ...this.getDefaultValue(fieldConfig),
    };
  }

  @computed
  private get fieldSet () {
    const { fieldSet } = this.props;
    return mapFieldSetFields(fillInFieldSet(fieldSet), this.fieldValueMapper);
  }

  private getDefaultValue (fieldConfig: IFieldConfigPartial): object {
    /*
    This function implements the fieldConfig features
    populateFromSearch and populateNameFromSearch
    */
    const { search } = this.props
      , [firstName, lastName] = splitName(search);

    if (!search) { return {}; }

    const {
      field,
      populateFromSearch,
      populateNameFromSearch,
    } = fieldConfig;

    if (populateFromSearch) {
      return { value: search };
    }

    if (populateNameFromSearch && field.endsWith('first_name')) {
      return { value: firstName };
    }

    if (populateNameFromSearch && field.endsWith('last_name')) {
      return { value: lastName };
    }

    // Keep add new form from populating with model data
    return { value: '' };
  }

  public render () {
    return (
      <FormFieldSet
        fieldSet={this.fieldSet}
        formManager={this.props.formManager}
        formModel={this.props.formModel}
      />
    );
  }
}

export default NestedFieldSet;
