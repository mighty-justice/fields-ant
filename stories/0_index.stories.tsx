import React from 'react';

import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import docReadMe from '../README.md';
import docChangeLog from '../CHANGELOG.md';

import FieldConfigPreview from './FieldConfigPreview';

storiesOf('Mighty Fields Ant', module)
  .add('Read Me', () => <Marked md={docReadMe} />)
  .add('Changelog', () => <Marked md={docChangeLog} />)
  .add('FieldConfig preview', () => <FieldConfigPreview />)
  ;
