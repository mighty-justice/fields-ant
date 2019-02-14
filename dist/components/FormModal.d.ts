import React, { Component } from 'react';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
export interface IFormModalProps extends ISharedComponentProps, IFormProps {
    childrenBefore?: React.ReactNode;
}
export interface IFormModalWrappedProps extends IFormModalProps, IWrappedFormProps {
}
export declare class FormModal extends Component<IFormModalProps> {
    static defaultProps: Partial<IFormModalProps>;
    render(): JSX.Element;
}
export default FormModal;
