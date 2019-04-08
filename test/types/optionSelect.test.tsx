import { Tester } from '@mighty-justice/tester';
import faker from 'faker';

import { Card, FormCard, IFieldConfig } from '../../src';
import { fakeTextShort } from '../factories';
import Form from '../../src/components/Form';

const field = 'is_open'
  , optionType = 'yesNo'
  , expectedLabel = 'Is Open'
  , type = 'optionSelect'
  , fieldSets = [[{ field, type, optionType }]]
  , model = { is_open: 'true' }
  ;

describe('optionSelect', () => {
  it('Renders', async () => {
    const props = {
        fieldSets,
        model,
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain('Yes');
  });

  it('Edits', async () => {
    const onSave = jest.fn()
      , props = {
        fieldSets,
        model,
        onSave,
      };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain('Yes');
  });

  it('Handles array with single value (useful for summary tables)', async () => {
    const props = {
        fieldSets,
        model: { is_open: ['true'] },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).toContain('Yes');
  });

  it('Handles array with multiple values (useful for summary tables)', async () => {
    const props = {
        fieldSets,
        model: { is_open: ['true', 'false'] },
      };

    const tester = await new Tester(Card, { props }).mount();
    expect(tester.text()).toContain(expectedLabel);
    expect(tester.text()).not.toContain('No');
    expect(tester.text()).not.toContain('Yes');
    expect(tester.text()).not.toContain('2 Values');
  });

  it('Shows search for large data sets, or on command', async () => {
    // tslint:disable no-magic-numbers
    const states = Array(50).map((_v: any) => ({
        name: fakeTextShort(),
        value: faker.random.uuid(),
      }))
      , fieldConfig = { field, options: states, optionType: 'state', type };

    function getPropsFor (overrides: Partial<IFieldConfig> = {}) {
      return { props: { fieldSets: [[{ ...fieldConfig, ...overrides }]] } };
    }

    function isSearchable (tester: Tester) {
      return !!tester.find('input').length;
    }

    async function expectIsSearchable (overrides: Partial<IFieldConfig>, tobe: boolean)  {
      const tester = await new Tester(Form, getPropsFor(overrides)).mount();
      expect(isSearchable(tester)).toBe(tobe);
     }

    expectIsSearchable({}, true);
    expectIsSearchable({ showSearch: false }, false);

    expectIsSearchable({ options: states.slice(0, 5) }, false);
    expectIsSearchable({ options: states.slice(0, 5), showSearch: true }, true);
  });
});
