/* global it, describe, expect */
import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS } from '../factories';

const SUPPORTING_COMPONENTS = [
  'Form',
  'FormCard',
];

const rowProps = { gutter: 32 }
  , fieldSetsWithout = [
    {
      fields: [
        { field: 'plaintiff.first_name' },
        { field: 'plaintiff.last_name' },
      ],
      legend: 'Who is the plaintiff?',
    },
    {
      fields: [
        { field: 'attorney.first_name' },
        { field: 'attorney.last_name' },
      ],
      legend: 'Who is the attorney?',
    },
  ]
  , fieldSetsWith = [
    {
      fields: [
        { field: 'plaintiff.first_name' },
        { field: 'plaintiff.last_name' },
      ],
      legend: 'Who is the plaintiff?',
      rowProps,
    },
    {
      fields: [
        { field: 'attorney.first_name' },
        { field: 'attorney.last_name' },
      ],
      legend: 'Who is the attorney?',
      rowProps,
    },
  ]
  ;

describe('colProps', () => {
  SUPPORTING_COMPONENTS.forEach(componentName => {
    it(`Renders colProps in ${componentName}`, async () => {
      const { Component, propsFactory } = COMPONENT_GENERATORS[componentName]
        , propsWithout = propsFactory.build({ fieldSets: fieldSetsWithout })
        , propsWith = { ...propsWithout, fieldSets: fieldSetsWith }
        , expression = 'margin-left: -16px; margin-right: -16px;'
        ;

      const testerWithout = await new Tester(Component, { props: propsWithout }).mount();
      expect(testerWithout.html()).not.toContain(expression);

      const testerWith = await new Tester(Component, { props: propsWith }).mount();
      expect(testerWith.html()).toContain(expression);
    });
  });
});
