import { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormModal extends Component<ISharedFormModalProps> {
    private formManager?;
    static defaultProps: Partial<ISharedFormModalProps>;
    private onCancel;
    private onSuccess;
    private readonly modalProps;
    private setRefFormManager;
    render(): JSX.Element;
}
export default FormModal;
