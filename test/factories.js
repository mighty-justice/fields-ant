import React from 'react';
import { Factory } from 'rosie';
import faker from 'faker';
import { format } from 'date-fns';
import { action } from '@storybook/addon-actions';

const dateRecent = () => format(faker.date.recent(), 'YY-MM-YY')
  , datetimeRecent = () => faker.date.recent().toISOString()
  , fakerPercentage = () => faker.random.number(1000) / 1000
  , textLong = () => faker.random.words(12)
  , textShort = () => faker.random.words(3)
  , attrSubFactory = (factory) => { return () => factory.build(); }
  , attrSubFactoryList = (factory, num) => { return () => factory.buildList(num || 3); }
  , attrRandom = (list) => { return () => sample(list); }
  , attrRandomGet = (list, getter) => { return () => get(sample(list), getter); }
  , field = () => faker.random.words(3).replace(' ', '_')
  ;

export const FIELD_CONFIGS = {
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
};

export function fieldConfigFor (type) {
  return {
    field: field(),
    type,
    ...FIELD_CONFIGS[type]
  }
}

export const TYPE_DATA = {
  date: dateRecent,
  money: faker.finance.amount,
  objectSearchCreate: () => null,
  percentage: fakerPercentage,
  radio: () => 'first',
  string: textShort,
  text: textLong,
};

export const fieldFactory = new Factory()
  .attrs({
    field,
  });

export const objectSearchCreateFactory = new Factory()
  .extend(fieldFactory)
  .attrs({
    createFields: [{ field: 'name', required: true }],
    endpoint: '/endpoint/',
    type: 'objectSearchCreate',
  });

export const fieldSetFactory = new Factory()
  .attrs({
    fields: attrSubFactoryList(fieldFactory),
    endpoint: '/endpoint/',
  });

export const formCardPropsFactory = new Factory()
  .attrs({
    fieldSets: attrSubFactoryList(fieldSetFactory),
    onSave: () => (data) => action('Form Save')(data),
  });
