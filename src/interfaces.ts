import { ColProps } from 'antd/lib/col';
import { ColumnProps } from 'antd/es/table';
import { RowProps } from 'antd/lib/row';

import { IForm, IModel, IValue } from './props';
import { ValidationRule as AntValidationRule } from 'antd/lib/form';

export type IFieldsValidator = (value: IValue, fieldConfig: IFieldConfig, model: IModel) => boolean;

export interface IValidationRule extends AntValidationRule {
  fieldsValidator?: IFieldsValidator;
}

interface IFieldConfigBase {
  field: string;
  type: string;

  // Core attributes
  className?: string; // Applied on the Antd.Form.Item
  label: string | null;
  nullify: boolean;
  render: (value: IValue, fieldConfig: IFieldConfig, model: IModel) => React.ReactNode;
  showLabel: boolean;
  tooltip?: string;
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
  fromForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;
  icon?: string;
  required: boolean;
  toForm: (value: IValue, fieldConfig: IFieldConfig) => IValue;

  /*
  Validation rules are documented here:
  https://ant.design/components/form/#Validation-Rules
  Alternatively we support fieldsValidator defined by IFieldsValidator
  above which is much nicer than the default validator attribute
  */
  formValidationRules: { [ruleName: string]: IValidationRule };

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
  renderOption: (option: IEndpointOption) => React.ReactNode;
  renderSelected: (option: IEndpointOption) => string;
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

/*
A set of fieldConfigs, or fieldSet
Has a simple list form and a more complex object form;
Is often used throughout the library as FieldSet[]
*/
export type IFieldSetSimple = IFieldConfig[];

export interface IFieldSetComplex {
  fields: IFieldSetSimple;
  legend: string;
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
export type IFieldConfigPartial = Partial<IFieldConfig> & { field: string; };
export type IFieldSetSimplePartial = IFieldConfigPartial[];
export type IFieldSetPartial = IFieldSetSimplePartial | IFieldSetComplexPartial;

export interface IFieldSetComplexPartial {
  fields: IFieldSetSimplePartial;
  legend: string;
  rowProps?: RowProps;
  tooltip?: string;
}

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
}
