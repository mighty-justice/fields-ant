import { Component } from 'react';
import { IFieldConfig } from './interfaces';
interface IProps {
    fieldConfig: IFieldConfig;
    model: {
        [key: string]: any;
    };
}
declare class CardRow extends Component<IProps> {
    render(): JSX.Element | null | undefined;
}
export default CardRow;
