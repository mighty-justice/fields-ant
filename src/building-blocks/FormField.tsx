import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values } from 'lodash';

import * as Antd from 'antd';

import FormManager from '../utilities/FormManager';
import { fillInFieldConfig, filterInsertIf } from '../utilities/common';
import { IFieldConfigPartial } from '../interfaces';

export interface IFormFieldProps {
  fieldConfig: IFieldConfigPartial;
  formManager: FormManager;
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
    const { formManager } = this.props;
    return formManager.getDefaultValue(this.fieldConfig);
  }

  private get editProps () {
    const { formManager } = this.props
      , fieldConfig = this.fieldConfig
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig, formManager } : {}
      ;

    return {
      ...fieldConfig.editProps,
      ...fieldConfigProp,
      form: formManager.form,
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
    const { formManager } = this.props
      , fieldConfig = this.fieldConfig
      , { colProps, formItemProps, field, skipFieldDecorator } = fieldConfig
      , { getFieldDecorator } = formManager.form
      ;

    if (filterInsertIf(fieldConfig, formManager.formModel)) {
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
