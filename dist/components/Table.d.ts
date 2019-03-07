import { Component } from 'react';
import { IModel, ISharedComponentProps } from '../props';
export interface ITableProps extends ISharedComponentProps {
    model: IModel[];
}
declare class Table extends Component<ITableProps> {
    private readonly columns;
    private readonly dataSource;
    private title;
    render(): JSX.Element;
}
export default Table;
