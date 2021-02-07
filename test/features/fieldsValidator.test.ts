import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';
import { IFieldConfig, IFieldSetPartial } from '../../src';
import { IModel } from '../../src/props';

const TEST_PAIRS: Array<{ name: string; fieldSets: IFieldSetPartial[]; newTarget: string }> = [
  {
    fieldSets: [
      [
        {
          field: 'target',
          formValidationRules: {
            ruleName: {
              fieldsValidator: (value: string) => value === 'new',
            },
          },
        },
      ],
    ],
    name: 'basic',
    newTarget: 'new',
  },
  {
    fieldSets: [
      [
        {
          field: 'target',
        },
        {
          field: 'not_target',
          formValidationRules: {
            ruleName: {
              fieldsValidator: (_value: string, _fieldConfig: IFieldConfig, model: IModel) => model['target'] === 'new',
            },
          },
        },
      ],
    ],
    name: 'another field',
    newTarget: 'new',
  },
  {
    fieldSets: [
      [
        {
          field: 'target',
          formValidationRules: {
            ruleName: {
              required: true,
            },
          },
        },
      ],
    ],
    name: 'original required',
    newTarget: 'new',
  },
  {
    fieldSets: [
      [
        {
          field: 'target',
          formValidationRules: {
            ruleName: {
              fieldsValidator: (value: string) => !!value,
            },
          },
        },
      ],
    ],
    name: 'manual required',
    newTarget: 'new',
  },
];

describe('fieldsValidator', () => {
  TEST_PAIRS.forEach(({ fieldSets, name, newTarget }) => {
    it(`Validates ${name} test`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
        onSave = jest.fn(),
        props = propsFactory.build({ fieldSets, onSave }),
        tester = await new Tester(ComponentClass, { props }).mount();

      expect(onSave).not.toHaveBeenCalled();
      tester.submit();
      expect(onSave).not.toHaveBeenCalled();
      tester.changeInput('input#target', newTarget);
      tester.submit();
      expect(onSave).toHaveBeenCalled();
    });
  });
});
