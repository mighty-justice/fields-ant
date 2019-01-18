import React, { Component } from 'react';
import * as Antd from 'antd';
import autoBindMethods from 'class-autobind-decorator';
import { inject, observer } from 'mobx-react';
import { IFieldConfig, IFieldConfigOptionSelect, IOption } from '../interfaces';
import { sortBy } from 'lodash';

interface IProps {
  fieldConfig: IFieldConfig;
}

interface IInjected extends IProps {
  getOptions: (optionType: string) => IOption[];
}

@inject('getOptions')
@autoBindMethods
@observer
class RadioGroup extends Component<IProps> {
  private get injected () {
    return this.props as IInjected;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigOptionSelect;
  }

  private get unsortedOptions (): IOption[] {
    const { options, optionType } = this.fieldConfig;

    if (options) { return options; }
    if (this.fieldConfig.getOptions) { return this.fieldConfig.getOptions(optionType); }
    if (this.injected.getOptions) { return this.injected.getOptions(optionType); }
    return [];
  }

  private get options (): IOption[] {
    return this.fieldConfig.sorted ? sortBy(this.unsortedOptions, 'name') : this.unsortedOptions;
  }

  public render () {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Antd.Radio.Group {...this.props}>
        {this.options.map(option => (
          <Antd.Radio
            key={option.value}
            style={radioStyle}
            value={option.value}
          >
            {option.name}
          </Antd.Radio>
        ))}
      </Antd.Radio.Group>
    );
  }
}

export default RadioGroup;
