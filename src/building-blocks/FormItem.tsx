import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { get } from 'lodash';
import cx from 'classnames';

import { Col, Form } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';

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

  private get rules(): Rule[] {
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

  private get formItemProps() {
    const { fieldConfig, formModel } = this.props,
      { field, name, formItemRenderExtra } = fieldConfig,
      extraValue = get(formModel, field),
      props = {
        initialValue: this.initialValue,
        name,
        preserve: false,
        rules: this.rules,
      };

    if (extraValue && formItemRenderExtra) {
      return {
        ...props,
        extra: formItemRenderExtra(extraValue),
      };
    }

    return props;
  }

  public render() {
    const { fieldConfig, layout, colon } = this.props,
      { colProps, formItemProps } = fieldConfig,
      className = cx(
        FORM_ITEM_CLASS_NAME,
        fieldConfig.className,
        formItemProps && formItemProps.className,
        formatClassNames(FORM_ITEM_CLASS_NAME, colon, layout),
      );

    return (
      <Col {...colProps}>
        <Form.Item {...this.formItemProps} {...formItemProps} className={className} label={renderLabel(fieldConfig)}>
          {this.props.children}
        </Form.Item>
      </Col>
    );
  }
}

export default FormItem;
