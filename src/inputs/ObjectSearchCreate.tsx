import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { pick } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';
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

export interface IObjectSearchCreateProps {
  addNewContent?: React.ReactNode;
  debounceWait?: number;
  decoratorOptions: { [key: string]: any };
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: <T>(component: T) => T;
  formManager: FormManager;
  loadingIcon?: React.ReactNode;
  noSearchContent?: React.ReactNode;
  onAddNewToggle?: (isAddingNew: boolean) => void;
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

  private get objectSearchProps () {
    return pick(this.props, [
      'addNewContent',
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

  private async onAddNew () {
    const { onAddNewToggle } = this.props;
    this.isAddingNew.setTrue();
    if (onAddNewToggle) { onAddNewToggle(true); }
  }

  private async onSearch () {
    const { onAddNewToggle } = this.props;
    this.isAddingNew.setFalse();
    if (onAddNewToggle) { onAddNewToggle(false); }
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
        {formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
          <ObjectSearchCreateSearchInput
            onAddNew={this.onAddNew}
            onSearchChange={this.handleSearch}
            {...this.objectSearchProps}
          />,
        )}
      </Antd.Form.Item>
    );
  }
}

export default ObjectSearchCreate;
