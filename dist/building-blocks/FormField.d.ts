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
    private get fieldConfig();
    private get editProps();
    private get shouldRender();
    render(): JSX.Element | null;
}
export default FormField;
