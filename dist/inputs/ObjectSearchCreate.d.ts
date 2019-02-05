import { Component } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfigObjectSearchCreate } from '../';
interface IProps {
    buttonProps: ButtonProps;
    decoratorOptions: any;
    fieldConfig: IFieldConfigObjectSearchCreate;
    fieldDecorator: any;
    formManager: FormManager;
    selectProps: SelectProps;
}
declare class ObjectSearchCreate extends Component<IProps> {
    private isAddingNew;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly buttonProps;
    private handleSearch;
    private addNew;
    private undoAddNew;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
