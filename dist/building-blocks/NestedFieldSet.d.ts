import { Component } from 'react';
import { IFieldSetPartial } from '../';
interface IProps {
    fieldSet: IFieldSetPartial;
    id: string;
    label: string | null;
    search?: string;
    setFields: (data: {
        [id: string]: {
            errors: any;
            value: any;
        };
    }) => void;
}
declare class NestedFieldSet extends Component<IProps> {
    private NestedForm;
    private subForm;
    constructor(props: IProps);
    private readonly fieldSet;
    private readonly parentFormError;
    private readonly model;
    private onFieldsChange;
    private initializeForm;
    private setSubForm;
    render(): JSX.Element;
}
export default NestedFieldSet;
