import React from 'react';
import { mapValues, omit } from 'lodash';

import { storiesOf } from '@storybook/react';

import { Card, FormCard, IFieldConfig } from '../src';

import {
  formCardPropsFactory,
  TYPE_GENERATORS,
} from '../test/factories';

const getFieldSets = (args?: Partial<IFieldConfig>) => ({
    fieldSets: [Object.keys(TYPE_GENERATORS).map(type => ({
      ...TYPE_GENERATORS[type].fieldConfigFactory.build(),
      field: type,
      label: type,
      type,
      ...args,
    }))],
    model: mapValues(TYPE_GENERATORS, value => value.valueFunction()),
    title: 'Working Title',
  })
  , props = getFieldSets()
  , disabledProps = getFieldSets({ disabled: true })
  ;

storiesOf('Types', module)
  .add('Creating', () => <FormCard {...formCardPropsFactory.build()} {...omit(props, 'model')} />)
  .add('Editing', () => <FormCard {...formCardPropsFactory.build()} {...props} />)
  .add('Disabled', () => <FormCard {...formCardPropsFactory.build()} {...disabledProps} />)
  .add('Displaying', () => <Card {...props} />)
  ;
