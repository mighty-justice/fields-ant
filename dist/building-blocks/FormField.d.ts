import { Component } from 'react';
import FormManager from '../utilities/FormManager';
import { IFieldConfigPartial } from '../interfaces';
import { IForm, IModel } from '../props';
export interface IFormFieldProps {
    defaults?: object;
    fieldConfig: IFieldConfigPartial;
    form: IForm;
    formManager: FormManager;
    model?: IModel;
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
