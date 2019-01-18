import { Component } from 'react';
import { ICardConfig, IFieldSetPartial } from '../interfaces';
interface IProps {
    cardConfig: ICardConfig;
    fieldSet: IFieldSetPartial;
    idx?: number;
    model: any;
}
declare class CardFieldSet extends Component<IProps> {
    private readonly fieldSet;
    render(): JSX.Element | null;
}
export default CardFieldSet;
