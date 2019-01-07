import { Component } from 'react';
import { IFieldConfig } from './interfaces';
interface IProps {
    defaults?: object;
    fields: IFieldConfig[];
    form: any;
    model?: any;
}
declare class FormFields extends Component<IProps> {
    private renderField;
    render(): (JSX.Element | null)[];
}
export default FormFields;
