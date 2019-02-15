import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import * as Antd from 'antd';

import { formPropsDefaults } from '../propsDefaults';
import { IFormProps } from '../props';

import { ICardProps } from './Card';
import Form from './Form';

export interface IFormCardProps extends IFormProps, ICardProps {}

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public static defaultProps: Partial<IFormCardProps> = {
    ...formPropsDefaults,
  };

  public render () {
    const { isLoading, title, renderTopRight } = this.props;

    return (
      <Antd.Card loading={isLoading} title={title} extra={renderTopRight && renderTopRight()}>
        <Form {...omit(this.props, ['renderTopRight'])} />
      </Antd.Card>
    );
  }
}

export default FormCard;
