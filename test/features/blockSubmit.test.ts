import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

describe('blockSubmit', () => {
  it('Handles blockSubmit prop', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
      props = propsFactory.build({ fieldSets: [] }),
      withoutBlockSubmit = await new Tester(ComponentClass, { props }).mount(),
      withBlockSubmit = await new Tester(ComponentClass, { props: { ...props, blockSubmit: true } }).mount();

    expect(withoutBlockSubmit.find('button[type="submit"]').hasClass('ant-btn-block')).toBe(false);
    expect(withBlockSubmit.find('button[type="submit"]').hasClass('ant-btn-block')).toBe(true);
  });
});
