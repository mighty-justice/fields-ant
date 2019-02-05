import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
interface IProps {
    defaults?: object;
    fieldConfig: IFieldConfig;
    form: any;
    model?: any;
}
declare class FormField extends Component<IProps> {
    private readonly label;
    private readonly initialValue;
    private readonly editProps;
    private readonly decoratorOptions;
    render(): JSX.Element | null;
}
export default FormField;
