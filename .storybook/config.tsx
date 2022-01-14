import React from 'react';
import { Provider } from 'mobx-react';

import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { fieldSetsToColumns } from '../src';

import 'antd/dist/antd.css';
import './stories.css';

function stringSortFor (attr: string) {
  return (a: any, b: any) => (a[attr]).localeCompare(b[attr]);
}

function boolSortFor (attr: string) {
  return (a: any, b: any) => (a[attr] === b[attr]) ? 0 : a[attr] ? 1 : -1;
}

const propTableColumns: ColumnsType<any> = fieldSetsToColumns([[
  {
    field: 'property',
    label: 'Prop',
    tableColumnProps: { sorter: stringSortFor('property') },
  },
  {
    field: 'propType.name',
    label: 'Type',
    tableColumnProps: { sorter: stringSortFor('name') },
  },
  {
    field: 'required',
    label: 'required',
    render: (value: any) => value ? <Tag color='red'>Yes</Tag> : <Tag>No</Tag>,
    tableColumnProps: { sorter: boolSortFor('required'), defaultSortOrder: 'descend' },
  },
  {
    field: 'defaultValue',
    label: 'default',
  },
]]);

const PropsTable = (props: any) => {
  const dataSource = props.propDefinitions.map((propDefinition: any) => ({
    ...propDefinition,
    required: propDefinition.required && !propDefinition.defaultValue,
  }));

  return (
    <Table
      bordered
      columns={propTableColumns}
      dataSource={dataSource}
      pagination={false}
      rowKey='property'
    />
  );
};

const providers = {
  getEndpoint: async (endpoint: string) => {
    if (endpoint.includes('empty')) {
      return { results: [] };
    }

    return { results: [
      { id: 'first', name: 'first' },
      { id: 'second', name: 'second' },
      { id: 'third', name: 'third' },
    ]};
  },
  getOptions: async (_optionType: string) => ([
    { value: 'first', name: 'first' },
    { value: 'second', name: 'second' },
    { value: 'third', name: 'third' },
  ]),
};

const PageDecorator = (storyFn: () => React.ReactNode) => (
  <div style={{ margin: '15px' }}>
    <Provider {...providers}>
      {storyFn()}
    </Provider>
  </div>
);

export const withInfoConfigured = withInfo(
  { inline: true, TableComponent: PropsTable } as any,
);
addDecorator(PageDecorator as any);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.[jt]sx?$/);
function loadStories () {
  req.keys().forEach(req);
}

configure(loadStories, module);
