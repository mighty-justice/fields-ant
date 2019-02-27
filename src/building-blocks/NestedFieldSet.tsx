import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { splitName } from '@mighty-justice/utils';

import {
  fillInFieldSet,
  FormFieldSet,
  getFieldSetFields,
  IFieldConfigPartial,
  IFieldSetPartial,
} from '../';

import FormManager from '../utilities/FormManager';

export interface INestedFieldSetProps {
  fieldSet: IFieldSetPartial;
  formManager: FormManager;
  id: string;
  label: string | null;
  search?: string;
}

@autoBindMethods
@observer
class NestedFieldSet extends Component<INestedFieldSetProps> {
  @computed
  private get fieldSet () {
    const { id, fieldSet } = this.props;
    return getFieldSetFields(fillInFieldSet(fieldSet))
      .map(fieldConfig => ({
        ...fieldConfig,
        field: `${id}.${fieldConfig.field}`,
        ...this.getDefaultValue(fieldConfig),
      }));
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

    return {};
  }

  public render () {
    return (
      <FormFieldSet
        fieldSet={this.fieldSet}
        formManager={this.props.formManager}
      />
    );
  }
}

export default NestedFieldSet;
