import React from 'react';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
export interface IFormModalProps extends ISharedComponentProps, IWrappedFormProps, IFormProps {
    childrenBefore?: React.ReactNode;
}
declare const WrappedFormModal: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IFormModalProps, "title" | "children" | "isGuarded" | "model" | "fieldSets" | "onSave" | "onSuccess" | "defaults" | "classNameSuffix" | "isLoading" | "onCancel" | "saveText" | "childrenBefore">, any>;
export default WrappedFormModal;
