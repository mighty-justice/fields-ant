import React, { Component } from 'react';
import { ISharedFormProps, ISharedComponentProps } from '../props';
export interface IFormModalProps extends ISharedComponentProps, ISharedFormProps {
    childrenBefore?: React.ReactNode;
}
declare class FormModal extends Component<IFormModalProps> {
    private formManager?;
    static defaultProps: Partial<IFormModalProps>;
    private readonly modalProps;
    private setRefFormManager;
    render(): JSX.Element;
}
export default FormModal;
