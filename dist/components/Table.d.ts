import { Component } from 'react';
import { IModel, ISharedComponentProps } from '../props';
export interface ITableProps extends ISharedComponentProps {
    model: IModel[];
}
declare class Table extends Component<ITableProps> {
    private get columns();
    private get dataSource();
    private getTitle;
    render(): JSX.Element;
}
export default Table;
