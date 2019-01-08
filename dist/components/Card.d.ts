import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    children?: any;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class Card extends Component<IProps> {
    readonly fieldSets: import("../interfaces").IFieldSet[];
    render(): JSX.Element;
}
export default Card;
