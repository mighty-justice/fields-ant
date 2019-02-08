import React from 'react';
import { Factory } from 'rosie';
import faker from 'faker';
import { format } from 'date-fns';
import { action } from '@storybook/addon-actions';
import { noop } from 'lodash';

import {
  Card,
  EditableCard,
  FormCard,
  SummaryCard,
} from '../src'

const dateRecent = () => format(faker.date.recent(), 'YY-MM-YY')
  , datetimeRecent = () => faker.date.recent().toISOString()
  , fakerPercentage = () => faker.random.number(1000) / 1000
  , textLong = () => faker.random.words(12)
  , textShort = () => faker.random.words(3)
  , attrSubFactory = (factory) => { return () => factory.build(); }
  , attrSubFactoryList = (factory, num) => { return () => factory.buildList(num || 3); }
  , attrRandom = (list) => { return () => sample(list); }
  , attrRandomGet = (list, getter) => { return () => get(sample(list), getter); }
  , field = () => faker.random.words(3).replace(/ /g, '_').toLowerCase()
  , attrNoop = () => noop
  , fakeObjectSearchCreate = () => ({ name: textShort(), id: faker.random.uuid() })
  ;


/*
 *   FIELD FACTORIES
 * = = = = = = = = = = = = = =
 */

export const fieldFactory = new Factory()
  .attrs({
    field,
  });

export const dateFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'date' });

export const moneyFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'money' });

export const percentageFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'percentage' });

export const radioFactory = new Factory()
  .extend(fieldFactory)
  .attrs({
    type: 'radio',
    options: [
      { value: 'first', name: 'First Item' },
      { value: 'second', name: 'Second Item' },
      { value: 'third', name: 'Third Item' },
    ],
  });

export const stringFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'string' });

export const textFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'text' });

export const objectSearchCreateFactory = new Factory()
  .extend(fieldFactory)
  .attrs({
    createFields: [{ field: 'name', required: true }],
    endpoint: '/endpoint/',
    type: 'objectSearchCreate',
  });


/*
 *   FIELD SET FACTORY
 * = = = = = = = = = = = = = =
 */

export const fieldSetFactory = new Factory()
  .attrs({
    fields: attrSubFactoryList(fieldFactory),
    legend: 'Legend',
  });


/*
 *   COMPONENT PROP FACTORIES
 * = = = = = = = = = = = = = =
 */

export const cardPropsFactory = new Factory()
  .attrs({
    fieldSets: attrSubFactoryList(fieldSetFactory),
    model: {},
    title: textShort,
  });

export const summaryCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
  });

export const formCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onSave: () => (data) => action('Form Save')(data),
  });

export const editableCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onDelete: attrNoop,
    onSave: attrNoop,
  });


/*
 *   COLLECTIONS
 * = = = = = = = = = = = = = =
 */

export const TYPE_GENERATORS = {
  date: { valueFunction: dateRecent, fieldConfigFactory: dateFactory },
  money: { valueFunction: faker.finance.amount, fieldConfigFactory: moneyFactory },
  objectSearchCreate: { valueFunction: () => {  }, fieldConfigFactory: objectSearchCreateFactory },
  percentage: { valueFunction: fakerPercentage, fieldConfigFactory: percentageFactory },
  radio: { valueFunction: () => 'first', fieldConfigFactory: radioFactory },
  string: { valueFunction: textShort, fieldConfigFactory: stringFactory },
  text: { valueFunction: textLong, fieldConfigFactory: textFactory },
};

export const COMPONENT_GENERATORS = {
  Card: { Component: Card, propsFactory: cardPropsFactory },
  EditableCard: { Component: EditableCard, propsFactory: editableCardPropsFactory },
  FormCard: { Component: FormCard, propsFactory: formCardPropsFactory },
  SummaryCard: { Component: SummaryCard, propsFactory: summaryCardPropsFactory },
};
