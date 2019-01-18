import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { values } from 'lodash';

import * as Antd from 'antd';

import { IFieldConfig } from '../interfaces';

import {
  filterInsertIf,
} from '../utilities/common';

interface IProps {
  defaults?: object;
  fieldConfig: IFieldConfig;
  form: any;
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
    const { fieldConfig, form } = this.props
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig } : {};

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
      , { getFieldDecorator } = form;

    if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
      return null;
    }

    return (
      <Antd.Form.Item {...fieldConfig.formItemProps} label={this.label}>
        {getFieldDecorator(fieldConfig.field, this.decoratorOptions)(
          <fieldConfig.editComponent {...this.editProps} />,
        )}
      </Antd.Form.Item>
    );
  }
}

export default FormField;
