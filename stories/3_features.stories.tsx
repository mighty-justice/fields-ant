import React from 'react';

import { storiesOf } from '@storybook/react';

import { EditableCard, FormCard, IFieldConfigObjectSearchCreate } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import { objectSearchCreateFactory, formCardPropsFactory, fieldFactory, stringFactory } from '../test/factories';
import { ColProps } from 'antd/es/grid';
import { IModel } from '../src/props';

storiesOf('Features', module)
  .addDecorator(withInfoConfigured)
  .add('display', () => (
    <>
      <FormCard
        {...formCardPropsFactory.build()}
        layout='horizontal'
        fieldSets={[[stringFactory.build(), stringFactory.build(), stringFactory.build()]]}
      />
      <FormCard
        {...formCardPropsFactory.build()}
        layout="inline"
        colon
        fieldSets={[{
          fields: [
            {
              ...objectSearchCreateFactory.build() as IFieldConfigObjectSearchCreate,
              colProps: { sm: 24, lg: 12 } as ColProps,
              createFields: [
                { field: 'first_name', populateFromSearch: true },
                { field: 'last_name', populateNameFromSearch: true },
                { field: 'lawfirm', populateFromSearch: true },
                {
                  createFields: [{ field: 'name' }],
                  field: 'organization',
                  type: 'objectSearchCreate',
                },
              ],
            },
          ],
          legend: 'Legend Text',
          rowProps: { gutter: 16 },
        }]}
      />
      <EditableCard
        {...formCardPropsFactory.build()}
        layout='inline'
        colon
        fieldSets={[
          {
            fields: [
              ...fieldFactory.buildList(6).map(fieldConfig => ({
                ...fieldConfig,
                colProps: { sm: 12, lg: 6 },
              })),
            ],
            legend: 'Four across',
            rowProps: { gutter: 16 },
          },
          {
            fields: [
              ...fieldFactory.buildList(6).map(fieldConfig => ({
                ...fieldConfig,
                colProps: { sm: 24, lg: 12 },
              })),
            ],
            legend: 'Two across',
            rowProps: { gutter: 16 },
          },
          {
            fields: [
              ...fieldFactory.buildList(6).map(fieldConfig => ({
                ...fieldConfig,
                colProps: { sm: 24, lg: 24 },
              })),
            ],
            legend: 'One across',
            rowProps: { gutter: 16 },
          },
        ]}
      />
    </>
  ))
  .add('populateFromSearch', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      fieldSets={[{
        fields: [
          {
            ...objectSearchCreateFactory.build() as IFieldConfigObjectSearchCreate,
            colProps: { sm: 24, lg: 12 } as ColProps,
            createFields: [
              { field: 'first_name', populateFromSearch: true },
              { field: 'last_name', populateNameFromSearch: true },
              { field: 'lawfirm', populateFromSearch: true },
              {
                createFields: [{ field: 'name' }],
                field: 'organization',
                type: 'objectSearchCreate',
              },
            ],
          },
        ],
        legend: 'Legend Text',
        rowProps: { gutter: 16 },
      }]}
    />
  ))
  .add('rowProps, colProps', () => (
    <EditableCard
      {...formCardPropsFactory.build()}
      fieldSets={[
        {
          fields: [
            ...fieldFactory.buildList(6).map(fieldConfig => ({
              ...fieldConfig,
              colProps: { sm: 12, lg: 6 },
            })),
          ],
          legend: 'Four across',
          rowProps: { gutter: 16 },
        },
        {
          fields: [
            ...fieldFactory.buildList(6).map(fieldConfig => ({
              ...fieldConfig,
              colProps: { sm: 24, lg: 12 },
            })),
          ],
          legend: 'Two across',
          rowProps: { gutter: 16 },
        },
        {
          fields: [
            ...fieldFactory.buildList(6).map(fieldConfig => ({
              ...fieldConfig,
              colProps: { sm: 24, lg: 24 },
            })),
          ],
          legend: 'One across',
          rowProps: { gutter: 16 },
        },
      ]}
    />
  ))
  ;
