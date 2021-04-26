import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import cx from 'classnames';

import * as Antd from 'antd';

import { CLASS_PREFIX } from '../consts';
import { cardPropsDefaults, formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps } from '../props';

import { ICardProps } from './Card';
import Form from './Form';

export interface IFormCardProps extends ISharedFormProps, ICardProps {}

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public static defaultProps: Partial<IFormCardProps> = {
    ...formPropsDefaults,
    ...cardPropsDefaults,
  };

  public render() {
    const { bordered, className, isLoading, title, renderTopRight } = this.props,
      cardClassName = cx(`${CLASS_PREFIX}-card`, className),
      HANDLED_PROPS = ['title', 'renderTopRight'];

    return (
      <Antd.Card
        bordered={bordered}
        className={cardClassName}
        loading={isLoading}
        title={title}
        extra={renderTopRight && renderTopRight()}
      >
        <Form {...omit(this.props, HANDLED_PROPS)} />
      </Antd.Card>
    );
  }
}

export default FormCard;
