import React from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { IFieldSetPartial } from '../';
export interface IFormDrawerProps {
    defaults?: object;
    fieldSets: IFieldSetPartial[];
    form: any;
    isVisible: SmartBool;
    model?: any;
    onSave: (args: any) => Promise<void>;
    onSuccess?: (args?: any) => void;
    title: string;
    width?: number | string;
}
declare const FormDrawer: React.ComponentClass<import("antd/lib/form/Form").RcBaseFormProps & Pick<IFormDrawerProps, "title" | "width" | "model" | "fieldSets" | "onSave" | "onSuccess" | "defaults" | "isVisible">, any>;
export default FormDrawer;
