import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface IFormCardProps extends ICommonCardProps {
    children?: any;
    defaults?: object;
    isLoading?: boolean;
    model?: any;
    onCancel?: () => void;
    onSave: (data: object) => Promise<void>;
    renderTopRight?: () => any;
}
interface IProps extends IFormCardProps {
    form: any;
}
export declare class UnwrappedFormCard extends Component<IProps> {
    private formManager;
    static defaultProps: Partial<IProps>;
    constructor(props: IProps);
    private readonly fieldSets;
    render(): JSX.Element;
}
export declare class FormCard extends Component<IFormCardProps> {
    render(): JSX.Element;
}
export default FormCard;
