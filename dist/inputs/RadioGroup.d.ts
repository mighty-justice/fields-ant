import { Component } from 'react';
import { IInputProps } from '../interfaces';
declare class RadioGroup extends Component<IInputProps> {
    private get injected();
    private get fieldConfig();
    private get options();
    render(): JSX.Element;
}
export default RadioGroup;
