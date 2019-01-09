import React from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { IFieldSet } from '../';
interface IProps {
    fieldSets: IFieldSet[];
    form: any;
    isVisible: SmartBool;
    model?: any;
    onSave: (args: any) => Promise<void>;
    onSuccess?: (args?: any) => void;
    title: string;
}
declare const FormDrawer: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IProps, "title" | "isVisible" | "model" | "fieldSets" | "onSave" | "onSuccess">, any>;
export default FormDrawer;
