import React from 'react';

import { storiesOf } from '@storybook/react';

import { EditableCard, FormCard, IFieldConfigObjectSearchCreate } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import { objectSearchCreateFactory, formCardPropsFactory, fieldFactory } from '../test/factories';
import { ColProps } from 'antd/es/grid';
import { IModel } from '../src/props';

storiesOf('Features', module)
  .addDecorator(withInfoConfigured)
  .add('display', () => (
    <>
      <FormCard
        {...formCardPropsFactory.build()}
        layout="vertical"
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
        colon={false}
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
  .add('fieldsValidator', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      fieldSets={[[
        { field: 'first_field' },
        {
          field: 'only_valid_if_first_field_is_sam',
          formValidationRules: { isSam: {
            fieldsValidator: (_value: any, _fieldConfig: any, model: IModel) => model.first_field === 'sam',
            message: 'First field must be "sam"',
          }},
        },
      ]]}
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
