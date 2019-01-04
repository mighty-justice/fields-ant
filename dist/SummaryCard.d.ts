import { Component } from 'react';
import { ICardConfig } from './interfaces';
export declare type ISummaryCardColumns = 3 | 4 | 6;
interface IProps {
    cardConfig: ICardConfig;
    className: any;
    column: ISummaryCardColumns;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class SummaryCard extends Component<IProps> {
    static defaultProps: Partial<IProps>;
    readonly fieldSets: import("./interfaces").IFieldSet[];
    private renderItem;
    render(): JSX.Element;
}
export default SummaryCard;
