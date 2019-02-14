import { Component } from 'react';
import { IFormProps, IWrappedFormProps } from '../props';
import { ICardProps } from './Card';
export interface IFormCardProps extends IFormProps, ICardProps {
}
export interface IFormCardWrappedProps extends IFormCardProps, IWrappedFormProps {
}
export declare class UnwrappedFormCard extends Component<IFormCardWrappedProps> {
    private formManager;
    static defaultProps: Partial<IFormCardWrappedProps>;
    constructor(props: IFormCardWrappedProps);
    private readonly fieldSets;
    render(): JSX.Element;
}
export declare class FormCard extends Component<IFormCardProps> {
    static defaultProps: Partial<IFormCardWrappedProps>;
    render(): JSX.Element;
}
export default FormCard;
