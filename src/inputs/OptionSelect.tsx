import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { IInputProps } from '../interfaces';

import ObjectSelect from './ObjectSelect';

@autoBindMethods
@observer
class OptionSelect extends Component<IInputProps> {
  public render () {
    return <ObjectSelect {...this.props} keyBy='value' />;
  }
}

export default OptionSelect;
