import React, { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormDrawer extends Component<ISharedFormModalProps> {
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    get isVisible(): boolean;
    get formProps(): Partial<Readonly<ISharedFormModalProps> & Readonly<{
        children?: React.ReactNode;
    }>>;
    onCancel(): void;
    onSuccess(): Promise<void>;
    render(): JSX.Element | null;
}
export default FormDrawer;
