import React from 'react';
import { mapValues, omit } from 'lodash';

import { storiesOf } from '@storybook/react';

import { Card, FormCard } from '../src';

import {
  formCardPropsFactory,
  TYPE_GENERATORS,
} from '../test/factories';

const props = {
    fieldSets: [Object.keys(TYPE_GENERATORS).map(type => ({
      ...TYPE_GENERATORS[type].fieldConfigFactory.build(),
      field: type,
      label: type,
      type,
    }))],
    model: mapValues(TYPE_GENERATORS, value => value.valueFunction()),
    title: 'Working Title',
  };

storiesOf('Types', module)
  .add('Creating', () => <FormCard {...formCardPropsFactory.build()} {...omit(props, 'model')} />)
  .add('Editing', () => <FormCard {...formCardPropsFactory.build()} {...props} />)
  .add('Displaying', () => <Card {...props} />)
  ;
