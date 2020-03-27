import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';
export interface ICardFieldSetProps {
    fieldSet: IFieldSetPartial;
    model?: IModel;
}
declare class CardFieldSet extends Component<ICardFieldSetProps> {
    private readonly fieldSet;
    render(): JSX.Element | null;
}
export default CardFieldSet;
