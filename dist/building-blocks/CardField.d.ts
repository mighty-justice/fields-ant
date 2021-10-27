import { Component } from 'react';
import { IFieldConfigPartial, IFormatProps } from '../interfaces';
import { IModel } from '../props';
export interface ICardFieldProps extends IFormatProps {
    fieldConfig: IFieldConfigPartial;
    model?: IModel;
}
declare class CardField extends Component<ICardFieldProps> {
    static defaultProps: {
        layout?: "inline" | "horizontal" | "vertical" | undefined;
        colon: boolean;
    };
    private get fieldConfig();
    render(): JSX.Element | null;
}
export default CardField;
