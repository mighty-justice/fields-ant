import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import {
  FormManager,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import { IModel } from '../props';

export interface IAddressProps {
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: <T>(component: T) => T;
  formManager: FormManager;
  formModel: IModel;
}

@autoBindMethods
@observer
class Address extends Component<IAddressProps> {
  @observable private search = '';

  private get injected () {
    return this.props as IAddressProps & IInjected & IInputProps & IAntFormField;
  }

  public render () {
    const { fieldConfig, formManager } = this.injected;

    return (
      <Antd.Col>
        <Antd.Form.Item>
          <NestedFieldSet
            fieldSet={fieldConfig.createFields}
            formManager={formManager}
            formModel={formManager.formModel}
            id={fieldConfig.field}
            label={fieldConfig}
            search={this.search}
          />
        </Antd.Form.Item>
      </Antd.Col>
    );
  }
}

export default Address;
