import { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { IFieldConfigObjectSearchCreate } from '../';
export interface IObjectSearchProps {
    fieldConfig: IFieldConfigObjectSearchCreate;
    onSearchChange: (search: string) => void;
    selectProps: SelectProps;
}
declare class ObjectSearch extends Component<IObjectSearchProps> {
    private options;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly selectProps;
    private handleSearch;
    private onChange;
    render(): JSX.Element;
}
export default ObjectSearch;
