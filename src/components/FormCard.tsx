import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import { Card } from 'antd';

import { formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps } from '../props';

import { ICardProps } from './Card';
import Form from './Form';

export interface IFormCardProps extends ISharedFormProps, ICardProps {}

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public static defaultProps: Partial<IFormCardProps> = {
    ...formPropsDefaults,
  };

  public render () {
    const { isLoading, title, renderTopRight } = this.props
      , HANDLED_PROPS = ['title', 'renderTopRight'];

    return (
      <Card loading={isLoading} title={title} extra={renderTopRight && renderTopRight()}>
        <Form {...omit(this.props, HANDLED_PROPS)} />
      </Card>
    );
  }
}

export default FormCard;
