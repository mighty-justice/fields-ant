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

interface IProps {
  buttonProps: ButtonProps;
  decoratorOptions: any;
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: any;
  formManager: FormManager;
  selectProps: SelectProps;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IProps> {
  @observable private isAddingNew = new SmartBool();
  @observable private search = '';

  private get injected () {
    return this.props as IProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private get buttonProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.buttonProps as ButtonProps, ['children', 'icon']);
  }

  private async handleSearch (value: string) {
    this.search = value;
  }

  private addNew () {
    this.isAddingNew.setTrue();
  }

  private undoAddNew () {
    this.isAddingNew.setFalse();
  }

  public render () {
    const { form, fieldConfig, decoratorOptions } = this.injected;

    if (this.isAddingNew.isTrue) {
      return (
        <>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            form={form}
            formManager={this.props.formManager}
            id={fieldConfig.field}
            label={this.fieldConfig.label}
            search={this.search}
          />
          <Antd.Button size='small' onClick={this.undoAddNew}>
            <Antd.Icon type='left' /> Back to search
          </Antd.Button>
        </>
      );
    }

    return (
      <Antd.Input.Group className='ant-input-group-search-create' compact>
        {form.getFieldDecorator(this.props.fieldConfig.field, decoratorOptions)(<ObjectSearch
          fieldConfig={this.props.fieldConfig}
          formManager={this.props.formManager}
          onSearchChange={this.handleSearch}
          selectProps={this.props.selectProps}
        />)}
        <Antd.Button
          children='Add New'
          className='osc-add-new'
          disabled={this.search.length < MIN_SEARCH_LENGTH}
          icon='plus'
          {...this.buttonProps}
          onClick={this.addNew}
        />
      </Antd.Input.Group>
    );
  }
}

export default ObjectSearchCreate;
