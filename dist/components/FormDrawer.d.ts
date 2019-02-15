import { Component } from 'react';
import SmartBool from '@mighty-justice/smart-bool';
import { ISharedFormProps, ISharedComponentProps } from '../props';
export interface IFormDrawerProps extends ISharedComponentProps, ISharedFormProps {
    isVisible: SmartBool;
    width?: number | string;
}
declare class FormDrawer extends Component<IFormDrawerProps> {
    static defaultProps: Partial<IFormDrawerProps>;
    private onCancel;
    render(): JSX.Element;
}
export default FormDrawer;
