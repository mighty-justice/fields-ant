import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
import FormManager from '../utilities/FormManager';
export interface IFormFieldSetProps {
    defaults?: object;
    fieldSet: IFieldSetPartial;
    form: any;
    formManager: FormManager;
    model?: any;
}
declare class FormFieldSet extends Component<IFormFieldSetProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    render(): JSX.Element | null;
}
export default FormFieldSet;
