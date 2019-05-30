import { Component } from 'react';
import { ISharedFormModalProps } from '../props';
declare class FormDrawer extends Component<ISharedFormModalProps> {
    private formModalUtils;
    constructor(props: ISharedFormModalProps);
    static defaultProps: Partial<ISharedFormModalProps>;
    render(): JSX.Element | null;
}
export default FormDrawer;
