import { Component } from 'react';
import { IInputProps } from '../interfaces';
declare class Date extends Component<IInputProps> {
    private inputRefs;
    private readonly injected;
    private readonly inputProps;
    private getRefSetter;
    private readonly valueObject;
    private getValueField;
    private onChange;
    private renderFieldInput;
    render(): JSX.Element;
}
export default Date;
