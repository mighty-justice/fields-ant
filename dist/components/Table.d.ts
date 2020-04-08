import { Component } from 'react';
import { TableProps } from 'antd/lib/table/interface';
import { IModel, ISharedComponentProps } from '../props';
export declare type ITableModel = IModel & {
    key: string;
};
export declare type ITablePassDownProps = Omit<TableProps<ITableModel>, 'className' | 'title'>;
export interface ITableProps extends ISharedComponentProps, ITablePassDownProps {
    model: IModel[];
}
declare class Table extends Component<ITableProps> {
    private readonly columns;
    private readonly dataSource;
    private getTitle;
    render(): JSX.Element;
}
export default Table;
