import React from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { IFieldSetPartial } from '../';
interface IProps {
    fieldSets: IFieldSetPartial[];
    form: any;
    isVisible: SmartBool;
    model?: any;
    onSave: (args: any) => Promise<void>;
    onSuccess?: (args?: any) => void;
    title: string;
}
declare const FormDrawer: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IProps, "title" | "model" | "fieldSets" | "onSave" | "onSuccess" | "isVisible">, any>;
export default FormDrawer;
