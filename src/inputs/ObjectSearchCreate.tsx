import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { pick } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';
import { toKey } from '@mighty-justice/utils';

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

const MIN_SEARCH_LENGTH = 3;

interface IProps {
  buttonProps: ButtonProps;
  fieldConfig: IFieldConfigObjectSearchCreate;
  selectProps: SelectProps;
  formManager: FormManager;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IProps> {
  @observable private isAddingNew = new SmartBool();
  @observable private options: Array<{ id: string, name: string }> = [];
  @observable private search = '';

  private get injected () {
    return this.props as IProps & IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private get selectProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.selectProps as SelectProps, ['suffixIcon', 'clearIcon', 'removeIcon']);
  }

  private get buttonProps () {
    // Handpicking specific props to avoid unintentional behaviors
    return pick(this.props.buttonProps as ButtonProps, ['children', 'icon']);
  }

  private async handleSearch (value: string) {
    const { getEndpoint } = this.injected
      , { endpoint, searchFilters } = this.fieldConfig
      , params = {
        search: value,
        ...searchFilters,
      }
      ;

    this.search = value;
    const response = await getEndpoint(`/${endpoint}/${toKey(params)}`);
    this.options = response.results;
  }

  private addNew () {
    const { formManager, id } = this.injected;
    this.isAddingNew.setTrue();
    formManager.skipFieldDecorator.set(id, true);
  }

  private undoAddNew () {
    const { formManager, id } = this.injected;
    formManager.skipFieldDecorator.set(id, false);
    this.isAddingNew.setFalse();
  }

  private onChange (value: any) {
    const foundOption = this.options.find(option => option.id === value.key);
    this.injected.onChange(toJS(foundOption));
  }

  public render () {
    const { id, form, fieldConfig } = this.injected;

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
        <Antd.Select
          allowClear
          defaultActiveFirstOption={false}
          filterOption={false}
          id={id}
          labelInValue
          onChange={this.onChange}
          onSearch={this.handleSearch}
          placeholder='Select existing'
          showSearch
          {...this.selectProps}
        >
          {this.options.map(option => (
            <Antd.Select.Option
              key={option.id}
              value={option.id}
            >
              {option.name}
            </Antd.Select.Option>
          ))}
        </Antd.Select>
        <Antd.Button
          icon='plus'
          children='Add New'
          className='osc-add-new'
          disabled={this.search.length < MIN_SEARCH_LENGTH}
          onClick={this.addNew}
          {...this.buttonProps}
        />
      </Antd.Input.Group>
    );
  }
}

export default ObjectSearchCreate;
