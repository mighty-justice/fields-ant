import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values } from 'lodash';

import * as Antd from 'antd';

import { IFieldConfig } from '../interfaces';

import {
  filterInsertIf,
} from '../utilities/common';

import FormManager from '../utilities/FormManager';

export interface IFormFieldProps {
  defaults?: object;
  fieldConfig: IFieldConfig;
  form: any;
  formManager: FormManager;
  model?: any;
}

@autoBindMethods
@observer
class FormField extends Component<IFormFieldProps> {
  private get label () {
    const { fieldConfig } = this.props;
    return fieldConfig.showLabel ? fieldConfig.label : '';
  }

  private get initialValue () {
    const { model, defaults, fieldConfig } = this.props;
    return (
      fieldConfig.value
      || fieldConfig.toForm(model, fieldConfig.field)
      || fieldConfig.toForm(defaults, fieldConfig.field)
    );
  }

  private get editProps () {
    const { fieldConfig, form, formManager } = this.props
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig, formManager } : {}
      ;

    return {
      ...fieldConfig.editProps,
      ...fieldConfigProp,
      form,
    };
  }

  private get decoratorOptions () {
    const { fieldConfig } = this.props;
    return {
      initialValue: this.initialValue,
      rules: values(fieldConfig.formValidationRules),
    };
  }

  public render () {
    const { form, fieldConfig } = this.props
      , { colProps, formItemProps, field, skipFieldDecorator } = fieldConfig
      , { getFieldDecorator } = form
      ;

    if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
      return null;
    }

    const decoratorOptionsProp = skipFieldDecorator ? { decoratorOptions: this.decoratorOptions } : {}
      , editComponent = <fieldConfig.editComponent {...this.editProps} {...decoratorOptionsProp} />
      , wrappedComponent = skipFieldDecorator
        ? editComponent
        : getFieldDecorator(field, this.decoratorOptions)(editComponent)
      , FormItemComponent = (
        <Antd.Form.Item {...formItemProps} label={this.label}>
          {wrappedComponent}
        </Antd.Form.Item>
    );

    if (colProps) {
      return <Antd.Col {...colProps} children={FormItemComponent} />;
    }

    return FormItemComponent;
  }
}

export default FormField;
