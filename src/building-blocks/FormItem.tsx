import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { get } from 'lodash';
import cx from 'classnames';

import { Col } from 'antd';
import { Form } from '@ant-design/compatible';
import { ValidationRule as AntValidationRule } from '@ant-design/compatible/es/form';

import { formatClassNames, FormManager, noopValidator, renderLabel } from '../utilities';
import { IFieldConfig, ILayout } from '../interfaces';
import { IModel } from '../props';
import { CLASS_PREFIX } from '../consts';
import { sharedComponentPropsDefaults } from '../propsDefaults';

export interface IFormFieldProps {
  fieldConfig: IFieldConfig;
  formManager: FormManager;
  formModel: IModel;
  layout?: ILayout;
  colon?: boolean;
}

export const FORM_ITEM_CLASS_NAME = `${CLASS_PREFIX}-form-item`;

@autoBindMethods
@observer
class FormItem extends Component<IFormFieldProps> {
  public static defaultProps = sharedComponentPropsDefaults;

  private get initialValue() {
    const { formManager, fieldConfig } = this.props;
    return formManager.getDefaultValue(fieldConfig);
  }

  private get rules(): AntValidationRule[] {
    const { fieldConfig } = this.props;
    // Here we take the { [key: string]: formValidationRules } object
    // found in fieldConfig.formValidationRules and return a valid list
    // of rules for rc-form

    return [
      ...Object.values(fieldConfig.formValidationRules),

      // Empty validator to ensure backend errors are cleared when field is edited
      { validator: noopValidator },
    ];
  }

  private get decoratorOptions() {
    return {
      initialValue: this.initialValue,
      rules: this.rules,
    };
  }

  private get formItemProps() {
    const { fieldConfig, formModel } = this.props,
      { field, formItemRenderExtra } = fieldConfig,
      extraValue = get(formModel, field);

    if (extraValue && formItemRenderExtra) {
      return {
        extra: formItemRenderExtra(extraValue),
      };
    }

    return {};
  }

  public render() {
    const { formManager, fieldConfig, layout, colon } = this.props,
      { colProps, formItemProps, field } = fieldConfig,
      className = cx(
        FORM_ITEM_CLASS_NAME,
        fieldConfig.className,
        formItemProps && formItemProps.className,
        formatClassNames(FORM_ITEM_CLASS_NAME, colon, layout),
      ),
      { getFieldDecorator } = formManager.form;

    return (
      <Col {...colProps}>
        <Form.Item {...this.formItemProps} {...formItemProps} className={className} label={renderLabel(fieldConfig)}>
          {getFieldDecorator(field, this.decoratorOptions)(this.props.children)}
        </Form.Item>
      </Col>
    );
  }
}

export default FormItem;
