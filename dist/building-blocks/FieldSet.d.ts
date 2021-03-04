import { Component } from 'react';
import { ClassValue } from 'classnames/types';
import { IFieldSetPartial, ILayout } from '../interfaces';
interface IProps {
    className?: ClassValue;
    fieldSet: IFieldSetPartial;
    layout?: ILayout;
}
export default class FieldSet extends Component<IProps> {
    static defaultProps: Partial<IProps>;
    render(): JSX.Element;
}
export {};
