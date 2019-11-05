import React, { Component } from 'react';
import { Input } from 'antd';
import autoBindMethods from 'class-autobind-decorator';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { IAntFormField, IInjected, IInputProps } from '../interfaces';

@autoBindMethods
@observer
class TrimWhitespaceInput extends Component<{}> {
  @observable private value = '';

  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private onChange (e: any) {
    this.value = e.target.value.trim();
    this.injected.onChange(this.value);
  }

  public render () {
    return (
      <Input value={this.value} {...this.props} onChange={this.onChange} />
    );
  }
}

export default TrimWhitespaceInput;
