import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    extra?: any;
    isLoading?: boolean;
    model: any;
}
declare class ArrayCard extends Component<IProps> {
    render(): JSX.Element | null;
}
export default ArrayCard;
