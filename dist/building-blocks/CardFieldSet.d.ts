import { Component } from 'react';
import { IFieldSetPartial, IFormatProps } from '../interfaces';
import { IModel } from '../props';
export interface ICardFieldSetProps extends IFormatProps {
    fieldSet: IFieldSetPartial;
    model?: IModel;
}
declare class CardFieldSet extends Component<ICardFieldSetProps> {
    private get fieldSet();
    render(): JSX.Element | null;
}
export default CardFieldSet;
