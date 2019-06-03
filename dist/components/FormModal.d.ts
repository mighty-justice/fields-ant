import React, { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormModal extends Component<ISharedFormModalProps> {
    private formManager?;
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    readonly isVisible: boolean;
    readonly formProps: Readonly<ISharedFormModalProps> & Readonly<{
        children?: React.ReactNode;
    }>;
    onCancel(): void;
    onSuccess(): Promise<void>;
    private readonly modalProps;
    private setRefFormManager;
    render(): JSX.Element | null;
}
export default FormModal;
