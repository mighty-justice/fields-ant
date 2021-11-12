import { Component } from 'react';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ISharedFormProps, ISharedComponentProps } from '../props';
export interface IFormProps extends ISharedComponentProps, ISharedFormProps {
    showControls: boolean;
}
export interface IFormWrappedProps extends IFormProps {
    form: FormInstance;
}
export declare class UnwrappedForm extends Component<IFormWrappedProps> {
    private formManager;
    constructor(props: IFormWrappedProps);
    private onSuccess;
    private get fieldSets();
    private renderControls;
    render(): JSX.Element;
}
declare function Form(props: IFormProps): JSX.Element;
declare namespace Form {
    var defaultProps: {
        showControls: boolean;
        layout?: "inline" | "horizontal" | "vertical" | undefined;
        colon: boolean;
        cancelText: string;
        onSave: () => Promise<void>;
        saveText: string;
    };
}
export default Form;
