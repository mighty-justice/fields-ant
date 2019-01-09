import { Component } from 'react';
import { ICardConfig } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    className: any;
    column: 3 | 4 | 6;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class SummaryCard extends Component<IProps> {
    static defaultProps: Partial<IProps>;
    private readonly fieldSets;
    private renderItem;
    render(): JSX.Element;
}
export default SummaryCard;
