import { Component } from 'react';
import { ISharedComponentProps } from '../props';
export interface ICardProps extends ISharedComponentProps {
    bordered?: boolean;
    renderTopRight?: () => any;
}
declare class Card extends Component<ICardProps> {
    static defaultProps: {
        bordered: boolean;
    };
    private get fieldSets();
    render(): JSX.Element;
}
export default Card;
