import { Component } from 'react';
import { ISharedComponentProps } from '../props';
export interface ICardProps extends ISharedComponentProps {
    renderTopRight?: () => any;
}
declare class Card extends Component<ICardProps> {
    private get fieldSets();
    render(): JSX.Element;
}
export default Card;
