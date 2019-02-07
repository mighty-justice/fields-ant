import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
interface IProps extends ICommonCardProps {
    children?: any;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class Card extends Component<IProps> {
    private readonly fieldSets;
    render(): JSX.Element;
}
export default Card;
