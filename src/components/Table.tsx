import React, { Component, ReactNode } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';

import * as Antd from 'antd';

import { fieldSetsToColumns } from '../utilities/common';
import { IModel, ISharedComponentProps } from '../props';
import { ColumnProps } from '../../node_modules/antd/lib/table/interface';

export interface ITableProps extends ISharedComponentProps {
  model: IModel[];
}

@autoBindMethods
@observer
class Table extends Component<ITableProps> {
  @computed
  private get columns (): Array<ColumnProps<IModel>> {
    return fieldSetsToColumns(this.props.fieldSets);
  }

  @computed
  private get dataSource (): Array<IModel & { key: string }> {
    return this.props.model.map((item, idx) => ({
      key: item.id || idx.toString(),
      ...item,
    }));
  }

  private getTitle (_currentPageData: object[]): ReactNode {
    return (this.props.title || '') as ReactNode;
  }

  private titleProps (): { title?: (currentPageData: object[]) => ReactNode } {
    return (this.props.title ? { title: this.getTitle } : { title: undefined });
  }

  private propsWithoutTitle (): Pick<ITableProps, Exclude<keyof ITableProps, 'title'>> {
    return omit(this.props, 'title');
  }

  public render () {
    return (
      <Antd.Table
        {...this.propsWithoutTitle}
        {...this.titleProps}
        columns={this.columns}
        dataSource={this.dataSource}
      />
    );
  }
}

export default Table;
