import { Factory } from 'rosie';
import faker from 'faker';
import { format } from 'date-fns';
import { action } from '@storybook/addon-actions';
import { noop, sample } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';

import {
  ArrayCard,
  Card,
  EditableArrayCard,
  EditableCard,
  FormCard,
  FormDrawer,
  FormModal,
  SummaryCard,
} from '../src';

import { IValue } from '../src/props';

const onSave = () => (data: any) => action('onSave')(data)
  // fake* functions take no arguments and return values when called
  // These are used, uncalled, in factory attr lists
  , fakeTextShort = () => faker.random.words(3)

  , fakeBoolean = () => sample([true, false])
  , fakeDateRecent = () => format(faker.date.recent(), 'YYYY-MM-DD')
  , fakeDuration = () => faker.helpers.replaceSymbolWithNumber('P#Y')
  , fakeField = () => faker.random.words(3).replace(/[^A-Za-z ]/g, '').replace(/ /g, '_').toLowerCase()
  , fakeObjectSearchCreate = () => ({ name: fakeTextShort(), id: faker.random.uuid() })
  , fakeRate = () => faker.random.number(4) + 1
  , fakerPercentage = () => faker.random.number(1000) / 1000
  , fakeTextLong = () => faker.random.words(12)

  // attr* functions return fake* functions when called
  // These are used, called, in factory attr lists
  , attrNumber = (num = 1000) => () => faker.random.number(num)
  , attrSubFactoryList = (factory: any, num?: number) => () => factory.buildList(num || 3)
  ;

/*
 *   FIELD FACTORIES
 * = = = = = = = = = = = = = =
 */

export const fieldFactory = new Factory()
  .attrs({
    field: fakeField,
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
    options: [
      { value: 'first', name: 'First Item' },
      { value: 'second', name: 'Second Item' },
      { value: 'third', name: 'Third Item' },
    ],
    type: 'radio',
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

export const ratingFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'rating' });

export const booleanFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'boolean' });

export const durationFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'duration' });

export const emailFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'email' });

export const numberFactory = new Factory()
  .extend(fieldFactory)
  .attrs({ type: 'number' });

export const optionSelectFactory = new Factory()
  .extend(fieldFactory)
  .attrs({
    options: [
      { value: 'first', name: 'First Item' },
      { value: 'second', name: 'Second Item' },
      { value: 'third', name: 'Third Item' },
    ],
    type: 'optionSelect',
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
    title: fakeTextShort,
  });

export const summaryCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
  });

export const formCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onSave,
  });

export const editableCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onDelete: noop,
    onSave,
  });

export const arrayCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    model: [{ id: faker.random.uuid() }],
  });

export const editableArrayCardPropsFactory = new Factory()
  .extend(arrayCardPropsFactory)
  .attrs({
    onDelete: noop,
    onSave,
  });

export const formDrawerPropsFactory = new Factory()
  .extend(formCardPropsFactory)
  .attrs({
    isVisible: () => new SmartBool(true),
  });

export const formModalPropsFactory = new Factory()
  .extend(formCardPropsFactory)
  .attrs({
  });

/*
 *   COLLECTIONS
 * = = = = = = = = = = = = = =
 */

interface ITypeGenerators {
  [key: string]: {
    fieldConfigFactory: any,
    valueFunction: () => IValue,
  };
}

export const TYPE_GENERATORS: ITypeGenerators = {
  boolean: { valueFunction: fakeBoolean, fieldConfigFactory: booleanFactory },
  date: { valueFunction: fakeDateRecent, fieldConfigFactory: dateFactory },
  duration: { valueFunction: fakeDuration, fieldConfigFactory: durationFactory },
  email: { valueFunction: faker.internet.email, fieldConfigFactory: emailFactory },
  money: { valueFunction: faker.finance.amount, fieldConfigFactory: moneyFactory },
  number: { valueFunction: attrNumber(), fieldConfigFactory: numberFactory },
  objectSearchCreate: { valueFunction: fakeObjectSearchCreate, fieldConfigFactory: objectSearchCreateFactory },
  optionSelect: { valueFunction: () => 'first', fieldConfigFactory: optionSelectFactory },
  percentage: { valueFunction: fakerPercentage, fieldConfigFactory: percentageFactory },
  radio: { valueFunction: () => 'first', fieldConfigFactory: radioFactory },
  rating: { valueFunction: fakeRate, fieldConfigFactory: ratingFactory },
  string: { valueFunction: fakeTextShort, fieldConfigFactory: stringFactory },
  text: { valueFunction: fakeTextLong, fieldConfigFactory: textFactory },
};

interface IComponentGenerators {
  [key: string]: {
    Component: any,
    propsFactory: { build: (overrides?: object) => object },
  };
}

export const COMPONENT_GENERATORS: IComponentGenerators = {
  ArrayCard: { Component: ArrayCard, propsFactory: arrayCardPropsFactory },
  Card: { Component: Card, propsFactory: cardPropsFactory },
  EditableArrayCard: { Component: EditableArrayCard, propsFactory: editableArrayCardPropsFactory },
  EditableCard: { Component: EditableCard, propsFactory: editableCardPropsFactory },
  FormCard: { Component: FormCard, propsFactory: formCardPropsFactory },
  FormDrawer: { Component: FormDrawer, propsFactory: formDrawerPropsFactory },
  FormModal: { Component: FormModal, propsFactory: formModalPropsFactory },
  SummaryCard: { Component: SummaryCard, propsFactory: summaryCardPropsFactory },
};
