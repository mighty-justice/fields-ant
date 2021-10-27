import { Component } from 'react';
import { IFormFieldProps } from '../interfaces';
declare class RadioGroup extends Component<IFormFieldProps> {
    private get injected();
    private get fieldConfig();
    private get options();
    render(): JSX.Element;
}
export default RadioGroup;
