import { Component } from 'react';
import { IFieldConfigPartial, IFormatProps } from '../interfaces';
import { IModel } from '../props';
export interface ICardFieldProps extends IFormatProps {
    fieldConfig: IFieldConfigPartial;
    model?: IModel;
}
declare class CardField extends Component<ICardFieldProps> {
    static defaultProps: Partial<ICardFieldProps>;
    private get fieldConfig();
    render(): JSX.Element | null;
}
export default CardField;
