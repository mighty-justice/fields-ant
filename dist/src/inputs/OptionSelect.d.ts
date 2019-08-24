import React, { Component } from 'react';
import { IFieldConfig, IOption } from '../interfaces';
export interface IOptionSelectProps {
    fieldConfig: IFieldConfig;
    renderOption?: (option: IOption) => React.ReactNode;
}
export declare const SHOW_OPTION_SEARCH_IF_OVER = 8;
declare class OptionSelect extends Component<IOptionSelectProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    private readonly showSearch;
    render(): JSX.Element;
}
export default OptionSelect;
