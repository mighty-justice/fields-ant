import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import Info, { Label, Value } from './Info';
import { IFieldConfig } from './interfaces';

interface IProps {
  defaults?: object;
  fields: IFieldConfig[];
  form: any;
  model?: any;
}

@autoBindMethods
@observer
class FormFields extends Component<IProps> {
  private renderField (fieldConfig: IFieldConfig) {
    const { model, form, defaults } = this.props
      , { getFieldDecorator } = form;

    const initialValue = (
        fieldConfig.value
        || fieldConfig.toForm(model, fieldConfig.field)
        || fieldConfig.toForm(defaults, fieldConfig.field)
      )
      , EditComponent = fieldConfig.editComponent
      , decoratorOptions = { initialValue, rules: fieldConfig.formValidationRules }
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig } : {}
      , editProps = {
        ...fieldConfig.editProps,
        ...fieldConfigProp,
      };

    return (
      <Info key={fieldConfig.field}>
        <Label className={cx({ 'form-item-required': fieldConfig.required })}>
          {fieldConfig.label}
        </Label>
        <Value>
          <Antd.Form.Item>
            {getFieldDecorator(fieldConfig.field, decoratorOptions)(
              <EditComponent {...editProps} />,
            )}
          </Antd.Form.Item>
        </Value>
      </Info>
    );
  }

  public render () {
    const { fields } = this.props;
    return fields.map(this.renderField);
  }
}

export default FormFields;
