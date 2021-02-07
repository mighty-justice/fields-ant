import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import ObjectSelect, { IObjectSelectProps } from './ObjectSelect';

@autoBindMethods
@observer
class OptionSelect extends Component<IObjectSelectProps> {
  public render() {
    return <ObjectSelect {...this.props} keyBy="value" />;
  }
}

export default OptionSelect;
