import { Component } from 'react';
import { IFieldConfig, IFieldConfigOptionSelect } from '../interfaces';
import { IValue } from '../props';
export interface IOptionSelectDisplayProps {
    fieldConfig: IFieldConfig;
    value: IValue;
}
declare class OptionSelectDisplay extends Component<IOptionSelectDisplayProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): string;
}
export declare function formatOptionSelect(value: any, fieldConfig: IFieldConfigOptionSelect): string | JSX.Element;
export default OptionSelectDisplay;
