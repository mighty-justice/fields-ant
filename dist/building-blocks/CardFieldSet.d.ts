import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
interface IProps {
    fieldSet: IFieldSetPartial;
    idx?: number;
    model: any;
}
declare class CardFieldSet extends Component<IProps> {
    private readonly fieldSet;
    render(): JSX.Element | null;
}
export default CardFieldSet;
