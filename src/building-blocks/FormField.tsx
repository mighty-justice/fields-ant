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
  public render () {
    const { model, form, defaults, fieldConfig } = this.props
      , { getFieldDecorator } = form;

    const initialValue = (
        fieldConfig.value
        || fieldConfig.toForm(model, fieldConfig.field)
        || fieldConfig.toForm(defaults, fieldConfig.field)
      )
      , EditComponent = fieldConfig.editComponent
      , decoratorOptions = { initialValue, rules: values(fieldConfig.formValidationRules) }
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig } : {}
      , editProps = {
        ...fieldConfig.editProps,
        ...fieldConfigProp,
      };

    if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
      return null;
    }

    return (
      <Antd.Form.Item {...fieldConfig.formItemProps} label={fieldConfig.label}>
        {getFieldDecorator(fieldConfig.field, decoratorOptions)(
          <EditComponent {...editProps} />,
        )}
      </Antd.Form.Item>
    );
  }
}

export default FormField;
