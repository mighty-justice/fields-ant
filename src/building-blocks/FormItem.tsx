import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values, omit, get } from 'lodash';
import cx from 'classnames';

import { Col, Form } from 'antd';
import { ValidationRule as AntValidationRule } from 'antd/es/form';

import FormManager from '../utilities/FormManager';
import { noopValidator, renderLabel } from '../utilities/common';
import { IFieldConfig, IFieldsValidator } from '../interfaces';
import { IModel } from '../props';
import { CLASS_PREFIX } from '../consts';

export interface IFormFieldProps {
  fieldConfig: IFieldConfig;
  formManager: FormManager;
  formModel: IModel;
}

export const FORM_ITEM_CLASS_NAME = `${CLASS_PREFIX}-form-item`;

@autoBindMethods
@observer
class FormItem extends Component<IFormFieldProps> {
  private get initialValue () {
    const { formManager, fieldConfig } = this.props;
    return formManager.getDefaultValue(fieldConfig);
  }

  private fieldsValidatorToValidator (fieldsValidator: IFieldsValidator, message?: any) {
    // This returns a valid rc-form validator.
    // It would be enforced by typing, but their validation interface is basically just anys
    return (_rule: any, _value: any, callback: (message?: string) => void) => {
      const { formManager, fieldConfig } = this.props
        , model = formManager.formModel
        , value = get(model, fieldConfig.field)
        , valid = fieldsValidator(value, fieldConfig, model);

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

    return [
      // Empty validator to ensure backend errors are cleared when field is edited
      { validator: noopValidator },

      // Convert fields-ant fieldsValidator to rc-form validators
      ...values(this.props.fieldConfig.formValidationRules)
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
        }),
    ];
  }

  private get decoratorOptions () {
    return {
      initialValue: this.initialValue,
      rules: this.rules,
    };
  }

  private get formItemProps () {
    const { fieldConfig, formModel } = this.props
      , { field, formItemRenderExtra } = fieldConfig
      , extraValue = get(formModel, field)
      ;

    if (extraValue && formItemRenderExtra) {
      return {
        extra: formItemRenderExtra(extraValue),
      };
    }

    return {};
  }

  public render () {
    const { formManager, fieldConfig } = this.props
      , { colProps, formItemProps, field } = fieldConfig
      , className = cx(
        FORM_ITEM_CLASS_NAME,
        fieldConfig.className,
        formItemProps && formItemProps.className,
      )
      , { getFieldDecorator } = formManager.form
      ;

    return (
      <Col {...colProps}>
        <Form.Item
          {...this.formItemProps}
          {...formItemProps}
          className={className}
          label={renderLabel(fieldConfig)}
        >
          {getFieldDecorator(field, this.decoratorOptions)(this.props.children)}
        </Form.Item>
      </Col>
    );
  }
}

export default FormItem;
