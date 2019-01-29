import React from 'react';
import faker from 'faker';
import { mapValues } from 'lodash';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import { Card, FormCard } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import docObjectSearchCreate from '../docs/ObjectSearchCreate.md';

const demoTypes = {
    money: faker.finance.amount,
    objectSearchCreate: () => null,
    radio: () => 'first',
    string: faker.lorem.sentence,
  }
  , fieldConfigs = {
    radio: {
      options: [
        { value: 'first', name: 'first' },
        { value: 'second', name: 'second' },
        { value: 'third', name: 'third' },
      ]
    },
    objectSearchCreate: {
      createFields: [{ field: 'name', required: true }],
      endpoint: '/endpoint/',
    }
  }
  ;

const props = {
    cardConfig: {
      fieldSets: [Object.keys(demoTypes).map(s => ({ field: s, type: s, ...fieldConfigs[s] }))],
      title: 'Working Title',
    },
    model: mapValues(demoTypes, value => value()),
  };

storiesOf('Types', module)
  .add('Displaying', () => <Card {...props} />)
  .add('Editing', () => <FormCard {...props} onSave={(data) => action('Form Save')(data)} />)
  .add('objectSearchCreate', () => (
    <>
      <Marked md={`# { type: 'objectSearchCreate' }`} />
      <FormCard
        cardConfig={{
          ...props.cardConfig,
          fieldSets: [{
            legend: 'Legend Text',
            rowProps: { gutter: 16 },
            fields: [
              {
                colProps: { sm: 24, lg: 12 },
                field: 'example',
                type: 'objectSearchCreate',
                endpoint: '/endpoint/',
                createFields: [
                  { field: 'first_name', populateFromSearch: true },
                  { field: 'last_name', populateNameFromSearch: true },
                  { field: 'lawfirm', populateNameFromSearch: true },
                  {
                    field: 'organization',
                    type: 'objectSearchCreate',
                    createFields: [{ field: 'name' }],
                  },
                ],
              },
              {
                colProps: { sm: 24, lg: 12 },
                field: 'example',
                type: 'objectSearchCreate',
                endpoint: '/endpoint/',
                createFields: [
                  { field: 'first_name', populateFromSearch: true },
                  { field: 'last_name', populateNameFromSearch: true },
                  { field: 'lawfirm', populateNameFromSearch: true },
                  {
                    field: 'organization',
                    type: 'objectSearchCreate',
                    createFields: [{ field: 'name' }],
                  },
                ],
              }
            ]
          }]
        }}
        onSave={(data) => action('Form Save')(data)}
      />
      <Marked md={docObjectSearchCreate} />
    </>
  ))
  ;
