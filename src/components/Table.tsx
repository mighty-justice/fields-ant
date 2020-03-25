import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { omit } from 'lodash';
import cx from 'classnames';

import * as Antd from 'antd';

import { fieldSetsToColumns, IColumns } from '../utilities';
import { IModel, ISharedComponentProps } from '../props';

export interface ITableProps extends ISharedComponentProps {
  model: IModel[];
}

@autoBindMethods
@observer
class Table extends Component<ITableProps> {
  @computed
  private get columns (): IColumns {
    return fieldSetsToColumns(this.props.fieldSets, this.props.model);
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
    const { isLoading, title, className } = this.props;

    return (
      <Antd.Table
        {...omit(this.props, 'title')}
        className={cx(className)}
        columns={this.columns}
        dataSource={this.dataSource}
        loading={isLoading}
        title={title ? this.getTitle : undefined}
      />
    );
  }
}

export default Table;
