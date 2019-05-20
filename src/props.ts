// Import and re-export component prop interfaces
// This cannot be re-exported from index.ts or rollup will fail
// These interfaces can be imported like so:
//
// import { IButtonToolbarProps } from '@mighty-justice/fields-ant/props';

// Lower-level building blocks and helper components
import { IBackendValidation } from './utilities/FormManager';

export { IButtonToolbarProps } from './building-blocks/ButtonToolbar';
export { ICardFieldProps } from './building-blocks/CardField';
export { ICardFieldSetProps } from './building-blocks/CardFieldSet';
export { IFormFieldProps } from './building-blocks/FormField';
export { IFormFieldSetProps } from './building-blocks/FormFieldSet';
export { INestedFieldSetProps } from './building-blocks/NestedFieldSet';

// Components
export { IArrayCardProps } from './components/ArrayCard';
export { ICardProps } from './components/Card';
export { IEditableArrayCardProps } from './components/EditableArrayCard';
export { IEditableCardProps } from './components/EditableCard';
export { IFormCardProps } from './components/FormCard';
export { IFormProps } from './components/Form';
export { ISummaryCardProps } from './components/SummaryCard';

// Form inputs
export { IObjectSearchCreateProps } from './inputs/ObjectSearchCreate';
export { IOptionSelectDisplayProps } from './inputs/OptionSelectDisplay';
export { IOptionSelectProps } from './inputs/OptionSelect';

// All below props are shared / inherited by components
// This allows us to keep the library consistent and uniform

import { IFieldSet, IFieldSetPartial } from './interfaces';
import SmartBool from '@mighty-justice/smart-bool';
import React from 'react';

export type IClassName = any;
export type IForm = any;
export type IValue = any;

export interface IModel {
  [key: string]: any;
  id?: string;
}

export interface ISharedComponentProps {
  children?: React.ReactNode;
  className?: string;
  classNameSuffix?: string;
  fieldSets: IFieldSet[] | IFieldSetPartial[];
  isLoading?: boolean;
  model?: IModel;
  title?: string;
}

export interface IWrappedFormProps {
  form: IForm;
}

export interface ISharedFormProps {
  blockSubmit?: boolean;
  defaults?: object;
  isGuarded?: boolean;
  onCancel?: () => void;
  onSave: (data: object) => any | Promise<any>;
  onSuccess: () => any | Promise<any>;
  processErrors?: (errors: IBackendValidation) => IBackendValidation;
  resetOnSuccess?: boolean;
  saveText: string;
  successText?: null | string;
}

export interface ISharedFormModalProps extends ISharedComponentProps, ISharedFormProps {
  childrenBefore?: React.ReactNode;
  isVisible?: SmartBool;
  width?: number | string;
}
