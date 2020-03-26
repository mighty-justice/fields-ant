import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { pick } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';
import { SelectProps } from 'antd/es/select';

import {
  CX_PREFIX_SEARCH_CREATE,
  FormManager,
  IAntFormField,
  IEndpointOption,
  IFieldConfig,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IInputProps,
  NestedFieldSet,
} from '../';

import {
  renderLabel,
} from '../utilities';

import FormItem from '../building-blocks/FormItem';
import { IModel } from '../props';

import ObjectSearch from './ObjectSearch';

export function isTypeObjectSearchCreate (fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate {
  return fieldConfig.type === 'objectSearchCreate';
}

export interface IObjectSearchCreateProps {
  addNewContent?: React.ReactNode;
  className?: string;
  debounceWait?: number;
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: <T>(component: T) => T;
  formManager: FormManager;
  formModel: IModel;
  isOptionDisabled?: (option: IEndpointOption) => boolean;
  loadingIcon?: React.ReactNode;
  noSearchContent?: React.ReactNode;
  onAddNewToggle?: (isAddingNew: boolean) => void;
  searchIcon?: React.ReactNode;
  searchOnEmpty?: boolean;
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
      'disabled',
      'fieldConfig',
      'isOptionDisabled',
      'loadingIcon',
      'noSearchContent',
      'searchIcon',
      'searchOnEmpty',
      'selectProps',
    ]);
  }

  private async onAddNew (search: string) {
    const { onAddNewToggle, formManager, fieldConfig } = this.injected;
    this.search = search;

    formManager.form.setFieldsValue({ [fieldConfig.field]: {} }, () => {
      this.isAddingNew.setTrue();
      if (onAddNewToggle) { onAddNewToggle(true); }
    });
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
      <Antd.Col>
        <Antd.Form.Item>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            formManager={formManager}
            formModel={formManager.formModel}
            id={fieldConfig.field}
            label={renderLabel(this.fieldConfig)}
            search={this.search}
          />
          <Antd.Button
            className={`${CX_PREFIX_SEARCH_CREATE}-btn-back`}
            onClick={this.onSearch}
            size='small'
          >
            <Antd.Icon type='left' /> Back to search
          </Antd.Button>
        </Antd.Form.Item>
      </Antd.Col>
    );
  }

  private renderSearch () {
    const { fieldConfig, formManager, formModel } = this.injected;

    return (
      <FormItem
        fieldConfig={fieldConfig}
        formManager={formManager}
        formModel={formModel}
      >
        <ObjectSearch
          onAddNew={this.onAddNew}
          {...this.objectSearchProps}
        />
      </FormItem>
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
