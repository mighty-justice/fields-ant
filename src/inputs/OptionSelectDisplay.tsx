import React, { Component } from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { isArray } from 'lodash';

import {
  IFieldConfig,
  IFieldConfigOptionSelect,
  IInjected,
  IOption,
} from '../interfaces';

import { getOptions } from '..';

export interface IOptionSelectDisplayProps {
  fieldConfig: IFieldConfig;
  value: any;
}

@inject('getOptions')
@autoBindMethods
@observer
class OptionSelectDisplay extends Component<IOptionSelectDisplayProps> {
  private get injected () {
    return this.props as IInjected & IOptionSelectDisplayProps;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  @computed
  private get options (): IOption[] {
    return getOptions(this.fieldConfig, this.injected);
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
