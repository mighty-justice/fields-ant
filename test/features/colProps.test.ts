import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = ['Form', 'FormCard'];

const colProps = { span: 12 },
  fieldSetsWithout = [
    {
      fields: [{ field: 'plaintiff.first_name' }, { field: 'plaintiff.last_name' }],
      legend: 'Who is the plaintiff?',
    },
    [{ field: 'attorney.first_name' }, { field: 'attorney.last_name' }],
  ],
  fieldSetsWith = [
    {
      fields: [
        { colProps, field: 'plaintiff.first_name' },
        { colProps, field: 'plaintiff.last_name' },
      ],
      legend: 'Who is the plaintiff?',
    },
    [
      { colProps, field: 'attorney.first_name' },
      { colProps, field: 'attorney.last_name' },
    ],
  ];

describe('colProps', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Renders colProps in ${componentName}`, async () => {
      const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName],
        propsWithout = propsFactory.build({ fieldSets: fieldSetsWithout }),
        propsWith = { ...propsWithout, fieldSets: fieldSetsWith };

      const testerWithout = await new Tester(ComponentClass, { props: propsWithout }).mount();
      expect(testerWithout.find('.ant-row div.ant-col-12').length).toBe(0);

      const testerWith = await new Tester(ComponentClass, { props: propsWith }).mount();
      expect(testerWith.find('.ant-row div.ant-col-12').length).toBe(4);
    });
  });
});
