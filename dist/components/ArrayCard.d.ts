import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
export interface IArrayCardProps extends ICommonCardProps {
    children?: any;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class ArrayCard extends Component<IArrayCardProps> {
    render(): JSX.Element | null;
}
export default ArrayCard;
