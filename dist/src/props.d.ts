/// <reference types="react" />
export { IButtonToolbarProps } from './building-blocks/ButtonToolbar';
export { ICardFieldProps } from './building-blocks/CardField';
export { ICardFieldSetProps } from './building-blocks/CardFieldSet';
export { IFormFieldProps } from './building-blocks/FormField';
export { IFormFieldSetProps } from './building-blocks/FormFieldSet';
export { INestedFieldSetProps } from './building-blocks/NestedFieldSet';
export { IArrayCardProps } from './components/ArrayCard';
export { ICardProps } from './components/Card';
export { IEditableArrayCardProps } from './components/EditableArrayCard';
export { IEditableCardProps } from './components/EditableCard';
export { IFormCardProps } from './components/FormCard';
export { IFormDrawerProps } from './components/FormDrawer';
export { IFormModalProps } from './components/FormModal';
export { ISummaryCardProps } from './components/SummaryCard';
export { IObjectSearchCreateProps } from './inputs/ObjectSearchCreate';
export { IObjectSearchProps } from './inputs/ObjectSearch';
export { IOptionSelectDisplayProps } from './inputs/OptionSelectDisplay';
export { IOptionSelectProps } from './inputs/OptionSelect';
import { IFieldSet, IFieldSetPartial } from './interfaces';
export declare type IClassName = any;
export declare type IForm = any;
export declare type IModel = any;
export declare type IValue = any;
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
export interface IFormProps {
    defaults?: object;
    isGuarded?: boolean;
    onCancel?: () => void;
    onSave: (data: object) => Promise<void>;
    onSuccess: () => Promise<any>;
    saveText?: string;
}
