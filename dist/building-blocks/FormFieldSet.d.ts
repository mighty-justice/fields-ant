import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
interface IProps {
    defaults?: object;
    fieldSet: IFieldSetPartial;
    form: any;
    model?: any;
}
declare class FormFieldSet extends Component<IProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    render(): JSX.Element | null;
}
export default FormFieldSet;
