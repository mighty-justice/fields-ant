import React, { Component } from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { mapValues, isEmpty, values } from 'lodash';

import { splitName } from '@mighty-justice/utils';

import * as Antd from 'antd';

import {
  fillInFieldSet,
  FormFieldSet,
  getFieldSetFields,
  IFieldSetPartial,
} from '../';

interface IProps {
  fieldSet: IFieldSetPartial;
  id: string;
  search?: string;
  setFields: (data: { [id: string]: { errors: any, value: any } }) => void;
}

@autoBindMethods
@observer
class NestedFieldSet extends Component<IProps> {
  @observable private NestedForm: any;
  @observable private subForm: any;

  public constructor (props: IProps) {
    super(props);
    this.NestedForm = Antd.Form.create({
      onFieldsChange: this.onFieldsChange,
    })(FormFieldSet);
  }

  @computed
  private get fieldSet () {
    return getFieldSetFields(fillInFieldSet(this.props.fieldSet));
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

      if (populateNameFromSearch && field === 'first_name') {
        defaults.first_name = firstName;
      }

      if (populateNameFromSearch && field === 'last_name') {
        defaults.last_name = lastName;
      }
    });

    return defaults;
  }

  private async onFieldsChange (_props: any, fields: any) {
    /*
    This function is triggered on all fields changes
    and includes values and errors of all sub-fields
    */
    const { id } = this.props
      , value = mapValues(fields, v => v.value)
      , errors = values(fields) // Array<value, errors> => Error[]
        .map(v => v.errors) // Get errors for each field
        .filter(v => !!v) // Filter out those with no errors
        .map(v => v.message) // Strip to just error message
        .map(v => new Error(v)) // Wrap in error object
        ;

    /*
    Here were are taking the packaged errors and field value and passing
    them up to the parent form.

    The sub-form will see name, phone, etc. while the parent will receive
    { law_firm: { name, phone } } as a single changing value
    */
    this.props.setFields({
      [id]: {
        errors: isEmpty(errors) ? undefined : errors,
        value,
      },
    });
  }

  private initializeForm () {
    /*
    Ideally we would not validate until submit, but for now we're just going
    to validate on form mount so the form isn't submitted with an invalid
    nested fieldSet
    */
    this.subForm.validateFields();
  }

  private setSubForm (wrappedComponent: any) {
    if (wrappedComponent) {
      this.subForm = wrappedComponent.props.form;
      this.initializeForm();
    }
  }

  public render () {
    return (
      <this.NestedForm
        fieldSet={this.props.fieldSet}
        model={this.model}
        wrappedComponentRef={this.setSubForm}
      />
    );
  }
}

export default NestedFieldSet;
