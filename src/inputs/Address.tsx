import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  DEFAULT_STATE_OPTION_TYPE,
  FormManager,
  IAntFormField,
  IFieldConfig,
  IFieldConfigAddress,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import { IModel } from '../props';

export interface IAddressProps {
  fieldConfig: IFieldConfigAddress;
  fieldDecorator: <T>(component: T) => T;
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
    return this.props as IAddressProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldSet () {
    const { fieldConfig: { stateProps } } = this.injected
      , defaultStateProps = { optionType: DEFAULT_STATE_OPTION_TYPE }
      , passedStateProps = {...defaultStateProps, ...stateProps };

    return [
      { field: 'address1', label: 'Address 1', type: 'string' },
      { field: 'address2', label: 'Address 2', type: 'string' },
      { field: 'city' },
      {
        field: 'state',
        showSearch: true,
        type: 'optionSelect',
        ...passedStateProps,
      },
      { field: 'zip_code' },
    ];
  }

  public render () {
    const { fieldConfig, formManager } = this.injected;

    return (
      <Antd.Col>
        <Antd.Form.Item>
          <NestedFieldSet
            fieldSet={this.fieldSet}
            formManager={formManager}
            formModel={formManager.formModel}
            id={fieldConfig.field}
            label={fieldConfig}
          />
        </Antd.Form.Item>
      </Antd.Col>
    );
  }
}

export default Address;
