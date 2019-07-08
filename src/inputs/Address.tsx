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
    return this.props as IAddressProps & IInjected & IInputProps;
  }

  private get fieldSet () {
    const { fieldConfig: { colProps, required, stateProps } } = this.injected
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
    ];

    return fieldSet.map((addressConfig: IFieldConfigPartial) => ({ ...addressConfig, colProps }));
  }

  public render () {
    const { fieldConfig, formManager } = this.injected;

    return (
      <Antd.Col>
        <Antd.Form.Item className={fieldConfig.className}>
          <NestedFieldSet
            fieldSet={this.fieldSet}
            formManager={formManager}
            formModel={formManager.formModel}
            id={fieldConfig.field}
            label={renderLabel(fieldConfig)}
          />
        </Antd.Form.Item>
      </Antd.Col>
    );
  }
}

export default Address;
