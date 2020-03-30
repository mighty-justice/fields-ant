import { Component } from 'react';
import { ClassValue } from 'classnames/types';
import { IFieldSetPartial } from '../interfaces';
interface IProps {
    className?: ClassValue;
    fieldSet: IFieldSetPartial;
}
export default class FieldSet extends Component<IProps> {
    render(): JSX.Element;
}
export {};
