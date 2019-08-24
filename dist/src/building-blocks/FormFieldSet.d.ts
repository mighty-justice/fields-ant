import { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';
export interface IFormFieldSetProps {
    fieldSet: IFieldSetPartial;
    formManager: FormManager;
    formModel: IModel;
}
declare class FormFieldSet extends Component<IFormFieldSetProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    render(): JSX.Element | null;
}
export default FormFieldSet;
