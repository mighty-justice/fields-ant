import { Component } from 'react';
import { ClassValue } from 'classnames/types';
import { IFieldSetPartial, ILayout } from '../interfaces';
interface IProps {
    className?: ClassValue;
    fieldSet: IFieldSetPartial;
    layout?: ILayout;
}
export default class FieldSet extends Component<IProps> {
    static defaultProps: {
        layout?: "inline" | "horizontal" | "vertical" | undefined;
        colon: boolean;
    };
    render(): JSX.Element;
}
export {};
