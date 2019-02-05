import { Component } from 'react';
import { IFieldSetPartial } from '../';
import FormManager from '../utilities/FormManager';
interface IProps {
    fieldSet: IFieldSetPartial;
    form: any;
    formManager: FormManager;
    id: string;
    label: string | null;
    search?: string;
}
declare class NestedFieldSet extends Component<IProps> {
    constructor(props: IProps);
    private readonly fieldSet;
    private readonly model;
    render(): JSX.Element;
}
export default NestedFieldSet;
