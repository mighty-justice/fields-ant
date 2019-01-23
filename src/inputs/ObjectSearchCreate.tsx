import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import SmartBool from '@mighty-justice/smart-bool';
import { toKey } from '@mighty-justice/utils';

import * as Antd from 'antd';

import {
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

const MIN_SEARCH_LENGTH = 3;

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IInputProps> {
  @observable private isAddingNew = new SmartBool();
  @observable private options: Array<{ id: string, name: string }> = [];
  @observable private search = '';

  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
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
    this.isAddingNew.setTrue();
  }

  private onChange (value: any) {
    const foundOption = this.options.find(option => option.id === value.key);
    this.injected.onChange(toJS(foundOption));
  }

  public render () {
    const { id, form } = this.injected;

    if (this.isAddingNew.isTrue) {
      return (
        <>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            id={id}
            setFields={form.setFields}
          />
          <Antd.Button size='small' onClick={this.isAddingNew.setFalse}>
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
          className='osc-add-new'
          disabled={this.search.length < MIN_SEARCH_LENGTH}
          icon='plus'
          onClick={this.addNew}
        >
          Add New
        </Antd.Button>
      </Antd.Input.Group>
    );
  }
}

export default ObjectSearchCreate;
