import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface ISummaryCardProps extends ICommonCardProps {
    className: any;
    column: 3 | 4 | 6;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class SummaryCard extends Component<ISummaryCardProps> {
    static defaultProps: Partial<ISummaryCardProps>;
    private readonly fieldSets;
    private renderItem;
    render(): JSX.Element;
}
export default SummaryCard;
