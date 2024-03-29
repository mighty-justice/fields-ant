import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { fillInFieldConfig, filterFieldConfig } from '../utilities';
import { IFormFieldProps } from '../interfaces';

import FormItem from './FormItem';

@autoBindMethods
@observer
class FormField extends Component<IFormFieldProps> {
  @computed
  private get fieldConfig() {
    return fillInFieldConfig(this.props.fieldConfig);
  }

  private get editProps() {
    const { formManager, formModel } = this.props,
      fieldConfig = this.fieldConfig,
      fieldConfigProp = fieldConfig.fieldConfigProp ? { fieldConfig, formManager, formModel } : {},
      disabled: boolean = fieldConfig.disabled || formManager.isFormDisabled;

    return {
      disabled,
      id: fieldConfig.field,
      ...fieldConfig.editProps,
      ...fieldConfigProp,
    };
  }

  private get shouldRender(): boolean {
    const { formModel } = this.props;
    return !filterFieldConfig(this.fieldConfig, {
      model: formModel,
      readOnly: true,
    });
  }

  public render() {
    if (!this.shouldRender) {
      return null;
    }

    const { formManager, formModel, ...passDownProps } = this.props,
      { skipFieldDecorator, editComponent: EditComponent } = this.fieldConfig;

    if (skipFieldDecorator) {
      return <EditComponent {...this.editProps} />;
    }

    return (
      <FormItem {...passDownProps} fieldConfig={this.fieldConfig} formManager={formManager} formModel={formModel}>
        <EditComponent {...this.editProps} />
      </FormItem>
    );
  }
}

export default FormField;
