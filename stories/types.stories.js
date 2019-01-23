import React from 'react';
import faker from 'faker';
import { mapValues } from 'lodash';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Card, FormCard } from '../src';
import { withInfoConfigured } from '../.storybook/config';

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
  .addDecorator(withInfoConfigured)
  .add('Displaying', () => <Card {...props} />)
  .add('Editing', () => <FormCard {...props} onSave={(data) => action('Form Save')(data)} />)
  ;
