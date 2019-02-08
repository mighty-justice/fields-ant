import React from 'react';
import { mapValues } from 'lodash';

import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import docObjectSearchCreate from '../docs/ObjectSearchCreate.md';
import { Card, FormCard } from '../src';

import {
  formCardPropsFactory,
  objectSearchCreateFactory,
  TYPE_GENERATORS,
} from '../test/factories';

const props = {
    fieldSets: [Object.keys(TYPE_GENERATORS).map(type => ({
      ...TYPE_GENERATORS[type].fieldConfigFactory.build(),
      field: type,
      label: type,
    }))],
    title: 'Working Title',
    model: mapValues(TYPE_GENERATORS, value => value.valueFunction()),
  };

storiesOf('Types', module)
  .add('Displaying', () => <Card {...props} />)
  .add('Editing', () => <FormCard {...formCardPropsFactory.build()} {...props} />)
  .add('objectSearchCreate', () => (
    <>
      <Marked md={`# { type: 'objectSearchCreate' }`} />
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
            {
              ...objectSearchCreateFactory.build(),
              colProps: { sm: 24, lg: 12 },
              createFields: [
                { field: 'first_name', required: true },
                { field: 'last_name', required: true },
                { field: 'lawfirm', populateFromSearch: true },
                {
                  field: 'organization',
                  type: 'objectSearchCreate',
                  createFields: [{ field: 'name' }],
                },
              ],
            }
          ]
        }]}
      />
      <Marked md={docObjectSearchCreate} />
    </>
  ))
  ;
