import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Col, Form as AntForm } from 'antd';

import {
  DEFAULT_STATE_OPTION_TYPE,
  FormManager,
  IFieldConfig,
  IFieldConfigAddress,
  IFieldConfigPartial,
  IInjected,
  IFormFieldProps,
  NestedFieldSet,
} from '../';

import { renderLabel } from '../utilities';

import { IModel } from '../props';
import { FORM_ITEM_CLASS_NAME } from '../building-blocks/FormItem';

export interface IAddressProps {
  fieldConfig: IFieldConfigAddress;
  formManager: FormManager;
  formModel: IModel;
}

export function isTypeAddress(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigAddress {
  return fieldConfig.type === 'address';
}

const CLASS_NAME = `${FORM_ITEM_CLASS_NAME}-input-address`;

@autoBindMethods
@observer
class Address extends Component<IAddressProps> {
  private get injected() {
    return this.props as IAddressProps & IInjected & IFormFieldProps;
  }

  private get fieldSet() {
    const {
        fieldConfig: { colProps, required, stateProps, disabled },
      } = this.injected,
      defaultStateProps = { optionType: DEFAULT_STATE_OPTION_TYPE },
      passedStateProps = { ...defaultStateProps, ...stateProps };

    const fieldSet = [
      { field: 'address1', label: 'Address 1', type: 'string', required },
      { field: 'address2', label: 'Address 2', type: 'string' },
      { field: 'city', required },
      {
        field: 'state',
        required,
        showSearch: true,
        type: 'optionSelect',
        ...passedStateProps,
      },
      { field: 'zip_code', required },
    ].map(fieldConfig => ({ ...fieldConfig, disabled }));

    return fieldSet.map((addressConfig: IFieldConfigPartial) => ({ ...addressConfig, colProps }));
  }

  public render() {
    const { fieldConfig, formManager, formModel } = this.injected,
      { colProps, formItemProps } = fieldConfig,
      className = cx(FORM_ITEM_CLASS_NAME, CLASS_NAME, fieldConfig.className, formItemProps && formItemProps.className);

    return (
      <Col {...colProps}>
        <AntForm.Item className={className}>
          <NestedFieldSet
            fieldSet={this.fieldSet}
            formManager={formManager}
            formModel={formModel}
            id={fieldConfig.field}
            label={renderLabel(fieldConfig)}
          />
        </AntForm.Item>
      </Col>
    );
  }
}

export default Address;
