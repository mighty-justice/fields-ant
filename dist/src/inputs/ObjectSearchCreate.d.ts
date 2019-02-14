import { Component } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { SelectProps } from 'antd/lib/select';
import { FormManager, IFieldConfigObjectSearchCreate } from '../';
export interface IObjectSearchCreateProps {
    buttonProps: ButtonProps;
    decoratorOptions: {
        [key: string]: any;
    };
    fieldConfig: IFieldConfigObjectSearchCreate;
    fieldDecorator: <T>(component: T) => T;
    formManager: FormManager;
    selectProps: SelectProps;
}
declare class ObjectSearchCreate extends Component<IObjectSearchCreateProps> {
    private isAddingNew;
    private search;
    private readonly injected;
    private readonly fieldConfig;
    private readonly buttonProps;
    private handleSearch;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
