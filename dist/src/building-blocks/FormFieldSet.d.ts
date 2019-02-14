import { Component } from 'react';
import FormManager from '../utilities/FormManager';
import { IFieldSetPartial } from '../interfaces';
import { IForm, IModel } from '../props';
export interface IFormFieldSetProps {
    defaults?: object;
    fieldSet: IFieldSetPartial;
    form: IForm;
    formManager: FormManager;
    model?: IModel;
}
declare class FormFieldSet extends Component<IFormFieldSetProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    render(): JSX.Element | null;
}
export default FormFieldSet;
