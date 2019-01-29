import { ColProps } from 'antd/lib/col';
import { RowProps } from 'antd/lib/row';

// This defines the core common interface for Mighty fields
//
// This excludes all fields used only by a single type ( see below )
// It also will almost never be written out by a user, since it's
// much easier to call a function to fill in a partial definition
// than to fill all this in (see further below for partials).
interface IFieldConfigBase {
  className?: any;
  colProps?: ColProps;
  disabled: boolean;
  editComponent: any;
  editProps: { [key: string]: any };
  field: string;
  fieldConfigProp: boolean;
  formItemProps?: { [key: string]: any };
  formValidationRules: { [ruleName: string]: { [attribute: string]: any } };
  fromForm: (value: any) => any;
  icon?: string;
  insertIf?: (model: any) => boolean;
  key: string;
  label: string | null;
  nullify: boolean;
  populateFromSearch: boolean;
  populateNameFromSearch: boolean;
  readOnly: boolean;
  render: (...args: any[]) => string | JSX.Element | JSX.Element[];
  required: boolean;
  showLabel: boolean;
  toForm: (data: any, field: string) => any;
  type: string;
  value?: string | number;
  writeOnly: boolean;
}

export interface IAntFormField {
  id: string;
  onChange: (value: any) => void;
  value: any;
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

export interface IFieldSetComplexPartial {
  fields: IFieldSetSimplePartial;
  legend: string;
}

// fieldSets: IFieldSet[]
export type IFieldSet = IFieldSetSimple | IFieldSetComplex;

// fillInFieldSets(fieldSets: IFieldSetPartial[]): IFieldSet[] {
export type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;

// <Card cardConfig={{ fieldSets, title }} />
export interface ICardConfig {
  accessor?: string;
  classNameSuffix?: string;
  fieldSets: IFieldSet[] | IFieldSetPartial[];
  isArray?: boolean;
  title?: string;
}

export type IGetOptions = (optionType: string) => IOption[];

export interface IInjected {
  getEndpoint: (endpoint: string) => Promise<any>;
  getOptions: IGetOptions;
}

export interface IInputProps {
  fieldConfig: IFieldConfig;
  form: any;
}
