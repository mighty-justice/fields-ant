import React from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
export interface IFormDrawerProps extends ISharedComponentProps, IWrappedFormProps, IFormProps {
    isVisible: SmartBool;
    width?: number | string;
}
declare const FormDrawer: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IFormDrawerProps, "title" | "children" | "width" | "isGuarded" | "model" | "fieldSets" | "onSave" | "onSuccess" | "defaults" | "classNameSuffix" | "isLoading" | "onCancel" | "saveText" | "isVisible">, any>;
export default FormDrawer;
