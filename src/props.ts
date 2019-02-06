import { IFieldConfig, IFieldSet, IFieldSetPartial } from './interfaces';
import SmartBool from '@mighty-justice/smart-bool';
import FormManager from './utilities/FormManager';
import { ButtonProps } from '../node_modules/antd/lib/button';
import { IFieldConfigObjectSearchCreate } from './index';
import { SelectProps } from '../node_modules/antd/lib/select';

/*
 * Shared / Inherited
 * = = = = = = = = = =
 */

export interface ISharedComponentProps {
  fieldSets: IFieldSet[] | IFieldSetPartial[];

  children?: any;
  classNameSuffix?: string;
  model?: any;
  title?: string;
  isLoading?: boolean;
}

interface IWrappedFormProps {
  form: any;
}

interface IFormProps {
  defaults?: object;
  isGuarded?: boolean;
  saveText?: string;
  onCancel?: () => void;

  // defaultProps
  onSave: (data: object) => Promise<void>;
  onSuccess: () => Promise<any>;
}

/*
 * Components
 * = = = = = = = = =
 */

export interface ICardProps extends ISharedComponentProps {
  renderTopRight?: () => any;
}

export interface IArrayCardProps extends ICardProps {
    model: any[];
}

export interface IEditableArrayCardProps extends IArrayCardProps, IFormProps {
  defaults?: object;
  onCreate: (model: unknown) => Promise<any>;
  onDelete?: (model: unknown) => Promise<any>;
}

export interface ISummaryCardProps extends ICardProps {
  className: any;
  column: 3 | 4 | 6;
}

export interface IEditableCardProps extends ICardProps, IFormProps {
  onDelete?: (model: unknown) => Promise<any>;
}

export interface IFormCardProps extends ICardProps, IFormProps {}

export interface IFormCardWrappedProps extends IFormCardProps, IWrappedFormProps {}

export interface IFormModalProps extends ISharedComponentProps, IWrappedFormProps, IFormProps {
  childrenBefore?: any;
}

export interface IFormDrawerProps extends ISharedComponentProps, IWrappedFormProps, IFormProps {
  isVisible: SmartBool;
  width?: number | string;
}

/*
 * Building Blocks
 * = = = = = = = = =
 */

export interface INestedFieldSetProps {
  fieldSet: IFieldSetPartial;
  form: any;
  formManager: FormManager;
  id: string;
  label: string | null;
  search?: string;
}

export interface ICardFieldProps {
  fieldConfig: IFieldConfig;
  model?: any;
}

export interface IButtonToolbarProps {
  align?: 'between' | 'right';
  children?: any;
  className?: any;
  fixed?: boolean;
  noSpacing?: boolean;
}

export interface ICardFieldSetProps {
  fieldSet: IFieldSetPartial;
  idx?: number;
  model?: any;
}

export interface IFormFieldSetProps {
  defaults?: object;
  fieldSet: IFieldSetPartial;
  form: any;
  formManager: FormManager;
  model?: any;
}

export interface IFormFieldProps {
  defaults?: object;
  fieldConfig: IFieldConfig;
  form: any;
  formManager: FormManager;
  model?: any;
}

/*
 * Inputs
 * = = = = = = = = =
 */

export interface IOptionSelectProps {
  fieldConfig: IFieldConfig;
}

export interface IOptionSelectDisplayProps {
  fieldConfig: IFieldConfig;
  value: any;
}

export interface IObjectSearchCreateProps {
  buttonProps: ButtonProps;
  decoratorOptions: any;
  fieldConfig: IFieldConfigObjectSearchCreate;
  fieldDecorator: any;
  formManager: FormManager;
  selectProps: SelectProps;
}

export interface IObjectSearchProps {
  fieldConfig: IFieldConfigObjectSearchCreate;
  formManager: FormManager;
  onSearchChange: any;
  selectProps: SelectProps;
}
