import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Card as AntCard } from 'antd';

import { CLASS_PREFIX } from '../consts';
import { cardPropsDefaults, formPropsDefaults } from '../propsDefaults';
import { ISharedFormProps } from '../props';

import { ICardProps } from './Card';
import Form from './Form';

export interface IFormCardProps extends ISharedFormProps, ICardProps {}

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public static defaultProps = {
    ...formPropsDefaults,
    ...cardPropsDefaults,
  };

  public render() {
    const { bordered, className, isLoading } = this.props,
      cardClassName = cx(`${CLASS_PREFIX}-card`, className),
      { title, renderTopRight, ...passDownProps } = this.props;

    return (
      <AntCard
        bordered={bordered}
        className={cardClassName}
        loading={isLoading}
        title={title}
        extra={renderTopRight && renderTopRight()}
      >
        <Form {...passDownProps} />
      </AntCard>
    );
  }
}

export default FormCard;
