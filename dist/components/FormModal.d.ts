import React from 'react';
import { ICommonCardProps } from '../interfaces';
export interface IFormModalProps extends ICommonCardProps {
    children?: any;
    childrenBefore?: any;
    defaults?: object;
    form: any;
    model?: any;
    onCancel: () => void;
    onSave: (data: object) => Promise<void>;
    saveText?: string;
}
declare const WrappedFormModal: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IFormModalProps, "title" | "children" | "model" | "fieldSets" | "onSave" | "defaults" | "onCancel" | "classNameSuffix" | "childrenBefore" | "saveText">, any>;
export default WrappedFormModal;
