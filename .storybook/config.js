import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import { Provider } from 'mobx-react';

import { configure, addDecorator } from '@storybook/react';
import { withInfo } from "@storybook/addon-info";

import 'antd/dist/antd.css';
import './stories.css';

const PropsTable = (props) => (
  <Table
    dataSource={props.propDefinitions}
    pagination={false}
    bordered
    rowKey='property'
    columns={[
      {
        dataIndex: 'property',
        sorter: (a, b) => (a.property).localeCompare(b.property),
        title: 'Prop'
      },
      {
        dataIndex: 'propType.name',
        sorter: (a, b) => (a.propType.name).localeCompare(b.propType.name),
        title: 'Type'
      },
      {
        dataIndex: 'required',
        defaultSortOrder: 'descend',
        render: value => value ? <Tag color="red">Yes</Tag> : <Tag>No</Tag>,
        sorter: (a, b) => (a.required === b.required)? 0 : a.required? 1 : -1,
        title: 'required',
      },
    ].map(row => ({ ...row, key: row.dataIndex }))}
  />
);

const providers = {
  getOptions: async (optionType) => ([
    { value: 'first', name: 'first' },
    { value: 'second', name: 'second' },
    { value: 'third', name: 'third' },
  ]),
  getEndpoint: async (endpoint) => ({ results: [
    { id: 'first', name: 'first' },
    { id: 'second', name: 'second' },
    { id: 'third', name: 'third' },
  ]}),
};

const PageDecorator = (storyFn) => (
  <div style={{ margin: '15px' }}>
    <Provider {...providers}>
      { storyFn() }
    </Provider>
  </div>
);

export const withInfoConfigured = withInfo({ inline: true, TableComponent: PropsTable });
addDecorator(PageDecorator);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
