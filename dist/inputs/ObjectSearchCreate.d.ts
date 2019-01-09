import { Component } from 'react';
import { IFieldConfig } from '../';
interface IProps {
    fieldConfig: IFieldConfig;
    form: any;
    isVisible?: any;
    label: string;
}
declare class ObjectSearchCreate extends Component<IProps> {
    private options;
    private isAddingNew;
    private readonly injected;
    private readonly fieldConfig;
    private handleSearch;
    private addNew;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
