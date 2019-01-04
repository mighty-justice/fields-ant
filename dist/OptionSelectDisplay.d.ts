import { Component } from 'react';
import { IFieldConfigOptionSelect } from './interfaces';
interface IProps {
    fieldConfig: {
        options?: any[];
        optionType?: string;
    };
    value: any;
}
declare class OptionSelectDisplay extends Component<IProps> {
    private readonly fieldConfig;
    render(): string;
}
export declare function formatOptionSelect(value: any, fieldConfig: IFieldConfigOptionSelect): string | JSX.Element;
export default OptionSelectDisplay;
