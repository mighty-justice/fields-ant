import { Component } from 'react';
import { WrappedFormInternalProps } from '@ant-design/compatible/lib/form/Form';
import { ISharedFormProps, ISharedComponentProps } from '../props';
export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
    showControls: boolean;
}
export interface IFormWrappedProps extends IFormProps, WrappedFormInternalProps {
}
export declare class UnwrappedForm extends Component<IFormWrappedProps> {
    private formManager;
    constructor(props: IFormWrappedProps);
    private onSuccess;
    private get fieldSets();
    private renderControls;
    render(): JSX.Element;
}
export declare class Form extends Component<IFormProps> {
    static defaultProps: Partial<IFormWrappedProps>;
    render(): JSX.Element;
}
export default Form;
