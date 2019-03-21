import React from 'react';

import { storiesOf } from '@storybook/react';

import { FormCard, IFieldConfigObjectSearchCreate } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import { objectSearchCreateFactory, formCardPropsFactory } from '../test/factories';
import { ColProps } from 'antd/lib/grid';

storiesOf('Features', module)
  .addDecorator(withInfoConfigured)
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
  .add('Login page', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      blockSubmit
      fieldSets={[[
        { field: 'username', required: true },
        { field: 'password', required: true },
      ]]}
      saveText='Submit'
      title='Log in'
    />
  ))
  ;
