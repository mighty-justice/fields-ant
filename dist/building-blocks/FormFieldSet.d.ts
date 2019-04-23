import { Component } from 'react';
import FormManager from '../utilities/FormManager';
import { IFieldSetPartial } from '../interfaces';
export interface IFormFieldSetProps {
    fieldSet: IFieldSetPartial;
    formManager: FormManager;
}
declare class FormFieldSet extends Component<IFormFieldSetProps> {
    readonly fieldSet: import("../interfaces").IFieldSet;
    private readonly filteredFieldConfigs;
    render(): JSX.Element | null;
}
export default FormFieldSet;
