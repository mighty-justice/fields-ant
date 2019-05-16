import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import * as Antd from 'antd';

import {
  createDisabledContainer,
  createGuardedContainer,
} from '@mighty-justice/utils';

@autoBindMethods
@observer
class GuardedButton extends Component<any> {
  public guardedContainer: React.ComponentClass;

  public constructor (props: any) {
    super(props);

    const { isGuarded } = this.props,
      disabledComponent = createDisabledContainer(Antd.Button);

    this.guardedContainer = createGuardedContainer({
      disabledComponent,
      enabledComponent: Antd.Button,
      isGuarded,
    });
  }

  public render () {
    const GuardedContainer = this.guardedContainer
      , omitProps = ['isGuarded'];

    if (this.props.confirm) {
      omitProps.push('confirm');
      omitProps.push('onClick');

      return (
        <Antd.Popconfirm
          title='Are you sure?'
          onConfirm={this.props.onClick}
        >
          <GuardedContainer {...omit(this.props, omitProps)} />
        </Antd.Popconfirm>
      );
    }

    return (
      <GuardedContainer {...omit(this.props, omitProps)} />
    );
  }
}

export default GuardedButton;
