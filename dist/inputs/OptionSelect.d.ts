import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
export interface IOptionSelectProps {
    fieldConfig: IFieldConfig;
}
declare class OptionSelect extends Component<IOptionSelectProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): JSX.Element;
}
export default OptionSelect;
