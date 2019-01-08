import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import { inject, observer } from 'mobx-react';
import { isArray } from 'lodash';

import { IFieldConfigOptionSelect, IOption } from '../interfaces';

interface IProps {
  fieldConfig: { options?: any[], optionType?: string };
  value: any;
}

interface IInjected extends IProps {
  getOptions: (optionType: string) => IOption[];
}

@inject('getOptions')
@autoBindMethods
@observer
class OptionSelectDisplay extends Component<IProps> {
  private get injected () {
    return this.props as IInjected;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  private get options (): IOption[] {
    const { options, optionType } = this.fieldConfig;

    if (options) { return options; }
    if (this.fieldConfig.getOptions) { return this.fieldConfig.getOptions(optionType); }
    if (this.injected.getOptions) { return this.injected.getOptions(optionType); }
    return [];
  }

  public render () {
    const { value } = this.props
      , option = this.options.find(o => o.value === value);

    if (!option) { return '--'; }
    return option.name;
  }
}

export function formatOptionSelect (value: any, fieldConfig: IFieldConfigOptionSelect) {
  if (isArray(value)) {
    if (value.length > 1) {
      return `(${value.length} values)`;
    }

    return <OptionSelectDisplay value={value[0]} fieldConfig={fieldConfig} />;
  }

  return <OptionSelectDisplay value={value} fieldConfig={fieldConfig} />;
}

export default OptionSelectDisplay;
