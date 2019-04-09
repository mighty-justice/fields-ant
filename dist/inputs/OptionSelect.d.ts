import React, { Component } from 'react';
import { IFieldConfig, IOption } from '../interfaces';
export interface IOptionSelectProps {
    fieldConfig: IFieldConfig;
    renderOption?: (option: IOption) => React.ReactNode;
}
declare class OptionSelect extends Component<IOptionSelectProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): JSX.Element;
}
export default OptionSelect;
