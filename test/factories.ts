import { Factory } from 'rosie';
import faker from 'faker';
import { format } from 'date-fns';
import { action } from '@storybook/addon-actions';
import { fromPairs, sample, zipWith } from 'lodash';

import SmartBool from '@mighty-justice/smart-bool';
import Tester from '@mighty-justice/tester/dist/tester';

import {
  ArrayCard,
  Card,
  EditableArrayCard,
  EditableCard,
  Form,
  FormCard,
  FormDrawer,
  FormModal,
  IFieldConfig,
  SummaryCard,
} from '../src';

import { IValue } from '../src/props';
import Table from '../src/components/Table';

export function getEmptyValue (fieldConfig: IFieldConfig) {
  if (fieldConfig.type === 'checkbox') { return false; }
  return fieldConfig.nullify ? null : '';
}

export async function sleep (ms: number = 0) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

function actionFunctionFor (name: string) {
  return () => async (data: any) => {
    await sleep();
    action(name)(data);
  };
}

export const onSave = actionFunctionFor('onSave');
export const onCreate = actionFunctionFor('onCreate');
export const onDelete = actionFunctionFor('onDelete');

// fake* functions take no arguments and return values when called
// These are used, uncalled, in factory attr lists
export const fakeTextShort = () => faker.random.words(3);

export const fakeAddress = () => ({
  address1: fakeTextShort(),
  address2: fakeTextShort(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zip_code: faker.address.zipCode(),
});
export const fakeBoolean = () => sample([true, false]);
export const fakeDateRecent = () => format(faker.date.recent(), 'YYYY-MM-DD');
export const fakeDatePast = () => format(faker.date.past(100), 'YYYY-MM-DD');
export const fakeDuration = () => faker.helpers.replaceSymbolWithNumber('P#Y');
export const fakeEin = () => faker.helpers.replaceSymbolWithNumber('##-#######');
export const fakeField = () => faker.random.words(3).replace(/[^A-Za-z ]/g, '').replace(/ /g, '_').toLowerCase();
export const fakeObjectSearch = () => ({ name: fakeTextShort(), id: faker.random.uuid() });
export const fakerPercentage = () => sample(['1', Number(faker.helpers.replaceSymbolWithNumber('0.###')).toString()]);
export const fakeTextLong = () => faker.random.words(12);
export const fakeRate = () => faker.random.number(4) + 1;
export const fakeSsn = () => faker.helpers.replaceSymbolWithNumber('###-##-####');

// attr* functions return fake* functions when called
// These are used, called, in factory attr lists
export const attrNumber = (num = 1000) => () => faker.random.number(num);
export const attrSubFactoryList = (factory: any, num?: number) => () => factory.buildList(num || 3);

/*
 *   FIELD FACTORIES
 * = = = = = = = = = = = = = =
 */

export const fieldFactory = new Factory()
  .attrs({ field: fakeField });

export function fieldFactoryForType (type: string) {
  return new Factory()
    .extend(fieldFactory)
    .attrs({ type });
}

export const booleanFactory = fieldFactoryForType('boolean');
export const checkboxFactory = fieldFactoryForType('checkbox');
export const dateFactory = fieldFactoryForType('date');
export const datepickerFactory = fieldFactoryForType('datepicker');
export const durationFactory = fieldFactoryForType('duration');
export const einFactory = fieldFactoryForType('ein');
export const emailFactory = fieldFactoryForType('email');
export const hiddenFactory = fieldFactoryForType('hidden');
export const moneyFactory = fieldFactoryForType('money');
export const numberFactory = fieldFactoryForType('number');
export const passwordFactory = fieldFactoryForType('password');
export const percentageFactory = fieldFactoryForType('percentage');
export const phoneFactory = fieldFactoryForType('phone');
export const ratingFactory = fieldFactoryForType('rating');
export const ssnFactory = fieldFactoryForType('ssn');
export const stringFactory = fieldFactoryForType('string');
export const textFactory = fieldFactoryForType('text');
export const urlFactory = fieldFactoryForType('url');

export const attrOptions = [
  { value: 'first', name: 'First Item' },
  { value: 'second', name: 'Second Item' },
  { value: 'third', name: 'Third Item' },
];

const addressDefinitions = (faker as any).definitions.address;
export const stateOptions = zipWith(
  addressDefinitions.state,
  addressDefinitions.state_abbr,
  function (state, stateAbbr) { return { name: state, value: stateAbbr }; },
);

export const addressFactory = fieldFactoryForType('address')
  .attrs({ stateProps: { options: stateOptions }});

export const radioFactory = fieldFactoryForType('radio')
  .attrs({ options: attrOptions });

export const optionSelectFactory = fieldFactoryForType('optionSelect')
  .attrs({ options: attrOptions });

export const objectSearchFactory = fieldFactoryForType('objectSearch')
  .attrs({
    endpoint: '/endpoint/',
  });

export const objectSearchCreateFactory = fieldFactoryForType('objectSearchCreate')
  .attrs({
    createFields: [{ field: 'name', required: true }],
    endpoint: '/endpoint/',
  });

export const organizationResultFactory = new Factory()
  .attrs({
    id: faker.random.uuid,
    name: faker.company.companyName,
  })

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

export const formPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onSave,
  });

export const formCardPropsFactory = new Factory()
  .extend(formPropsFactory)
  .attrs({});

export const editableCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    onDelete,
    onSave,
  });

export const arrayCardPropsFactory = new Factory()
  .extend(cardPropsFactory)
  .attrs({
    model: [{ id: faker.random.uuid() }],
  });

export const tablePropsFactory = new Factory()
  .extend(arrayCardPropsFactory)
  .attrs({});

export const editableArrayCardPropsFactory = new Factory()
  .extend(arrayCardPropsFactory)
  .attrs({
    onCreate,
    onDelete,
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
 *   FILL IN FUNCTIONS
 * = = = = = = = = = = = = = =
 */

type IFillInFunction = (tester: Tester, fieldConfig: IFieldConfig, value: IValue) => void;

export const fillInInputWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  await tester.changeInput(`input[id="${fieldConfig.field}"]`, value);
  await tester.refresh();
};

export const fillInTextWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  await tester.changeInput(`TextArea[id="${fieldConfig.field}"]`, value);
  await tester.refresh();
};

export const fillInRatingWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  console.error('fillInRatingWithValue');
  tester.debug();
  throw new Error();
  await tester.refresh();
};

export const fillInRadioWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  console.error('fillInRadioWithValue');
  tester.debug();
  throw new Error();
  await tester.refresh();
};

export const fillInPercentageWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  console.error('fillInPercentageWithValue');
  tester.debug();
  throw new Error();
  await tester.refresh();
};

export const fillInOptionSelectWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  console.error('fillInOptionSelectWithValue');
  tester.debug();
  throw new Error();
  await tester.refresh();
};

export const fillInDatePickerWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  console.error('fillInDatePickerWithValue');
  tester.debug();
  throw new Error();
  await tester.refresh();
};

export const fillInDateWithValue: IFillInFunction = async (tester, fieldConfig, value) => {
  const [month, day, year] = value.split('-').concat(['', '', '']);
  tester.changeInput(`input[id="${fieldConfig.field}.month"]`, month);
  tester.changeInput(`input[id="${fieldConfig.field}.day"]`, day);
  tester.changeInput(`input[id="${fieldConfig.field}.year"]`, year);
  await tester.refresh();
};

/*
 *   COLLECTIONS
 * = = = = = = = = = = = = = =
 */

interface ITypeGenerators {
  [key: string]: {
    fieldConfigFactory: any,
    fillInWithValue: (tester: Tester, fieldConfig: IFieldConfig, value: IValue) => void,
    valueFunction: () => IValue,
  };
}

export const TYPE_GENERATORS: ITypeGenerators = {
  address: {
    fieldConfigFactory: addressFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeAddress,
  },
  boolean: {
    fieldConfigFactory: booleanFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeBoolean,
  },
  checkbox: {
    fieldConfigFactory: checkboxFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeBoolean,
  },
  date: {
    fieldConfigFactory: dateFactory,
    fillInWithValue: fillInDateWithValue,
    valueFunction: fakeDatePast,
  },
  datepicker: {
    fieldConfigFactory: datepickerFactory,
    fillInWithValue: fillInDatePickerWithValue,
    valueFunction: fakeDateRecent,
  },
  duration: {
    fieldConfigFactory: durationFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeDuration,
  },
  ein: {
    fieldConfigFactory: einFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeEin,
  },
  email: {
    fieldConfigFactory: emailFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.internet.email,
  },
  hidden: {
    fieldConfigFactory: hiddenFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.random.uuid,
  },
  money: {
    fieldConfigFactory: moneyFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.finance.amount,
  },
  number: {
    fieldConfigFactory: numberFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: attrNumber(),
  },
  objectSearch: {
    fieldConfigFactory: objectSearchFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeObjectSearch,
  },
  objectSearchCreate: {
    fieldConfigFactory: objectSearchCreateFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeObjectSearch,
  },
  optionSelect: {
    fieldConfigFactory: optionSelectFactory,
    fillInWithValue: fillInOptionSelectWithValue,
    valueFunction: () => 'first',
  },
  password: {
    fieldConfigFactory: passwordFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.internet.password,
  },
  percentage: {
    fieldConfigFactory: percentageFactory,
    fillInWithValue: fillInPercentageWithValue,
    valueFunction: fakerPercentage,
  },
  phone: {
    fieldConfigFactory: phoneFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.phone.phoneNumber,
  },
  radio: {
    fieldConfigFactory: radioFactory,
    fillInWithValue: fillInRadioWithValue,
    valueFunction: () => 'first',
  },
  rating: {
    fieldConfigFactory: ratingFactory,
    fillInWithValue: fillInRatingWithValue,
    valueFunction: fakeRate,
  },
  ssn: {
    fieldConfigFactory: ssnFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeSsn,
  },
  string: {
    fieldConfigFactory: stringFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: fakeTextShort,
  },
  text: {
    fieldConfigFactory: textFactory,
    fillInWithValue: fillInTextWithValue,
    valueFunction: fakeTextLong,
  },
  url: {
    fieldConfigFactory: urlFactory,
    fillInWithValue: fillInInputWithValue,
    valueFunction: faker.internet.url,
  },
};

const addressValue = fakeAddress();
const SKIP = null;

export const valueRenderPairs: { [key: string]: [IValue, string | null] } = {
  // value: [valueFunction(), valueFunction()]
  ...fromPairs(Object.keys(TYPE_GENERATORS).map(type => {
    const value = TYPE_GENERATORS[type].valueFunction();
    return [type, [value, value]];
  })),

  address: [addressValue, addressValue.address1],
  boolean: sample([[true, 'Yes'], [false, 'No']]) as [boolean, string],
  checkbox: sample([[true, 'Yes'], [false, 'No']]) as [boolean, string],
  date: ['2017-11-22', '11/22/17'],
  datepicker: ['2017-11-22', '11/22/17'],
  hidden: [TYPE_GENERATORS.hidden.valueFunction(), SKIP],
  objectSearch: [{ name: 'Example Co.', id: faker.random.uuid() }, 'Example Co.'],
  objectSearchCreate: [{ name: 'Example Co.', id: faker.random.uuid() }, 'Example Co.'],
  optionSelect: ['second', 'Second Item'],
  password: [TYPE_GENERATORS.password.valueFunction(), '********'],
  percentage: ['0.278', '27.80%'],
  phone: ['555-995-1669', '(555) 995-1669'],
  radio: ['second', 'Second Item'],
  rating: [TYPE_GENERATORS.rating.valueFunction(), SKIP],
};

export interface IComponentGenerator {
  ComponentClass: any;
  propsFactory: { build: (overrides?: object) => object };
}

export interface IComponentGenerators {
  [key: string]: IComponentGenerator;
}

export const COMPONENT_GENERATORS: IComponentGenerators = {
  ArrayCard: { ComponentClass: ArrayCard, propsFactory: arrayCardPropsFactory },
  Card: { ComponentClass: Card, propsFactory: cardPropsFactory },
  EditableArrayCard: { ComponentClass: EditableArrayCard, propsFactory: editableArrayCardPropsFactory },
  EditableCard: {ComponentClass: EditableCard, propsFactory: editableCardPropsFactory },
  Form: { ComponentClass: Form, propsFactory: formPropsFactory },
  FormCard: { ComponentClass: FormCard, propsFactory: formCardPropsFactory },
  FormDrawer: { ComponentClass: FormDrawer, propsFactory: formDrawerPropsFactory },
  FormModal: { ComponentClass: FormModal, propsFactory: formModalPropsFactory },
  SummaryCard: { ComponentClass: SummaryCard, propsFactory: summaryCardPropsFactory },
  Table: { ComponentClass: Table, propsFactory: tablePropsFactory },
};
