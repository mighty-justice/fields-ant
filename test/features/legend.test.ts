import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, fakeTextShort } from '../factories';

async function expectEditExpect(tester: any, toContain: string) {
  expect(tester.text()).toContain(toContain);
  expect(tester.find('input').length > 0).toBe(false);

  tester.find(`button.btn-edit`).simulate('click');
  await tester.refresh();

  expect(tester.text()).toContain(toContain);
  expect(tester.find('input').length > 0).toBe(true);
}

describe('legend', () => {
  it('Handles legend attribute in complex fieldSet', async () => {
    const legend = fakeTextShort(),
      { ComponentClass, propsFactory } = COMPONENT_GENERATORS.EditableCard,
      props = propsFactory.build({ fieldSets: [{ legend, fields: [{ field: 'string' }] }] }),
      tester = await new Tester(ComponentClass, { props }).mount();

    await expectEditExpect(tester, legend);
  });

  it('Handles empty legend in complex fieldSet', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.EditableCard,
      props = propsFactory.build({ fieldSets: [{ legend: '', fields: [{ field: 'string' }] }] }),
      tester = await new Tester(ComponentClass, { props }).mount();

    await expectEditExpect(tester, 'String');
  });

  it('Handles no legend in complex fieldSet', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.EditableCard,
      props = propsFactory.build({ fieldSets: [{ fields: [{ field: 'string' }] }] }),
      tester = await new Tester(ComponentClass, { props }).mount();

    await expectEditExpect(tester, 'String');
  });
});
