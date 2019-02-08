import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
import FormManager from '../utilities/FormManager';
export interface IFormFieldProps {
    defaults?: object;
    fieldConfig: IFieldConfig;
    form: any;
    formManager: FormManager;
    model?: any;
}
declare class FormField extends Component<IFormFieldProps> {
    private readonly label;
    private readonly initialValue;
    private readonly editProps;
    private readonly decoratorOptions;
    render(): JSX.Element | null;
}
export default FormField;
