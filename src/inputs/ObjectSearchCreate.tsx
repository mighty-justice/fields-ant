import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import SmartBool from '@mighty-justice/smart-bool';
import { toKey } from '@mighty-justice/utils';

import * as Antd from 'antd';

import {
  FormFieldSet,
  IAntFormField,
  IFieldConfig,
  IFieldConfigObjectSearchCreate,
} from '../';

interface IProps {
  fieldConfig: IFieldConfig;
  form: any;
}

interface IInjected extends IProps, IAntFormField {
  getEndpoint: (endpoint: string) => Promise<any>;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IProps> {
  @observable private search = '';
  @observable private options: any[] = [];
  @observable private isAddingNew = new SmartBool();
  @observable private AddNewForm: any;

  public constructor (props: IProps) {
    super(props);
    this.AddNewForm = Antd.Form.create({ onValuesChange: this.onCreateValuesChange })(FormFieldSet);
  }

  private get injected () {
    return this.props as IInjected;
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
    this.options = response.results.map((option: any) => ({ name: option.name, value: option.id }));
  }

  private addNew () {
    this.isAddingNew.setTrue();
  }

  private onCreateValuesChange (_props: any, _changedValues: any, allValues: any) {
    const onChange = this.injected.onChange;
    if (onChange) { onChange(allValues); }
  }

  public render () {
    if (this.isAddingNew.isTrue) {
      return (
        <>
          <this.AddNewForm fieldSet={this.fieldConfig.createFields} />
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
          labelInValue
          onSearch={this.handleSearch}
          placeholder='Select existing'
          showSearch
          {...omit(this.props, ['value', 'getEndpoint'])}
        >
          {this.options.map(option => (
            <Antd.Select.Option value={option.value} key={option.value}>{option.name}</Antd.Select.Option>
          ))}
        </Antd.Select>
        <Antd.Button
          disabled={this.search.length < 3}
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
