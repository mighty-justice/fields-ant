import { Component } from 'react';
import { IFieldConfig } from '../';
interface IProps {
    fieldConfig: IFieldConfig;
    form: any;
}
declare class ObjectSearchCreate extends Component<IProps> {
    private search;
    private options;
    private isAddingNew;
    private AddNewForm;
    constructor(props: IProps);
    private readonly injected;
    private readonly fieldConfig;
    private handleSearch;
    private addNew;
    private onCreateValuesChange;
    render(): JSX.Element;
}
export default ObjectSearchCreate;
