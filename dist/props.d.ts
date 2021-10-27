import React from 'react';
import { ClassValue } from 'classnames/types';
import SmartBool from '@mighty-justice/smart-bool';
import { IBackendValidation } from './utilities/FormManager';
import { IFieldSet, IFieldSetPartial, IFormatProps } from './interfaces';
import { FormManager } from './utilities';
export { IButtonToolbarProps } from './building-blocks/ButtonToolbar';
export { ICardFieldProps } from './building-blocks/CardField';
export { ICardFieldSetProps } from './building-blocks/CardFieldSet';
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
export declare type IValue = any;
export interface IModel {
    [key: string]: any;
    id?: string;
}
export interface ISharedComponentProps extends IFormatProps {
    children?: React.ReactNode;
    className?: ClassValue;
    classNameSuffix?: string;
    fieldSets: IFieldSet[] | IFieldSetPartial[];
    isLoading?: boolean;
    model?: IModel;
    title?: React.ReactNode;
}
export interface ISharedFormProps {
    blockSubmit?: boolean;
    cancelText: string;
    defaults?: object;
    disabled?: boolean;
    isGuarded?: boolean;
    onCancel?: () => void;
    onSave: (data: object) => any | Promise<any>;
    onSuccess?: () => any | Promise<any>;
    processErrors?: (errors: IBackendValidation) => IBackendValidation;
    resetOnSuccess?: boolean;
    saveText: string;
    setRefFormManager?: (formManager: FormManager) => void;
    successText?: null | string;
}
export interface ISharedFormModalProps extends ISharedComponentProps, ISharedFormProps {
    childrenBefore?: React.ReactNode;
    isVisible?: SmartBool;
    width?: number | string;
}
