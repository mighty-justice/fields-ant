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
import { FieldData } from 'rc-field-form/es/interface';

import {
  CLASS_PREFIX,
  fillInFieldConfig,
  FormManager,
  getFieldSetFields,
  IAntFormField,
  IEndpointOption,
  IFieldConfig,
  IFieldConfigObjectSearchCreate,
  IFormFieldProps,
  IInjected,
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

function createFieldAntName(fieldConfig: IFieldConfig, createField: IFieldConfig): string[] {
  return [...fieldConfig.name, ...createField.name];
}

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

  private get createFields(): IFieldConfig[] {
    return getFieldSetFields(this.fieldConfig.createFields).map(createField => fillInFieldConfig(createField));
  }

  private async onAddNew(search: string) {
    const { onAddNewToggle, formManager, fieldConfig } = this.injected;
    this.search = search;

    const createFieldsToDefaults: FieldData[] = this.createFields.map(createField => ({
        name: createFieldAntName(fieldConfig, createField),
        value: formManager.getDefaultValue(createField),
      })),
      mainFieldAsEmptyObject = { name: fieldConfig.name, value: {} };

    formManager.form.setFields([mainFieldAsEmptyObject, ...createFieldsToDefaults]);

    this.isAddingNew.setTrue();
    if (onAddNewToggle) {
      onAddNewToggle(true);
    }
  }

  private async onSearch() {
    const { onAddNewToggle, formManager, fieldConfig } = this.injected;

    const createFieldsToUndefined: FieldData[] = this.createFields.map(createField => ({
        name: createFieldAntName(fieldConfig, createField),
        value: undefined,
      })),
      mainFieldToDefaultValue = { name: fieldConfig.name, value: formManager.getDefaultValue(fieldConfig) };

    formManager.form.setFields([...createFieldsToUndefined, mainFieldToDefaultValue]);

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
    const { fieldConfig, formManager, formModel, onChange, disabled } = this.injected,
      {
        addNewContent,
        debounceWait,
        isOptionDisabled,
        loadingIcon,
        noSearchContent,
        searchIcon,
        searchOnEmpty,
        selectProps,
      } = this.props,
      // Technically ObjectSearch does not take this prop, it's usually "injected" by FormItem
      overrideDisabled: any = { disabled };

    return (
      <FormItem fieldConfig={fieldConfig} formManager={formManager} formModel={formModel}>
        <ObjectSearch
          {...overrideDisabled}
          addNewContent={addNewContent}
          debounceWait={debounceWait}
          fieldConfig={fieldConfig}
          isOptionDisabled={isOptionDisabled}
          loadingIcon={loadingIcon}
          noSearchContent={noSearchContent}
          onAddNew={this.onAddNew}
          onChange={onChange}
          searchIcon={searchIcon}
          searchOnEmpty={searchOnEmpty}
          selectProps={selectProps}
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
