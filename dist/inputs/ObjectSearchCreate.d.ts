import { Component } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';
import { IFieldConfigObjectSearchCreate } from '../';
interface IProps {
    buttonProps: ButtonProps;
    fieldConfig: IFieldConfigObjectSearchCreate;
    selectProps: SelectProps;
}
declare class ObjectSearchCreate extends Component<IProps> {
    private isAddingNew;
    private options;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly selectProps;
    private readonly buttonProps;
    private handleSearch;
    private addNew;
    private onChange;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
