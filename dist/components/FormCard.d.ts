import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
interface IExportProps extends ICommonCardProps {
    children?: any;
    defaults?: object;
    model?: any;
    onCancel?: () => void;
    onSave: (data: object) => Promise<void>;
    renderTopRight?: () => any;
}
interface IProps extends IExportProps {
    form: any;
}
export declare class UnwrappedFormCard extends Component<IProps> {
    private formManager;
    static defaultProps: Partial<IProps>;
    constructor(props: IProps);
    private readonly fieldSets;
    render(): JSX.Element;
}
export declare class FormCard extends Component<IExportProps> {
    render(): JSX.Element;
}
export default FormCard;
