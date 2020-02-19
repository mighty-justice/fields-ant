import React, { Component } from 'react';
import { IInputProps } from '../interfaces';
import { IModel } from '../props';
export interface IObjectSelectProps extends IInputProps {
    keyBy: string;
    renderOption: (option: IModel) => React.ReactNode;
    renderSelected: (option: IModel) => string;
}
export declare const SHOW_OPTION_SEARCH_IF_OVER = 8;
declare class ObjectSelect extends Component<IObjectSelectProps> {
    private get injected();
    static defaultProps: Partial<IObjectSelectProps>;
    private get fieldConfig();
    private get options();
    private get showSearch();
    private renderOption;
    render(): JSX.Element;
}
export default ObjectSelect;
