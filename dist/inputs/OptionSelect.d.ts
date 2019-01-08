import { Component } from 'react';
import { IFieldConfig } from '../interfaces';
interface IProps {
    fieldConfig: IFieldConfig;
}
declare class OptionSelect extends Component<IProps> {
    private readonly injected;
    private readonly fieldConfig;
    private readonly options;
    render(): JSX.Element;
}
export default OptionSelect;
