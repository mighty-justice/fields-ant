// This defines the core common interface for mighty fields
//
// This excludes all fields used only by a single type ( see below )
// It also will almost never be written-out by a user, since it's
// much easier to call a function to fill in a partial definition
// than to fill all this in (see further below for partials).
interface IFieldConfigUniversal {
  className?: any;
  disabled?: boolean;
  editComponent: any;
  editProps: { [key: string]: any };
  field: string;
  fieldConfigProp: boolean;
  filterIf: { [key: string]: boolean };
  icon?: string;
  key: string;
  label: string | null;
  nullify: boolean;
  readOnly: boolean;
  render: (...args: any[]) => string | JSX.Element | JSX.Element[];
  required: boolean;
  showLabel: boolean;
  type: string;
  writeOnly?: boolean;
}

// These only work on V2 or CoOp but not both
// Some should be made universal. Some should be removed.
interface IFieldConfigBase extends IFieldConfigUniversal {
  formValidationRules: any[];
  fromForm: (value: any) => any;
  toForm: (data: any, field: string) => any;
  value?: string | number;
}

/*
  FIELD CONFIG: SINGLE-TYPE DEFINITIONS
*/
export interface IFieldConfigOptionSelect extends IFieldConfigBase {
  getOptions: (optionType: string) => Array<{ value: string, name: string }>;
  options: Array<{ value: string, name: string }>;
  optionType: string;
}

/*
  END SINGLE-TYPE DEFINITIONS
*/

// These combine to form the core building block, the fieldConfig:
export type IFieldConfig = IFieldConfigBase
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
