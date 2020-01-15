import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { IInputProps, IOption } from '../interfaces';

import ObjectSelect from './ObjectSelect';
import { IAntFormField, IInjected } from '../index';

@autoBindMethods
@observer
class OptionSelect extends Component<IInputProps> {
  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private onChange (option?: null | IOption) {
    const { onChange } = this.injected;
    return onChange(option ? option.value : option);
  }

  public render () {
    const props = {
      ...this.props,
      keyBy: 'value',
      onChange: this.onChange,
    };

    return <ObjectSelect {...props} />;
  }
}

export default OptionSelect;
