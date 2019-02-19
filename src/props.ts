// Import and re-export component prop interfaces
// This cannot be re-exported from index.ts or rollup will fail
// These interfaces can be imported like so:
//
// import { IButtonToolbarProps } from '@mighty-justice/fields-ant/props';

// Lower-level building blocks and helper components
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
export { IFormDrawerProps } from './components/FormDrawer';
export { IFormModalProps } from './components/FormModal';
export { IFormProps } from './components/Form';
export { ISummaryCardProps } from './components/SummaryCard';

// Form inputs
export { IObjectSearchCreateProps } from './inputs/ObjectSearchCreate';
export { IObjectSearchProps } from './inputs/ObjectSearch';
export { IOptionSelectDisplayProps } from './inputs/OptionSelectDisplay';
export { IOptionSelectProps } from './inputs/OptionSelect';

// All below props are shared / inherited by components
// This allows us to keep the library consistent and uniform

import { IFieldSet, IFieldSetPartial } from './interfaces';

export type IClassName = any;
export type IForm = any;
export type IModel = any;
export type IValue = any;

export interface ISharedComponentProps {
  children?: React.ReactNode;
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
  defaults?: object;
  isGuarded?: boolean;
  onCancel: () => void;
  onSave: (data: object) => any | Promise<any>;
  onSuccess: () => any | Promise<any>;
  saveText: string;
}