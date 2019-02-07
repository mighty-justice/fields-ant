import { Component } from 'react';
import { ICommonCardProps } from '../interfaces';
interface IProps extends ICommonCardProps {
    children?: any;
    isLoading?: boolean;
    model: any;
    renderTopRight?: () => any;
}
declare class ArrayCard extends Component<IProps> {
    render(): JSX.Element | null;
}
export default ArrayCard;
