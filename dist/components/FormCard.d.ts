import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IExportProps {
    cardConfig: ICardConfig;
    children?: any;
    close?: () => void;
    defaults?: object;
    model?: any;
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
