import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Col, Form } from 'antd';

import { DEFAULT_STATE_OPTION_TYPE } from '../consts';
import FormManager from '../utilities/FormManager';
import { IFieldConfigAddress, IFieldConfigPartial, IInjected, IInputProps } from '../interfaces';
import NestedFieldSet from '../building-blocks/NestedFieldSet';

import { renderLabel } from '../utilities/common';

import { IModel } from '../props';
import { FORM_ITEM_CLASS_NAME } from '../building-blocks/FormItem';

export interface IAddressProps {
  fieldConfig: IFieldConfigAddress;
  formManager: FormManager;
  formModel: IModel;
}

const CLASS_NAME = `${FORM_ITEM_CLASS_NAME}-input-address`;

@autoBindMethods
@observer
class Address extends Component<IAddressProps> {
  private get injected () {
    return this.props as IAddressProps & IInjected & IInputProps;
  }

  private get fieldSet () {
    const { fieldConfig: { colProps, required, stateProps, disabled } } = this.injected
      , defaultStateProps = { optionType: DEFAULT_STATE_OPTION_TYPE }
      , passedStateProps = { ...defaultStateProps, ...stateProps };

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

  public render () {
    const { fieldConfig, formManager, formModel } = this.injected
      , { colProps, formItemProps } = fieldConfig
      , className = cx(
        FORM_ITEM_CLASS_NAME,
        CLASS_NAME,
        fieldConfig.className,
        formItemProps && formItemProps.className,
      )
      ;

    return (
      <Col {...colProps}>
        <Form.Item className={className}>
          <NestedFieldSet
            fieldSet={this.fieldSet}
            formManager={formManager}
            formModel={formModel}
            id={fieldConfig.field}
            label={renderLabel(fieldConfig)}
          />
        </Form.Item>
      </Col>
    );
  }
}

export default Address;
