import { Tester } from '@mighty-justice/tester';
import { COMPONENT_GENERATORS, FORM_COMPONENTS } from '../factories';

describe('setRefFormManager', () => {
  FORM_COMPONENTS.forEach(componentName => {
    it(`${componentName} calls setRefFormManager`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        setRefFormManager = jest.fn(),
        props = propsFactory.build({ setRefFormManager });

      await new Tester(ComponentClass, { props }).mount();
      expect(setRefFormManager).toHaveBeenCalledTimes(1);
    });
  });
});
