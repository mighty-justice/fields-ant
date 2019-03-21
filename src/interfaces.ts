import { ColProps } from 'antd/lib/col';
import { ColumnProps } from 'antd/es/table';
import { RowProps } from 'antd/lib/row';

import { IForm, IModel, IValue } from './props';

// This defines the core common interface for Mighty fields
//
// This excludes all fields used only by a single type ( see below )
// It also will almost never be written out by a user, since it's
// much easier to call a function to fill in a partial definition
// than to fill all this in (see further below for partials).
interface IFieldConfigBase {
  // Field is the ONLY required value of a fieldConfig
  // All other attributes below are either optional or will be filled in
  // by the component through the fillIn* functions
  //
  // Field can be any string which would be supported in lodash
  // get, like 'name', 'lawfirm.name', or 'lawfirms[0].name'
  field: string;

  // Another way of keeping fieldConfigs short are 'types' which are just
  // different sets of defaults that can be quickly applied.
  type: string;

  // Core attributes
  className?: string; // Applied on the Antd.Form.Item
  label: string | null;
  nullify: boolean;
  render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
  showLabel: boolean;
  value?: string | number;

  // Attributes for filtering this field out, in read contexts,
  // form contexts, or dynamically based on the model
  insertIf?: (model: any) => boolean;
  readOnly: boolean;
  writeOnly: boolean;

  // Attributes for controlling how fieldConfig works in form
  disabled: boolean;
  editComponent: any;
  editProps: { [key: string]: any };
  formItemProps?: { [key: string]: any };
  formValidationRules: { [ruleName: string]: { [attribute: string]: any } };
  fromForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
  icon?: string;
  required: boolean;
  toForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;

  // Attributes for controlling how fieldConfig works in table
  tableColumnProps?: Partial<ColumnProps<IModel>>;

  // These enable features in objectSearchCreate
  // explained in the documentation for that type
  populateFromSearch: boolean;
  populateNameFromSearch: boolean;

  // These are technical and you can safely ignore them
  colProps?: ColProps;
  fieldConfigProp: boolean;
  key: string;
  skipFieldDecorator: boolean;
}

export interface IAntFormField {
  id: string;
  onChange: (value: IValue) => void;
  value: IValue;
}

/*
  FIELD CONFIG: SINGLE-TYPE DEFINITIONS
*/
export interface IOption {
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

export interface IFieldConfigObjectSearchCreate extends IFieldConfigBase {
  createFields: IFieldConfigBase[];
  endpoint: string;
  searchFilters?: { [key: string]: any };
}

/*
  END SINGLE-TYPE DEFINITIONS
*/

// These combine to form the core building block, the fieldConfig:
export type IFieldConfig = IFieldConfigBase
  | IFieldConfigObjectSearchCreate
  | IFieldConfigOptionSelect
  ;

// Partial definitions passed to fillIn* functions
export type IFieldConfigPartial = Partial<IFieldConfig> & { field: string; };
export type IFieldSetSimplePartial = IFieldConfigPartial[];

// A set of fieldConfigs, or fieldSet
// Has a simple list form and a more complex object form;
// Is often used throughout the library as FieldSet[]
export type IFieldSetSimple = IFieldConfig[];

export interface IFieldSetComplex {
  fields: IFieldSetSimple;
  legend: string;
  rowProps?: RowProps;
}

// fieldSets: IFieldSet[]
export type IFieldSet = IFieldSetSimple | IFieldSetComplex;

export interface IFieldSetComplexPartial {
  fields: IFieldSetSimplePartial;
  legend: string;
  rowProps?: RowProps;
}

// fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[] {
export type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;

export type IGetOptions = (optionType: string) => IOption[];

export interface IInjected {
  getEndpoint: (endpoint: string) => Promise<any>;
  getOptions: IGetOptions;
}

export interface IInputProps {
  fieldConfig: IFieldConfig;
  form: IForm;
}

export interface IEndpointOption {
  id: string;
  name: string;
}
