import React from 'react';
import { mapValues, omit } from 'lodash';

import { storiesOf } from '@storybook/react';
import Marked from 'storybook-readme/components/Marked';

import docObjectSearchCreate from '../docs/ObjectSearchCreate.md';
import { Card, FormCard, IFieldConfigObjectSearchCreate, IFieldConfigPartial } from '../src';

import {
  fakeField,
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
  .add('Form Stress Test (all)', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      {...omit(props, 'fieldSets')}
      fieldSets={(
        // tslint:disable-next-line no-magic-numbers
        Array(50)
          .fill(props.fieldSets[0])
          .map((fieldSet, idx) => (
            fieldSet.map((fieldConfig: IFieldConfigPartial) => ({
              ...fieldConfig,
              field: fieldConfig.field + idx,
            }))
          ))
      )}
    />
  ))
  .add('Form Stress Test (text)', () => (
    <FormCard
      {...formCardPropsFactory.build()}
      {...omit(props, 'fieldSets')}
      fieldSets={[
        // tslint:disable-next-line no-magic-numbers
        Array(159)
          .fill(null)
          .map(() => ({ field: fakeField(), type: 'text' }))]}
    />
  ))
  .add('Creating', () => <FormCard {...formCardPropsFactory.build()} {...omit(props, 'model')} />)
  .add('Editing', () => <FormCard {...formCardPropsFactory.build()} {...props} />)
  .add('Displaying', () => <Card {...props} />)
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
                { field: 'first_name', populateNameFromSearch: true },
                { field: 'last_name', populateNameFromSearch: true },
                { field: 'lawfirm', populateFromSearch: true },
                {
                  createFields: [{ field: 'name' }],
                  field: 'organization',
                  type: 'objectSearchCreate',
                },
              ],
              editProps: {
                addNewContent: <>Can't find it ? <a>Add new lawfirm</a></>,
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
