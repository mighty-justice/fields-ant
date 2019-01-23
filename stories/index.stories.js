import React from 'react';
import faker from 'faker';
import { mapValues } from 'lodash';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';

import { Card, FormCard } from '../src';
import readMe from '../README.md';


const demoTypes = {
    string: faker.lorem.sentence,
    money: faker.finance.amount,
    radio: () => 'first',
    objectSearchCreate: () => null,
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

const welcomeNotes = {
  'Introduction': (
    'A standard interface for Field Sets at Mighty and a collection of\n' +
    'utilities and a collection of utilities and components like forms \n' +
    'and cards for Ant Design which use that interface.\n'
  ),
};

const welcomeProps = {
    cardConfig: {
      fieldSets: [Object.keys(welcomeNotes).map(s => ({ field: s, type: 'text' }))],
      title: 'Mighty Fields Ant',
    },
    model: welcomeNotes,
  };

storiesOf('Mighty Fields Ant', module)
  .addDecorator(withNotes)
  .add('Documentation', () => <Card {...welcomeProps} />, { notes: { markdown: readMe }})
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
  ;
