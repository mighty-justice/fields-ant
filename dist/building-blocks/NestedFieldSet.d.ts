import { Component } from 'react';
import { IFieldSetSimplePartial } from '../';
interface IProps {
    fieldSet: IFieldSetSimplePartial;
    id: string;
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
    private onFieldsChange;
    private initializeForm;
    private setSubForm;
    render(): JSX.Element;
}
export default NestedFieldSet;
