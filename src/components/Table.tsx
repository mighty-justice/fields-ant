import React, { Component } from 'react';
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

  private getTitle () {
    return this.props.title || '';
  }

  public render () {
    return (
      <Antd.Table
        {...omit(this.props, 'title')}
        title={this.props.title ? this.getTitle : undefined}
        columns={this.columns}
        dataSource={this.dataSource}
      />
    );
  }
}

export default Table;
