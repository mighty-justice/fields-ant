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

interface IProps {
  defaults?: object;
  fieldConfig: IFieldConfig;
  form: any;
  formManager: FormManager;
  model?: any;
}

@autoBindMethods
@observer
class FormField extends Component<IProps> {
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

    const fieldDecorator = getFieldDecorator(field, this.decoratorOptions)
      , fieldDecProps = skipFieldDecorator ? { fieldDecorator } : {}
      , editComponent = <fieldConfig.editComponent {...this.editProps} {...fieldDecProps} />
      , wrappedComponent = skipFieldDecorator ? editComponent : fieldDecorator(editComponent)
      , FormItemComponent = (
      <Antd.Form.Item {...formItemProps} label={this.label}>
        {wrappedComponent}
      </Antd.Form.Item>
    );

    console.log('skipFieldDecorator?', field, skipFieldDecorator);

    if (colProps) {
      return <Antd.Col {...colProps} children={FormItemComponent} />;
    }

    return FormItemComponent;
  }
}

export default FormField;
