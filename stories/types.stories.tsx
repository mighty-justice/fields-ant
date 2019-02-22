import React from 'react';
import { mapValues } from 'lodash';

import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import docObjectSearchCreate from '../docs/ObjectSearchCreate.md';
import { Card, FormCard, IFieldConfigObjectSearchCreate } from '../src';

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
    model: mapValues(TYPE_GENERATORS, value => value.valueFunction()),
    title: 'Working Title',
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
          fields: [
            {
              ...objectSearchCreateFactory.build() as IFieldConfigObjectSearchCreate,
              colProps: { sm: 24, lg: 12 },
              createFields: [
                { field: 'first_name', populateFromSearch: true },
                { field: 'last_name', populateNameFromSearch: true },
                { field: 'lawfirm', populateFromSearch: true },
                {
                  createFields: [{ field: 'name' }],
                  field: 'organization',
                  type: 'objectSearchCreate',
                },
              ],
              editProps: {
                noSearchContent: `Type in lawfirm's name`,
                searchIcon: <span>O</span>,
                selectProps: { placeholder: 'Search lawfirm...' },
              },
            },
            {
              ...objectSearchCreateFactory.build() as IFieldConfigObjectSearchCreate,
              colProps: { sm: 24, lg: 12 },
              createFields: [
                { field: 'first_name', required: true },
                { field: 'last_name', required: true },
                { field: 'lawfirm', populateFromSearch: true },
                {
                  createFields: [{ field: 'name' }],
                  field: 'organization',
                  type: 'objectSearchCreate',
                },
              ],
            },
          ],
          legend: 'Legend Text',
          rowProps: { gutter: 16 },
        }]}
      />
      <Marked md={docObjectSearchCreate} />
    </>
  ))
  ;
