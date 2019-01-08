import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfigs: ICardConfig[];
    isLoading: boolean;
    model: {
        [key: string]: any;
    };
}
declare class Cards extends Component<IProps> {
    render(): JSX.Element[];
}
export default Cards;
