import React from 'react';

import { storiesOf } from '@storybook/react';

import { FormCard } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import { objectSearchCreateFactory, formCardPropsFactory } from '../test/factories';

storiesOf('Components', module)
  .addDecorator(withInfoConfigured)
  .add('FormCard', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      fieldSets={[{
        legend: 'Legend Text',
        rowProps: { gutter: 16 },
        fields: [
          {
            ...objectSearchCreateFactory.build(),
            colProps: { sm: 24, lg: 12 },
            createFields: [
              { field: 'first_name', populateFromSearch: true },
              { field: 'last_name', populateNameFromSearch: true },
              { field: 'lawfirm', populateFromSearch: true },
              {
                field: 'organization',
                type: 'objectSearchCreate',
                createFields: [{ field: 'name' }],
              },
            ],
          },
        ]
      }]}
    />
  ))
  ;
