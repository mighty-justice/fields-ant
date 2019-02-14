import { Component } from 'react';
import { IInputProps } from '../interfaces';
declare class RadioGroup extends Component<IInputProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): JSX.Element;
}
export default RadioGroup;
