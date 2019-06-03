import React, { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormDrawer extends Component<ISharedFormModalProps> {
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    readonly isVisible: boolean;
    readonly formProps: Readonly<ISharedFormModalProps> & Readonly<{
        children?: React.ReactNode;
    }>;
    onCancel(): void;
    onSuccess(): Promise<void>;
    render(): JSX.Element | null;
}
export default FormDrawer;
