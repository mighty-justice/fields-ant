import { ClassValue } from 'classnames/types';

import { ColProps } from 'antd/es/col';
import { ColumnProps } from 'antd/es/table';
import { RowProps } from 'antd/es/row';
import { FormItemProps } from 'antd/es/form';
import { Rule } from 'rc-field-form/lib/interface';

import { IModel, IValue } from './props';
import { FormManager, ITableModel } from './utilities';

interface IFieldConfigBase {
  className?: ClassValue;
  colProps?: ColProps;
  disabled: boolean;
  editComponent: any;
  editProps: { [key: string]: any };
  field: string;
  fieldConfigProp: boolean;
  formItemProps?: Partial<FormItemProps>;
  formItemRenderExtra?: (value: IValue) => React.ReactNode;
  formValidationRules: { [ruleName: string]: Rule };
  fromForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
  icon?: string;
  insertIf?: (model: any) => boolean;
  key: string;
  label: string | null;
  name: string[];
  nullify: boolean;
  populateFromSearch: boolean;
  populateNameFromSearch: boolean;
  readOnly: boolean;
  render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
  required: boolean;
  showLabel: boolean;
  skipFieldDecorator: boolean;
  tableColumnProps?: Partial<ColumnProps<ITableModel>>;
  toForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
  tooltip?: string;
  type: string;
  value?: string | number | boolean;
  writeOnly: boolean;
}

export interface IAntFormField {
  disabled: boolean;
  id: string;
  onChange: (value: IValue) => void;
  value: IValue;
}

/*
  FIELD CONFIG: SINGLE-TYPE DEFINITIONS
*/
export interface IOption {
  disabled?: boolean;
  name: string;
  value: string;
}

export interface IFieldConfigOptionSelect extends IFieldConfigBase {
  getOptions?: (optionType: string) => IOption[];
  options?: IOption[];
  optionType?: string;
  showSearch?: boolean;
  sorted?: boolean;
}

export interface IFieldConfigAddress extends IFieldConfigBase {
  stateProps?: Partial<IFieldConfigOptionSelect>;
}

export interface IFieldConfigObjectSearchCreate extends IFieldConfigBase {
  createFields: IFieldSet;
  endpoint: string;
  renderOption: (option: IEndpointOption) => React.ReactNode;
  renderSelected: (option: IEndpointOption) => string;
  searchFilters?: { [key: string]: any };
}

/*
  END SINGLE-TYPE DEFINITIONS
*/

// These combine to form the core building block, the fieldConfig:
export type IFieldConfig =
  | IFieldConfigBase
  | IFieldConfigAddress
  | IFieldConfigObjectSearchCreate
  | IFieldConfigOptionSelect;

/*
A set of fieldConfigs, or fieldSet
Has a simple list form and a more complex object form;
Is often used throughout the library as FieldSet[]
*/
export type IFieldSetSimple = IFieldConfig[];

export interface IFieldSetComplex {
  fields: IFieldSetSimple;
  legend?: string;
  rowProps?: RowProps;
  tooltip?: string;
}

// fieldSets: IFieldSet[]
export type IFieldSet = IFieldSetSimple | IFieldSetComplex;

/*
Usually, you won't directly import fill interfaces. Components take partial
definitions and then fill them in with the defaults for their type. See the
utilities page for more.

fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[] {
 */
export type IFieldConfigPartial = Partial<IFieldConfig> & { field: string };
export type IFieldSetSimplePartial = IFieldConfigPartial[];
export type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;

export interface IFieldSetComplexPartial {
  fields: IFieldSetSimplePartial;
  legend?: string;
  rowProps?: RowProps;
  tooltip?: string;
}

export type IGetOptions = (optionType: string) => IOption[];

export interface IInjected {
  getEndpoint: (endpoint: string) => Promise<any>;
  getOptions: IGetOptions;
}

export interface IFormFieldProps {
  fieldConfig: IFieldConfig;
  formManager: FormManager;
  formModel: IModel;
}

export interface ICheckboxProps extends IFormFieldProps {
  description?: string;
  disabledText?: string;
}

export interface IEndpointOption {
  id: string;
}

export type ILayout = 'horizontal' | 'inline' | 'vertical';

export interface IFormatProps {
  layout?: ILayout;
  colon?: boolean;
}
