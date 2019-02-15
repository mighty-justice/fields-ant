import React from 'react';
import { Table, Tag } from 'antd';
import { Provider } from 'mobx-react';

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import 'antd/dist/antd.css';
import './stories.css';

function stringSortFor (attr: string) {
  return (a: any, b: any) => (a[attr]).localeCompare(b[attr]);
}

function boolSortFor (attr: string) {
  return (a: any, b: any) => (a[attr] === b[attr]) ? 0 : a[attr] ? 1 : -1;
}

const PropsTable = (props: any) => {
  const dataSource = props.propDefinitions.map((propDefinition: any) => ({
    ...propDefinition,
    required: propDefinition.required && !propDefinition.defaultValue,
  }));

  return (
    <Table
      bordered
      columns={[
        {
          dataIndex: 'property',
          sorter: stringSortFor('property'),
          title: 'Prop',
        },
        {
          dataIndex: 'propType.name',
          sorter: stringSortFor('name'),
          title: 'Type',
        },
        {
          dataIndex: 'required',
          defaultSortOrder: 'descend' as 'descend',
          render: (value: any) => value ? <Tag color='red'>Yes</Tag> : <Tag>No</Tag>,
          sorter: boolSortFor('required'),
          title: 'required',
        },
        {
          dataIndex: 'defaultValue',
          title: 'defaultValue',
        },
      ].map(row => ({ ...row, key: row.dataIndex }))}
      dataSource={dataSource}
      pagination={false}
      rowKey='property'
    />
  );
}

const providers = {
  getEndpoint: async (_endpoint: string) => ({ results: [
    { id: 'first', name: 'first' },
    { id: 'second', name: 'second' },
    { id: 'third', name: 'third' },
  ]}),
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
