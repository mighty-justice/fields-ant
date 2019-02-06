import { Component } from 'react';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfigObjectSearchCreate } from '../';
interface IProps {
    fieldConfig: IFieldConfigObjectSearchCreate;
    formManager: FormManager;
    onSearchChange: any;
    selectProps: SelectProps;
}
declare class ObjectSearch extends Component<IProps> {
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
