import { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';
export interface IFormFieldProps {
    fieldConfig: IFieldConfigPartial;
    formManager: FormManager;
    formModel: IModel;
}
declare class FormField extends Component<IFormFieldProps> {
    private readonly fieldConfig;
    private readonly editProps;
    private readonly shouldRender;
    render(): JSX.Element | null;
}
export default FormField;
