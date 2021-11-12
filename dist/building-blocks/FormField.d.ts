import { Component } from 'react';
import { IFormFieldProps } from '../interfaces';
declare class FormField extends Component<IFormFieldProps> {
    private get fieldConfig();
    private get editProps();
    private get shouldRender();
    render(): JSX.Element | null;
}
export default FormField;
