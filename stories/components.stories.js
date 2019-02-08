import React from 'react';

import { storiesOf } from '@storybook/react';

import { withInfoConfigured } from '../.storybook/config';
import { COMPONENT_GENERATORS } from '../test/factories';

const componentStories =  storiesOf('Components', module)
  .addDecorator(withInfoConfigured)
  ;

Object.keys(COMPONENT_GENERATORS).forEach(componentName => {
  const { Component, propsFactory } = COMPONENT_GENERATORS[componentName];
  componentStories.add(componentName, () => <Component {...propsFactory.build()} />)
});
