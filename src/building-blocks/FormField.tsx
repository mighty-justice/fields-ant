import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values, omit, get } from 'lodash';

import * as Antd from 'antd';
import { ValidationRule as AntValidationRule } from 'antd/lib/form';

import { FormManager, fillInFieldConfig, renderLabel, filterFieldConfig } from '../utilities';
import { IFieldConfigPartial, IFieldsValidator } from '../interfaces';

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

  private fieldsValidatorToValidator (fieldsValidator: IFieldsValidator, message?: any) {
    // This returns a valid rc-form validator.
    // It would be enforced by typing, but their validation interface is basically just anys
    return (_rule: any, _value: any, callback: (message?: string) => void) => {
      const { formManager } = this.props
        , model = formManager.formModel
        , value = get(model, this.fieldConfig.field)
        , valid = fieldsValidator(value, this.fieldConfig, model);

      if (valid) {
        callback();
      }
      else {
        callback(message || 'Validation error');
      }
    };
  }

  private get rules (): AntValidationRule[] {
    // Here we take the { [key: string]: formValidationRules } object
    // found in fieldConfig.formValidationRules and return a valid list
    // of rules for rc-form
    return values(this.fieldConfig.formValidationRules)
      .map(validationRule => {
        // Our own proprietary ( much more sane and powerful ) validation attribute
        // is converted here to the rc-form style validator
        if (validationRule.fieldsValidator) {
          return {
            validator: this.fieldsValidatorToValidator(validationRule.fieldsValidator, validationRule.message),
            ...omit(validationRule, 'fieldsValidator'),
          };
        }

        // However, all default rc-form validators will still work as expected
        return validationRule;
      });
  }

  private get decoratorOptions () {
    return {
      initialValue: this.initialValue,
      rules: this.rules,
    };
  }

  private get shouldRender (): boolean {
    const { formManager } = this.props
      , fieldConfig = this.fieldConfig
      , { readOnly } = fieldConfig
      ;

    if (readOnly) { return false; }
    if (fieldConfig.insertIf) { return !filterFieldConfig(fieldConfig, { model: formManager.formModel }); }
    return true;
  }

  public render () {
    if (!this.shouldRender) { return null; }

    const { formManager } = this.props
      , fieldConfig = this.fieldConfig
      , { className, colProps, formItemProps, field, skipFieldDecorator } = fieldConfig
      , { getFieldDecorator } = formManager.form
      ;

    const decoratorOptionsProp = skipFieldDecorator ? { decoratorOptions: this.decoratorOptions } : {}
      , editComponent = <fieldConfig.editComponent {...this.editProps} {...decoratorOptionsProp} />
      , wrappedComponent = skipFieldDecorator
        ? editComponent
        : getFieldDecorator(field, this.decoratorOptions)(editComponent)
      , FormItemComponent = (
        <Antd.Form.Item
          className={className}
          {...formItemProps}
          label={renderLabel(fieldConfig)}
        >
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
