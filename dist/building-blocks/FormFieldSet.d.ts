import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
import FormManager from '../utilities/FormManager';
interface IProps {
    defaults?: object;
    fieldSet: IFieldSetPartial;
    form: any;
    formManager: FormManager;
    model?: any;
}
declare class FormFieldSet extends Component<IProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    render(): JSX.Element | null;
}
export default FormFieldSet;
