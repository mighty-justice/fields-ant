import { Component } from 'react';
import { IFieldSetPartial } from '../';
import FormManager from '../utilities/FormManager';
export interface INestedFieldSetProps {
    fieldSet: IFieldSetPartial;
    formManager: FormManager;
    id: string;
    label: string | null;
    search?: string;
}
declare class NestedFieldSet extends Component<INestedFieldSetProps> {
    private readonly fieldSet;
    private getDefaultValue;
    render(): JSX.Element;
}
export default NestedFieldSet;
