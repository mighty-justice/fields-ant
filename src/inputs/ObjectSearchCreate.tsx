import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { ClassValue } from 'classnames/types';

import SmartBool from '@mighty-justice/smart-bool';

import { Button, Col, Form } from 'antd';
import { SelectProps } from 'antd/es/select';
import { LeftOutlined } from '@ant-design/icons';

import {
  CLASS_PREFIX,
  FormManager,
  IAntFormField,
  IEndpointOption,
  IFieldConfig,
  IFieldConfigObjectSearchCreate,
  IInjected,
  IFormFieldProps,
  NestedFieldSet,
} from '../';

import { renderLabel } from '../utilities';

import FormItem from '../building-blocks/FormItem';
import { IModel } from '../props';

import ObjectSearch from './ObjectSearch';

export function isTypeObjectSearchCreate(fieldConfig: IFieldConfig): fieldConfig is IFieldConfigObjectSearchCreate {
  return fieldConfig.type === 'objectSearchCreate';
}

export interface IObjectSearchCreateProps {
  addNewContent?: React.ReactNode;
  className?: ClassValue;
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
  selectProps: SelectProps<any>;
}

export const CLASS_NAME = `${CLASS_PREFIX}-input-object-search-create`;
export const CLASS_NAME_BTN_BACK = `${CLASS_NAME}-btn-back`;
export const CLASS_NAME_CREATING = `${CLASS_NAME}-creating`;

@autoBindMethods
@observer
class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
  @observable private isAddingNew = new SmartBool();
  @observable private search = '';

  private get injected() {
    return this.props as IObjectSearchCreateProps & IInjected & IFormFieldProps & IAntFormField;
  }

  private get fieldConfig() {
    return this.props.fieldConfig as IFieldConfigObjectSearchCreate;
  }

  private async onAddNew(search: string) {
    const { onAddNewToggle, formManager, fieldConfig } = this.injected;
    this.search = search;

    formManager.form.setFieldsValue({ [fieldConfig.field]: {} }, () => {
      this.isAddingNew.setTrue();
      if (onAddNewToggle) {
        onAddNewToggle(true);
      }
    });
  }

  private async onSearch() {
    const { onAddNewToggle, formManager, id, fieldConfig } = this.injected;
    formManager.form.setFieldsValue({ [id]: formManager.getDefaultValue(fieldConfig) });
    this.isAddingNew.setFalse();
    if (onAddNewToggle) {
      onAddNewToggle(false);
    }
  }

  private renderAddNew() {
    const { fieldConfig, formManager } = this.injected;

    return (
      <Col>
        <Form.Item>
          <NestedFieldSet
            fieldSet={this.fieldConfig.createFields}
            formManager={formManager}
            formModel={formManager.formModel}
            id={fieldConfig.field}
            label={renderLabel(this.fieldConfig)}
            search={this.search}
          />
          <Button className={CLASS_NAME_BTN_BACK} onClick={this.onSearch} size="small">
            <LeftOutlined /> Back to search
          </Button>
        </Form.Item>
      </Col>
    );
  }

  private renderSearch() {
    const { fieldConfig, formManager, formModel } = this.injected;

    return (
      <FormItem fieldConfig={fieldConfig} formManager={formManager} formModel={formModel}>
        <ObjectSearch
          {...this.props}
          {...this.injected}
          onAddNew={this.onAddNew}
        />
      </FormItem>
    );
  }

  public render() {
    const className = cx(CLASS_NAME, { [CLASS_NAME_CREATING]: this.isAddingNew.isTrue }, this.props.className);

    return (
      <div className={className}>
        {this.isAddingNew.isTrue ? this.renderAddNew() : this.renderSearch()}
        {this.props.children}
      </div>
    );
  }
}

export default ObjectSearchCreate;
