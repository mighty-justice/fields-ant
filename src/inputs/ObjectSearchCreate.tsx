import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import SmartBool from '@mighty-justice/smart-bool';

import { Button, Divider, Input, Select } from 'antd';

import { IFieldConfig, IFieldConfigObjectSearchCreate } from '../';

interface IProps {
  fieldConfig: IFieldConfig;
  form: any;
  isVisible?: any;
  label: string;
}

interface IInjected extends IProps {
  getEndpoint: (endpoint: string) => Promise<any>;
}

@inject('getEndpoint')
@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IProps> {
  @observable private options: any[] = [];
  @observable private isAddingNew = new SmartBool();

  private get injected () {
    return this.props as IInjected;
  }

  private get fieldConfig () {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private async handleSearch (value: string) {
    const { getEndpoint } = this.injected
      , { endpoint } = this.fieldConfig
      ;

    const response = await getEndpoint(`/${endpoint}/?search=${value}`);
    this.options = response.results.map((option: any) => ({name: option.name, value: option.id}));
  }

  private addNew () {
    this.isAddingNew.setTrue();
  }

  public render () {
    if (this.isAddingNew.isTrue) {
      const inputProps = omit(this.props, ['isVisible', 'fieldConfig', 'value']);
      return <Input {...inputProps} />;
    }

    return (
      <>
        <Select
          allowClear
          defaultActiveFirstOption={false}
          filterOption={false}
          labelInValue
          onSearch={this.handleSearch}
          placeholder={`Select existing ${this.props.label}`}
          showSearch
          {...omit(this.props, 'value')}
        >
          {this.options.map(option => (
            <Select.Option value={option.value} key={option.value}>{option.name}</Select.Option>
          ))}
        </Select>
        <Divider style={{ margin: '4px 0' }}>OR</Divider>
        <div style={{ padding: '8px', cursor: 'pointer'}}>
          <Button style={{ margin: '4px 0', width: '100%' }} icon='plus' onClick={this.addNew}>
            Add New {this.props.label}
          </Button>
        </div>
      </>
    );
  }
}

export default ObjectSearchCreate;
