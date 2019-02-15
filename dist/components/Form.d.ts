import { Component } from 'react';
import FormManager from '../utilities/FormManager';
import { ISharedFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
    setRefFormManager?: (formManager: FormManager) => void;
    showControls: boolean;
}
export interface IFormWrappedProps extends IFormProps, IWrappedFormProps {
}
export declare class UnwrappedForm extends Component<IFormWrappedProps> {
    private formManager;
    constructor(props: IFormWrappedProps);
    private readonly fieldSets;
    private renderControls;
    render(): JSX.Element;
}
export declare class Form extends Component<IFormProps> {
    static defaultProps: Partial<IFormWrappedProps>;
    render(): JSX.Element;
}
export default Form;
