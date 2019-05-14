
import React from 'react';

import { storiesOf } from '@storybook/react';

import { FormCard } from '../src';
import { withInfoConfigured } from '../.storybook/config';
import { formCardPropsFactory } from '../test/factories';

storiesOf('Examples', module)
  .addDecorator(withInfoConfigured)
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
