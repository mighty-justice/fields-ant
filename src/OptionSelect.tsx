import React, { Component } from 'react';
import * as Antd from 'antd';

import { IFieldConfig, IFieldConfigOptionSelect } from './interfaces';

interface IProps {
  fieldConfig: IFieldConfig;
}

class OptionSelect extends Component<IProps> {
  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  public render () {
    const options = this.fieldConfig.options || this.fieldConfig.getOptions(this.fieldConfig.optionType || '');

    return (
      <Antd.Select {...this.props} allowClear>
        {options.map(option => (
          <Antd.Select.Option value={option.value} key={option.value}>{option.name}</Antd.Select.Option>
        ))}
      </Antd.Select>
    );
  }
}

export default OptionSelect;
