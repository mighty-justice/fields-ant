import React, { Component } from 'react';
import { getNameOrDefault } from '@mighty-justice/utils';
import { IFormFieldProps } from '../interfaces';
import { IModel } from '../props';
export interface IObjectSelectProps extends IFormFieldProps {
    keyBy: string;
    renderOption: (option: IModel) => React.ReactNode;
    renderSelected: (option: IModel) => string;
}
export declare const SHOW_OPTION_SEARCH_IF_OVER = 8;
declare class ObjectSelect extends Component<IObjectSelectProps> {
    private get injected();
    static defaultProps: {
        keyBy: string;
        renderOption: typeof getNameOrDefault;
        renderSelected: typeof getNameOrDefault;
    };
    private get fieldConfig();
    private get options();
    private get showSearch();
    private get selectProps();
    private renderOption;
    render(): JSX.Element;
}
export default ObjectSelect;
