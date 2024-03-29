import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';

import { Input } from 'antd';

import { IAntFormField, IInjected, IFormFieldProps } from '../interfaces';

@autoBindMethods
@observer
class TrimWhitespaceInput extends Component<{}> {
  @observable private value = '';

  private get injected() {
    return this.props as IInjected & IFormFieldProps & IAntFormField;
  }

  private onChange(e: any) {
    this.value = e.target.value.trim();
    this.injected.onChange(this.value);
  }

  public render() {
    return <Input value={this.value} {...this.props} onChange={this.onChange} />;
  }
}

export default TrimWhitespaceInput;
