import { Component } from 'react';
import { IInputProps } from '../interfaces';
declare class Birthdate extends Component<IInputProps> {
    private readonly injected;
    private readonly valueObject;
    private getValueField;
    private onChange;
    private renderFieldInput;
    render(): JSX.Element;
}
export default Birthdate;
