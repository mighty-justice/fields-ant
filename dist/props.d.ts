import { IBackendValidation } from './utilities/FormManager';
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
export { IFormProps } from './components/Form';
export { ISummaryCardProps } from './components/SummaryCard';
export { IObjectSearchCreateProps } from './inputs/ObjectSearchCreate';
export { IOptionSelectDisplayProps } from './inputs/OptionSelectDisplay';
export { IObjectSelectProps } from './inputs/ObjectSelect';
import { IFieldSet, IFieldSetPartial } from './interfaces';
import SmartBool from '@mighty-justice/smart-bool';
import React from 'react';
export declare type IClassName = any;
export declare type IForm = any;
export declare type IValue = any;
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
    cancelText: string;
    defaults?: object;
    isGuarded?: boolean;
    onCancel?: () => void;
    onSave: (data: object) => any | Promise<any>;
    onSuccess?: () => any | Promise<any>;
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
