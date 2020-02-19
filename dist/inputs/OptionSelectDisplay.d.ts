import { Component } from 'react';
import { IFieldConfig, IFieldConfigOptionSelect } from '../interfaces';
import { IValue } from '../props';
export interface IOptionSelectDisplayProps {
    fieldConfig: IFieldConfig;
    value: IValue;
}
declare class OptionSelectDisplay extends Component<IOptionSelectDisplayProps> {
    private get injected();
    private get fieldConfig();
    private get options();
    render(): string;
}
export declare function formatOptionSelect(value: any, fieldConfig: IFieldConfigOptionSelect): string | JSX.Element;
export default OptionSelectDisplay;
