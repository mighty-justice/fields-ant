import { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormModal extends Component<ISharedFormModalProps> {
    private formManager?;
    private formModalUtils;
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    private readonly modalProps;
    private setRefFormManager;
    render(): JSX.Element | null;
}
export default FormModal;
