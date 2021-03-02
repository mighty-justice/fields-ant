import { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { FormManager } from '../utilities';
import { ISharedFormProps, ISharedComponentProps } from '../props';
export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
    setRefFormManager?: (formManager: FormManager) => void;
    showControls: boolean;
}
export interface IFormWrappedProps extends IFormProps, FormComponentProps {
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
