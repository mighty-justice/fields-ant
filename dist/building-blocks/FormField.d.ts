import { Component } from 'react';
import FormManager from '../utilities/FormManager';
import { IFieldConfigPartial } from '../interfaces';
export interface IFormFieldProps {
    fieldConfig: IFieldConfigPartial;
    formManager: FormManager;
}
declare class FormField extends Component<IFormFieldProps> {
    private readonly fieldConfig;
    private readonly label;
    private readonly initialValue;
    private readonly editProps;
    private readonly decoratorOptions;
    render(): JSX.Element | null;
}
export default FormField;
