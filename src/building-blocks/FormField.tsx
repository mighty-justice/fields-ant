import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import * as Antd from 'antd';

import { IFieldConfig } from '../interfaces';

import {
  filterInsertIf,
} from '../utilities/common';

import Info, { Label, Value } from './Info';

interface IProps {
  defaults?: object;
  fieldConfig: IFieldConfig;
  form: any;
  model?: any;
}

@autoBindMethods
@observer
class FormField extends Component<IProps> {
  public render () {
    const { model, form, defaults, fieldConfig } = this.props
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

    if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
      return null;
    }

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
}

export default FormField;
