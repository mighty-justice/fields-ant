import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values } from 'lodash';

import * as Antd from 'antd';

import FormManager from '../utilities/FormManager';
import { fillInFieldConfig, filterInsertIf } from '../utilities/common';
import { IFieldConfigPartial } from '../interfaces';
import { IForm, IModel } from '../props';

export interface IFormFieldProps {
  defaults?: object;
  fieldConfig: IFieldConfigPartial;
  form: IForm;
  formManager: FormManager;
  model?: IModel;
}

@autoBindMethods
@observer
class FormField extends Component<IFormFieldProps> {
  @computed
  private get fieldConfig () {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  private get label () {
    const { fieldConfig } = this.props;
    return fieldConfig.showLabel ? fieldConfig.label : '';
  }

  private get initialValue () {
    const { model, defaults } = this.props
      , fieldConfig = this.fieldConfig;

    return (
      fieldConfig.value
      || fieldConfig.toForm(model, fieldConfig.field)
      || fieldConfig.toForm(defaults, fieldConfig.field)
    );
  }

  private get editProps () {
    const { form, formManager } = this.props
      , fieldConfig = this.fieldConfig
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
    const { form } = this.props
      , fieldConfig = this.fieldConfig
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
