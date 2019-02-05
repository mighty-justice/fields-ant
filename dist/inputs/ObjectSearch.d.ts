import { Component } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfigObjectSearchCreate } from '../';
interface IProps {
    buttonProps: ButtonProps;
    fieldConfig: IFieldConfigObjectSearchCreate;
    fieldDecorator: any;
    formManager: FormManager;
    selectProps: SelectProps;
}
declare class ObjectSearch extends Component<IProps> {
    private isAddingNew;
    private options;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly selectProps;
    private readonly buttonProps;
    private handleSearch;
    private addNew;
    private undoAddNew;
    private onChange;
    render(): JSX.Element;
}
export default ObjectSearch;
