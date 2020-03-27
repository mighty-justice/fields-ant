import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
import { IClassName } from '../props';
interface IProps {
    fieldSet: IFieldSetPartial;
    className?: IClassName;
}
export default class FieldSet extends Component<IProps> {
    render(): JSX.Element;
}
export {};
