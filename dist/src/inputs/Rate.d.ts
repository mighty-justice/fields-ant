import { Component } from 'react';
import { IInputProps } from '../interfaces';
export declare function formatRating(value: string): JSX.Element | "--";
declare class Rate extends Component<IInputProps> {
    private readonly injected;
    render(): JSX.Element;
}
export default Rate;
