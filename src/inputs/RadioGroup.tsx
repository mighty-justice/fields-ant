import React, { Component } from 'react';
import { computed } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import { inject, observer } from 'mobx-react';

import { Radio } from 'antd';

import { IAntFormField, IFieldConfigOptionSelect, IInjected, IFormFieldProps, IOption } from '../interfaces';
import { getOptions } from '../utilities';

@inject('getOptions')
@autoBindMethods
@observer
class RadioGroup extends Component<IFormFieldProps> {
  private get injected() {
    return this.props as IInjected & IFormFieldProps & IAntFormField;
  }

  private get fieldConfig() {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  @computed
  private get options(): IOption[] {
    return getOptions(this.fieldConfig, this.injected);
  }

  public render() {
    return (
      <Radio.Group {...this.props}>
        {this.options.map(option => (
          <Radio disabled={option.disabled} key={option.value} value={option.value}>
            {option.name}
          </Radio>
        ))}
      </Radio.Group>
    );
  }
}

export default RadioGroup;
