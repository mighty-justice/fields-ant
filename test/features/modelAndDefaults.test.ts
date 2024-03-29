import faker from 'faker';
import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, fakeField, fakeTextShort, TYPE_GENERATORS } from '../factories';
import { IFieldSetPartial } from '../../src';

interface ITestCase {
  data: object;
  fieldSets: IFieldSetPartial[];
  name: string;
}

const TEST_PAIRS: ITestCase[] = [
  {
    data: { name: faker.lorem.sentence() },
    fieldSets: [[{ field: 'name' }]],
    name: 'Simple field set',
  },
  {
    data: { lawfirm: { name: faker.lorem.sentence() } },
    fieldSets: [[{ field: 'lawfirm.name' }]],
    name: 'Simple field set',
  },

  // Generate simple field set for all types
  ...Object.keys(TYPE_GENERATORS).map(type => {
    const { valueFunction, fieldConfigFactory } = TYPE_GENERATORS[type],
      field = fakeField();

    return {
      data: { [field]: valueFunction() },
      fieldSets: [[fieldConfigFactory.build({ field })]],
      name: `fieldConfig type ${type}`,
    };
  }),
];

describe('Renders', () => {
  ['model', 'defaults'].forEach(propType => {
    TEST_PAIRS.forEach(({ data, fieldSets, name }) => {
      it(`Respects ${propType}: ${name}`, async () => {
        const { ComponentClass, propsFactory } = COMPONENT_GENERATORS['FormCard'],
          props = {
            ...propsFactory.build(),
            [propType]: data,
            fieldSets,
            onSave: jest.fn().mockResolvedValue({}),
          };

        const tester = await new Tester(ComponentClass, { props }).mount();
        expect(props.onSave).not.toHaveBeenCalled();
        await tester.submit();
        expect(props.onSave).toHaveBeenCalledWith(data);
      });
    });
  });

  it('Respects model over defaults', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS['FormCard'],
      props = {
        ...propsFactory.build(),
        defaults: { both: 'defaults', defaultsOnly: 'defaults' },
        fieldSets: [['modelOnly', 'both', 'defaultsOnly', 'neither'].map(field => ({ field }))],
        model: { modelOnly: 'model', both: 'model' },
        onSave: jest.fn().mockResolvedValue({}),
      },
      newNeither = fakeTextShort();

    const tester = await new Tester(ComponentClass, { props }).mount();
    expect(props.onSave).not.toHaveBeenCalled();
    await tester.submit();
    expect(props.onSave).toHaveBeenCalledWith({
      both: 'model',
      defaultsOnly: 'defaults',
      modelOnly: 'model',
      neither: '',
    });

    await tester.changeInput('input#neither', newNeither);
    await tester.submit();
    expect(props.onSave).toHaveBeenCalledWith({
      both: 'model',
      defaultsOnly: 'defaults',
      modelOnly: 'model',
      neither: newNeither,
    });
  });

  it('Respects value attribute over all else', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.FormCard,
      props = {
        ...propsFactory.build(),
        defaults: { both: 'defaults', defaultsOnly: 'defaults' },
        fieldSets: [['modelOnly', 'both', 'defaultsOnly', 'neither'].map(field => ({ field, value: 'value' }))],
        model: { modelOnly: 'model', both: 'model' },
        onSave: jest.fn().mockResolvedValue({}),
      },
      newNeither = fakeTextShort();

    const tester = await new Tester(ComponentClass, { props }).mount();
    expect(props.onSave).not.toHaveBeenCalled();
    await tester.submit();
    expect(props.onSave).toHaveBeenCalledWith({
      both: 'value',
      defaultsOnly: 'value',
      modelOnly: 'value',
      neither: 'value',
    });

    await tester.changeInput('input#neither', newNeither);
    await tester.submit();
    expect(props.onSave).toHaveBeenCalledWith({
      both: 'value',
      defaultsOnly: 'value',
      modelOnly: 'value',
      neither: newNeither,
    });
  });
});
