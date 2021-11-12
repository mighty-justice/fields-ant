import { Component } from 'react';
import { IFormFieldProps } from '../interfaces';
export declare function formatRating(value: string): JSX.Element | "--";
declare class Rate extends Component<IFormFieldProps> {
    private get injected();
    render(): JSX.Element;
}
export default Rate;
