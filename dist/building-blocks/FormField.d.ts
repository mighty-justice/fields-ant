import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
interface IProps {
    defaults?: object;
    fieldConfig: IFieldConfig;
    form: any;
    model?: any;
}
declare class FormField extends Component<IProps> {
    render(): JSX.Element | null;
}
export default FormField;
