import { Component } from 'react';
import { IFieldConfigPartial } from '../interfaces';
import { IModel } from '../props';
export interface ICardFieldProps {
    fieldConfig: IFieldConfigPartial;
    model?: IModel;
}
declare class CardField extends Component<ICardFieldProps> {
    private get fieldConfig();
    render(): JSX.Element | null;
}
export default CardField;
