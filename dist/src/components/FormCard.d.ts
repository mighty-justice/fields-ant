import { Component } from 'react';
import { ISharedFormProps } from '../props';
import { ICardProps } from './Card';
export interface IFormCardProps extends ISharedFormProps, ICardProps {
}
export declare class FormCard extends Component<IFormCardProps> {
    static defaultProps: Partial<IFormCardProps>;
    render(): JSX.Element;
}
export default FormCard;
