import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { pick } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';

import {
  CX_PREFIX_SEARCH_CREATE,
  FormManager,
  IAntFormField,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import ObjectSearchCreateSearchInput from './ObjectSearchCreateSearchInput';

const MIN_SEARCH_LENGTH = 3;

export interface IObjectSearchCreateProps {
  buttonProps: ButtonProps;
  debounceWait?: number;
  decoratorOptions: { [key: string]: any };
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: <T>(component: T) => T;
  formManager: FormManager;
  loadingIcon?: React.ReactNode;
  noSearchContent?: React.ReactNode;
  searchIcon?: React.ReactNode;
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
      'debounceWait',
      'fieldConfig',
      'loadingIcon',
      'noSearchContent',
      'searchIcon',
      'selectProps',
    ]);
  }

  private async handleSearch (value: string) {
    this.search = value;
  }

  private async onSearch () {
    this.isAddingNew.setFalse();
  }

  public render () {
    const {
      decoratorOptions,
      fieldConfig,
      formManager,
    } = this.injected
    , className = cx(
      CX_PREFIX_SEARCH_CREATE,
      {[`${CX_PREFIX_SEARCH_CREATE}-create`]: this.isAddingNew.isTrue },
    );

    if (this.isAddingNew.isTrue) {
      return (
        <div className={className}>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            formManager={formManager}
            id={fieldConfig.field}
            label={this.fieldConfig.label}
            search={this.search}
          />
          <Antd.Button size='small' onClick={this.onSearch}>
            <Antd.Icon type='left' /> Back to search
          </Antd.Button>
        </div>
      );
    }

    return (
      <Antd.Form.Item className={className}>
        <Antd.Input.Group className='ant-input-group-search-create' compact>
          {formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
            <ObjectSearchCreateSearchInput
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
