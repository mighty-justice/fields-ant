import { Component } from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { IFormProps, ISharedComponentProps, IWrappedFormProps } from '../props';
export interface IFormDrawerProps extends ISharedComponentProps, IFormProps {
    isVisible: SmartBool;
    width?: number | string;
}
export interface IFormDrawerWrappedProps extends IFormDrawerProps, IWrappedFormProps {
}
export declare class FormDrawer extends Component<IFormDrawerProps> {
    static defaultProps: Partial<IFormDrawerProps>;
    render(): JSX.Element;
}
export default FormDrawer;
