import { Component } from 'react';
import { ICardProps } from './Card';
export interface ISummaryCardProps extends ICardProps {
    column: 3 | 4 | 6;
}
declare class SummaryCard extends Component<ISummaryCardProps> {
    static defaultProps: {
        column: number;
    };
    private get fieldSets();
    private renderItem;
    render(): JSX.Element;
}
export default SummaryCard;
