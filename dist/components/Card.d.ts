import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface ICardProps extends ICommonCardProps {
    children?: any;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class Card extends Component<ICardProps> {
    private readonly fieldSets;
    render(): JSX.Element;
}
export default Card;
