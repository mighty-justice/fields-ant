import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { FormManager, fillInFieldConfig, filterFieldConfig } from '../utilities';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';
import FormItem from './FormItem';

export interface IFormFieldProps {
  fieldConfig: IFieldConfigPartial;
  formManager: FormManager;
  formModel: IModel;
}

@autoBindMethods
@observer
class FormField extends Component<IFormFieldProps> {
  @computed
  private get fieldConfig () {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  private get editProps () {
    const { formManager, formModel } = this.props
      , fieldConfig = this.fieldConfig
      , fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig, formManager, formModel } : {}
      ;

    return {
      ...fieldConfig.editProps,
      ...fieldConfigProp,
    };
  }

  private get shouldRender (): boolean {
    const { formModel } = this.props;
    return !filterFieldConfig(this.fieldConfig, {
      model: formModel,
      readOnly: true,
    });
  }

  public render () {
    if (!this.shouldRender) { return null; }

    const { formManager, formModel } = this.props
      , fieldConfig = this.fieldConfig
      , { skipFieldDecorator } = fieldConfig
      , editComponent = <fieldConfig.editComponent {...this.editProps} />
      ;

    if (skipFieldDecorator) {
      return editComponent;
    }

    return (
      <FormItem
        fieldConfig={this.fieldConfig}
        formManager={formManager}
        formModel={formModel}
      >
        {editComponent}
      </FormItem>
    );
  }
}

export default FormField;
