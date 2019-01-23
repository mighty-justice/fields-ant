import { Component } from 'react';
import { IFieldConfig, IFieldConfigOptionSelect } from '../interfaces';
interface IProps {
    fieldConfig: IFieldConfig;
    value: any;
}
declare class OptionSelectDisplay extends Component<IProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): string;
}
export declare function formatOptionSelect(value: any, fieldConfig: IFieldConfigOptionSelect): string | JSX.Element;
export default OptionSelectDisplay;
