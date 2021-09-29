import { Component } from 'react';
import { TableProps } from 'antd/es/table';
import { ITableModel } from '../utilities';
import { IModel, ISharedComponentProps } from '../props';
export declare type ITablePassDownProps = Omit<TableProps<ITableModel>, 'className' | 'title'>;
export interface ITableProps extends ISharedComponentProps, ITablePassDownProps {
    model: IModel[];
}
declare class Table extends Component<ITableProps> {
    private get columns();
    private get dataSource();
    private getTitle;
    render(): JSX.Element;
}
export default Table;
