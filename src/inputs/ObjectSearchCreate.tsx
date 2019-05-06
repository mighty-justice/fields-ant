import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
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
  IFieldConfig,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import ObjectSearch from './ObjectSearch';

export function isTypeObjectSearchCreate (fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate {
  return fieldConfig.type === 'objectSearchCreate';
}

export interface IObjectSearchCreateProps {
  addNewContent?: React.ReactNode;
  className?: string;
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

  private async onAddNew (search: string) {
    const { onAddNewToggle, formManager, id } = this.injected;
    this.search = search;
    formManager.form.setFieldsValue({ [id]: {} });
    this.isAddingNew.setTrue();
    if (onAddNewToggle) { onAddNewToggle(true); }
  }

  private async onSearch () {
    const { onAddNewToggle, formManager, id, fieldConfig } = this.injected;
    formManager.form.setFieldsValue({ [id]: formManager.getDefaultValue(fieldConfig) });
    this.isAddingNew.setFalse();
    if (onAddNewToggle) { onAddNewToggle(false); }
  }

  private renderAddNew () {
    const { fieldConfig, formManager } = this.injected;

    return (
      <>
        <NestedFieldSet
          fieldSet={this.fieldConfig.createFields}
          formManager={formManager}
          id={fieldConfig.field}
          label={this.fieldConfig.label}
          search={this.search}
        />
        <Antd.Button
          className={`${CX_PREFIX_SEARCH_CREATE}-btn-back`}
          onClick={this.onSearch}
          size='small'
        >
          <Antd.Icon type='left' /> Back to search
        </Antd.Button>
      </>
    );
  }

  private renderSearch () {
    const { decoratorOptions, fieldConfig, formManager } = this.injected;

    return (
      <Antd.Form.Item>
        {formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
          <ObjectSearch
            onAddNew={this.onAddNew}
            {...this.objectSearchProps}
          />,
        )}
      </Antd.Form.Item>
    );
  }

  public render () {
    const className = cx(
      CX_PREFIX_SEARCH_CREATE,
      {[`${CX_PREFIX_SEARCH_CREATE}-create`]: this.isAddingNew.isTrue },
      this.props.className,
    );

    return (
      <div className={className}>
        {
          this.isAddingNew.isTrue
            ? this.renderAddNew()
            : this.renderSearch()
        }
        {this.props.children}
      </div>
    );
  }
}

export default ObjectSearchCreate;
