import faker from 'faker';

import { Tester } from '@mighty-justice/tester';

import { fillInFieldConfig } from '../../src';
import ObjectSearch from '../../src/inputs/ObjectSearch';

function getDefaults (overrides?: any) {
  const fakeLawFirm = () => ({
      id: faker.random.uuid(),
      name: faker.company.companyName(),
    })
    , field = overrides.field || 'law_firm'
    , endpoint = overrides.endpoint || 'legal-organizations'
    , type = overrides.type || 'objectSearch'
    , fieldConfig = fillInFieldConfig({ field, type, endpoint, ...overrides.fieldConfig })
    , props = { id: field, fieldConfig, debounceWait: 0 }
    ;

  return {
    result: fakeLawFirm(),
    searchTerm: faker.lorem.sentence(),

    endpoint,
    field,
    fieldConfig,
    props,
    type,

    ...overrides,
  };
}

async function searchFor (tester: any, field: string, result: any, searchTerm: string) {
  tester.endpoints['/legal-organizations/'] = { results: [result] };

  // Change input without blurring
  const component = tester.find(`input#${field}`).first();
  component.simulate('focus');
  component.simulate('change', { target: { value: searchTerm } });

  await tester.refresh();
}

describe('objectSearch', () => {
  it('Properly caches and displays options', async () => {
    const { field, searchTerm, result, props, endpoint } = getDefaults({})
      , tester = (await new Tester(ObjectSearch, { props }).mount() as any);

    expect(tester.getEndpoint.mock.calls.length).toBe(0);

    // First search
    tester.endpoints['/legal-organizations/'] = { results: [result] };
    await searchFor(tester, field, result, searchTerm);
    expect(tester.getEndpoint.mock.calls.length).toBe(1);

    // Re-focus but no new props
    tester.instance.onFocus();
    expect(tester.getEndpoint.mock.calls.length).toBe(1);

    // Re-focus but with new props
    const newEndpoint = `${endpoint}-2`;
    tester.endpoints[newEndpoint] = { results: [result] };
    props.fieldConfig.endpoint = newEndpoint;
    tester.instance.onFocus();
    expect(tester.getEndpoint.mock.calls.length).toBe(2);
  });
});
