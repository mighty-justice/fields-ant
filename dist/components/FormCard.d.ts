import { Component } from 'react';
import { ISharedFormProps } from '../props';
import { ICardProps } from './Card';
export interface IFormCardProps extends ISharedFormProps, ICardProps {
}
export declare class FormCard extends Component<IFormCardProps> {
    static defaultProps: {
        bordered: boolean;
        cancelText: string;
        onSave: () => Promise<void>;
        saveText: string;
    };
    render(): JSX.Element;
}
export default FormCard;
