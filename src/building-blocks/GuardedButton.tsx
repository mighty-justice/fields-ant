import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { Popconfirm, Button } from 'antd';

import { createDisabledContainer, createGuardedContainer } from '@mighty-justice/utils';

@autoBindMethods
@observer
class GuardedButton extends Component<any> {
  public guardedContainer: React.ComponentClass;

  public constructor(props: any) {
    super(props);

    const { isGuarded } = this.props,
      disabledComponent = createDisabledContainer(Button);

    this.guardedContainer = createGuardedContainer({
      disabledComponent,
      enabledComponent: Button,
      isGuarded,
    });
  }

  public render() {
    const GuardedContainer = this.guardedContainer,
      omitProps = ['isGuarded'];

    if (this.props.confirm) {
      omitProps.push('confirm');
      omitProps.push('onClick');

      return (
        <Popconfirm title="Are you sure?" onConfirm={this.props.onClick}>
          <GuardedContainer {...omit(this.props, omitProps)} />
        </Popconfirm>
      );
    }

    return <GuardedContainer {...omit(this.props, omitProps)} />;
  }
}

export default GuardedButton;
