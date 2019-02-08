import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
export interface ICardFieldProps {
    fieldConfig: IFieldConfig;
    model: {
        [key: string]: any;
    };
}
declare class CardField extends Component<ICardFieldProps> {
    render(): JSX.Element | null | undefined;
}
export default CardField;
