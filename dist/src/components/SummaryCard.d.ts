import { Component } from 'react';
import { IClassName } from '../props';
import { ICardProps } from './Card';
export interface ISummaryCardProps extends ICardProps {
    className: IClassName;
    column: 3 | 4 | 6;
}
declare class SummaryCard extends Component<ISummaryCardProps> {
    static defaultProps: Partial<ISummaryCardProps>;
    private readonly fieldSets;
    private renderItem;
    render(): JSX.Element;
}
export default SummaryCard;
