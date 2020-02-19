import React, { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormModal extends Component<ISharedFormModalProps> {
    private formManager?;
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    get isVisible(): boolean;
    get formProps(): Partial<Readonly<ISharedFormModalProps> & Readonly<{
        children?: React.ReactNode;
    }>>;
    onCancel(): void;
    onSuccess(): Promise<void>;
    private get modalProps();
    private setRefFormManager;
    render(): JSX.Element | null;
}
export default FormModal;
