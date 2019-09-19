import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { fillInFieldConfig, FormCard } from '../../src';
import { organizationResultFactory } from '../factories';
import ObjectSearch from '../../src/inputs/ObjectSearch';

function getFormDefaults (overrides?: any) {
  const field = overrides.field || 'law_firm'
    , endpoint = '/legal-organizations/'
    , type = overrides.type || 'objectSearch'
    , fieldConfig = fillInFieldConfig({
      editProps: { debounceWait: 0 },
      endpoint,
      field,
      type,
      ...overrides.fieldConfig,
    })
    , fieldSets = overrides.fieldSets || [[fieldConfig]]
    , onSave = jest.fn()
    , model = overrides.model || { law_firm: null }
    , props = { fieldSets, model, onSave }
    ;

  return {
    results: organizationResultFactory.buildList(3),
    searchTerm: faker.lorem.sentence(),

    endpoint,
    field,
    model,
    props,
    type,

    ...overrides,

    fieldConfig,
  };
}

function getComponentDefaults (overrides?: any) {
  const field = overrides.field || 'law_firm'
    , endpoint = '/legal-organizations/'
    , type = overrides.type || 'objectSearch'
    , fieldConfig = fillInFieldConfig({ field, type, endpoint, ...overrides.fieldConfig })
    , props = { id: field, fieldConfig, debounceWait: 0 }
    ;

  return {
    results: organizationResultFactory.buildList(3),
    searchTerm: faker.lorem.sentence(),

    endpoint,
    field,
    props,
    type,

    ...overrides,

    fieldConfig,
  };
}

export async function objectSearchFor (tester: any, field: string, results: any, searchTerm: string) {
  tester.endpoints['/legal-organizations/'] = { results };

  // Change input without blurring
  const component = tester.find(`input#${field}`).first();
  component.simulate('focus');
  component.simulate('change', { target: { value: searchTerm } });

  await tester.refresh();
}

describe('objectSearch', () => {
  it('Clears existing', async () => {
    const model = { law_firm: organizationResultFactory.build() }
      , { props } = getFormDefaults({ model })
      , tester = (await new Tester(FormCard, { props }).mount())
      , CLEAR_BUTTON = '.ant-select-selection__clear'
      ;

    expect(tester.html()).toContain(model.law_firm.name);
    expect(tester.find(CLEAR_BUTTON).length).toBe(1);

    tester.click(CLEAR_BUTTON);
    expect(tester.html()).not.toContain(model.law_firm.name);
    expect(tester.find(CLEAR_BUTTON).length).toBe(0);
  });

  it('Properly caches and displays options', async () => {
    const { field, searchTerm, results, props, endpoint } = getComponentDefaults({})
      , tester = (await new Tester(ObjectSearch, { props }).mount() as any)
      , newEndpoint = `${endpoint}2/`
      ;

    tester.endpoints[newEndpoint] = { results };

    expect(tester.getEndpoint.mock.calls.length).toBe(0);

    // First search
    await objectSearchFor(tester, field, results, searchTerm);
    expect(tester.getEndpoint.mock.calls.length).toBe(1);

    // Re-focus but no new props
    tester.instance.onFocus();
    expect(tester.getEndpoint.mock.calls.length).toBe(1);

    // Re-focus but with new props
    props.fieldConfig.endpoint = newEndpoint;
    tester.instance.onFocus();
    expect(tester.getEndpoint.mock.calls.length).toBe(2);
  });

  it('Can select multiple options', async () => {
    const overrides = { fieldConfig: { editProps: { selectProps: { mode: 'multiple' } } } }
      , { field, searchTerm, results, props } = getFormDefaults(overrides)
      , tester = (await new Tester(FormCard, { props }).mount())
      ;

    await objectSearchFor(tester, field, results, searchTerm);
    tester.click(tester.find('.ant-select-dropdown-menu-item').first());
    tester.click(tester.find('.ant-select-dropdown-menu-item').last());

    expect(tester.text()).toContain(results[0].name);
    expect(tester.text()).not.toContain(results[1].name);
    expect(tester.text()).toContain(results[2].name);
  });
});
