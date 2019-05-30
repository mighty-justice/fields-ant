import { Tester } from '@mighty-justice/tester';
import { get } from 'lodash';

import { COMPONENT_GENERATORS } from '../factories';

describe('Renders', () => {
  Object.keys(COMPONENT_GENERATORS).forEach(componentName => {
    it(`Renders ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName]
        , props = propsFactory.build()
        , tester = await new Tester(ComponentClass, { props }).mount();

      expect(tester.text().length > 10).toBe(true);

      // If there's a title in the props, look for it
      const title = get(props, 'title');
      if (title) {
        expect(tester.text()).toContain(title);
      }

      // If we can find the first field, do a basic check for the label
      const firstField = get(props, 'fieldSets[0].fields[0].field');
      if (firstField) {
        const labelJustChars = firstField.replace(/[^a-z]/g, '')
          , renderJustChars = tester.text().toLowerCase().replace(/[^a-z]/g, '');

        expect(renderJustChars).toContain(labelJustChars);
      }
    });
  });
});
