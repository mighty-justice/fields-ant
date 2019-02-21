import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { pick } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';

import {
  FormManager,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import ObjectSearch from './ObjectSearch';

const MIN_SEARCH_LENGTH = 3;

export interface IObjectSearchCreateProps {
  buttonProps: ButtonProps;
  decoratorOptions: { [key: string]: any };
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: <T>(component: T) => T;
  formManager: FormManager;
  selectProps: SelectProps;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
  @observable private isAddingNew = new SmartBool();
  @observable private search = '';

  private get injected () {
    return this.props as IObjectSearchCreateProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private get buttonProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.buttonProps as ButtonProps, ['children', 'icon']);
  }

  private get objectSearchProps () {
    return pick(this.props, [
      'fieldConfig',
      'selectProps',
    ]);
  }

  private async handleSearch (value: string) {
    this.search = value;
  }

  public render () {
    const {
      decoratorOptions,
      fieldConfig,
      formManager,
    } = this.injected;

    if (this.isAddingNew.isTrue) {
      return (
        <>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            formManager={formManager}
            id={fieldConfig.field}
            label={this.fieldConfig.label}
            search={this.search}
          />
          <Antd.Button size='small' onClick={this.isAddingNew.setFalse}>
            <Antd.Icon type='left' /> Back to search
          </Antd.Button>
        </>
      );
    }

    return (
      <Antd.Form.Item>
        <Antd.Input.Group className='ant-input-group-search-create' compact>
          {formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
            <ObjectSearch
              onSearchChange={this.handleSearch}
              {...this.objectSearchProps}
            />,
          )}
          <Antd.Button
            children='Add New'
            className='osc-add-new'
            disabled={this.search.length < MIN_SEARCH_LENGTH}
            icon='plus'
            onClick={this.isAddingNew.setTrue}
            {...this.buttonProps}
          />
        </Antd.Input.Group>
      </Antd.Form.Item>
    );
  }
}

export default ObjectSearchCreate;
