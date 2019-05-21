import { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormDrawer extends Component<ISharedFormModalProps> {
    static defaultProps: Partial<ISharedFormModalProps>;
    private onCancel;
    private onSuccess;
    render(): JSX.Element;
}
export default FormDrawer;
