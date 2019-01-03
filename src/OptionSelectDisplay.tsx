import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { isArray } from 'lodash';

import { IFieldConfigOptionSelect } from './interfaces';

interface IProps {
  fieldConfig: { options?: any[], optionType?: string };
  value: any;
}

@observer
class OptionSelectDisplay extends Component<IProps> {
  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  public render () {
    const { value } = this.props
      , options = this.fieldConfig.options || this.fieldConfig.getOptions(this.fieldConfig.optionType || '')
      , option = options.find(o => o.value === value);

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
