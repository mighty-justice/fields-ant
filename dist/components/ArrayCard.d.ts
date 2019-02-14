import { Component } from 'react';
import { IModel } from '../props';
import { ICardProps } from './Card';
export interface IArrayCardProps extends ICardProps {
    model: IModel[];
}
declare class ArrayCard extends Component<IArrayCardProps> {
    render(): JSX.Element;
}
export default ArrayCard;
