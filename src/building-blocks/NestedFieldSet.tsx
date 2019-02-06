import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { splitName } from '@mighty-justice/utils';

import {
  fillInFieldSet,
  FormFieldSet,
  getFieldSetFields,
} from '../';

import { INestedFieldSetProps } from '../props';

@autoBindMethods
@observer
class NestedFieldSet extends Component<INestedFieldSetProps> {
  public constructor (props: INestedFieldSetProps) {
    super(props);
    props.form.setFieldsValue({ [props.id]: {} });
  }

  @computed
  private get fieldSet () {
    const { id, fieldSet } = this.props;
    return getFieldSetFields(fillInFieldSet(fieldSet))
      .map(fieldConfig => ({
        ...fieldConfig,
        field: `${id}.${fieldConfig.field}`,
      }));
  }

  @computed
  private get model () {
    /*
    This function implements the fieldConfig features
    populateFromSearch and populateNameFromSearch
    */
    const { search } = this.props
      , [firstName, lastName] = splitName(search)
      , defaults: { [key: string]: string } = {}
      ;

    if (!search) { return defaults; }

    this.fieldSet.map(fieldConfig => {
      const {
        field,
        populateFromSearch,
        populateNameFromSearch,
      } = fieldConfig;

      if (populateFromSearch) {
        defaults[field] = search;
      }

      if (populateNameFromSearch && field.endsWith('first_name')) {
        defaults[field] = firstName;
      }

      if (populateNameFromSearch && field.endsWith('last_name')) {
        defaults[field] = lastName;
      }
    });

    return defaults;
  }

  public render () {
    return (
      <FormFieldSet
        fieldSet={this.fieldSet}
        form={this.props.form}
        formManager={this.props.formManager}
        model={this.model}
      />
    );
  }
}

export default NestedFieldSet;
