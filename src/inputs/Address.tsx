import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  DEFAULT_STATE_OPTION_TYPE,
  FormManager,
  IFieldConfig,
  IFieldConfigAddress,
  IFieldConfigPartial,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import {
  renderLabel,
} from '../utilities';

import { IModel } from '../props';
import cx from 'classnames';

export interface IAddressProps {
  fieldConfig: IFieldConfigAddress;
  formManager: FormManager;
  formModel: IModel;
}

export function isTypeAddress (fieldConfig: IFieldConfig): fieldConfig is IFieldConfigAddress {
  return fieldConfig.type === 'address';
}

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
        fieldConfig.className,
        formItemProps && formItemProps.className,
      )
      ;

    return (
      <Antd.Col {...colProps}>
        <Antd.Form.Item className={className}>
          <NestedFieldSet
            fieldSet={this.fieldSet}
            formManager={formManager}
            formModel={formModel}
            id={fieldConfig.field}
            label={renderLabel(fieldConfig)}
          />
        </Antd.Form.Item>
      </Antd.Col>
    );
  }
}

export default Address;
