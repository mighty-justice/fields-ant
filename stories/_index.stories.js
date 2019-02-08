import React from 'react';

import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import docReadMe from '../README.md';
import docInterfaces from '../docs/Interfaces.md';
import docUtilities from '../docs/Utilities.md';
import docChangeLog from '../CHANGELOG.md';

storiesOf('Mighty Fields Ant', module)
  .add('Read Me', () => <Marked md={docReadMe} />)
  .add('Changelog', () => <Marked md={docChangeLog} />)
  .add('Interfaces', () => <Marked md={docInterfaces} />)
  .add('Utilities', () => <Marked md={docUtilities} />)
  ;
