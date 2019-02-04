import React, { Component } from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { isEmpty, values, flatten, isArray } from 'lodash';

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

      if (populateNameFromSearch && field.endsWith('first_name')) {
        defaults[field] = firstName;
      }

      if (populateNameFromSearch && field.endsWith('last_name')) {
        defaults[field] = lastName;
      }
    });

    return defaults;
  }

  private async onFieldsChange (_props: any, _fields: any) {
    const { id } = this.props
      // The types below are not required by Typescript
      // They are there to explicitly state expectations and catch mistakes
      , errorsMap: { [key: string]: undefined | string[] } = this.subForm.getFieldsError()
      , errorsArray: Array<undefined | string[]> = values(errorsMap)
      , onlyInvalid: string[][] = errorsArray.filter(isArray)
      , allErrors: string[] = flatten(onlyInvalid)

      // Prepare final values for parent form
      , errors: undefined | string[] = isEmpty(allErrors) ? undefined : allErrors
      , value: { [key: string]: any } = this.subForm.getFieldsValue()
      ;

    /*
    Here were are taking the packaged errors and field value and passing
    them up to the parent form.

    The sub-form will see name, phone, etc. while the parent will receive
    { law_firm: { name, phone } } as a single changing value
    */
    this.props.setFields({ [id]: { errors, value } });
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
