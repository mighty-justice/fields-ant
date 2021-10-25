import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/es/table';

import { fieldSetsToColumns, IColumns, ITableModel } from '../utilities';
import { IModel, ISharedComponentProps } from '../props';
import { CLASS_PREFIX } from '../consts';

export type ITablePassDownProps = Omit<TableProps<ITableModel>, 'className' | 'title'>;

export interface ITableProps extends ISharedComponentProps, ITablePassDownProps {
  model: IModel[];
}

const CLASS_NAME = `${CLASS_PREFIX}-table`;

@autoBindMethods
@observer
class Table extends Component<ITableProps> {
  @computed
  private get columns(): IColumns {
    return fieldSetsToColumns(this.props.fieldSets, this.dataSource);
  }

  @computed
  private get dataSource(): ITableModel[] {
    return this.props.model.map((item, idx) => ({
      key: item.id || idx.toString(),
      ...item,
    }));
  }

  private getTitle(): React.ReactNode {
    return this.props.title || undefined;
  }

  public render() {
    const { isLoading, title, className, ...passDownProps } = this.props;

    return (
      <AntTable
        {...passDownProps}
        className={cx(CLASS_NAME, className)}
        columns={this.columns}
        dataSource={this.dataSource}
        loading={isLoading}
        pagination={{ hideOnSinglePage: true, ...this.props.pagination }}
        title={title ? this.getTitle : undefined}
      />
    );
  }
}

export default Table;
