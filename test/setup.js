import "@babel/polyfill";
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';
import faker from 'faker';

import { TesterConfig } from '@mighty-justice/tester';

enzyme.configure({ adapter: new Adapter() });

TesterConfig.configure(enzyme, {
  hooks: [
    {
      name: 'getOptions',
      onBeforeMount: (tester) => {
        tester.getOptions = jest.fn(optionName => [{ name: 'Yes', value: 'true' }, { name: 'No', value: 'false' }]);
      },
    },
    {
      name: 'getEndpoint',
      onBeforeMount: (tester) => {
        tester.endpoints = {
          '/legal-organizations/': [{ id: faker.random.uuid(), name: faker.company.companyName() }],
        };
        tester.getEndpoint = jest.fn(endpoint => {
          if (tester.endpoints[endpoint]) {
            return tester.endpoints[endpoint];
          }

          throw new Error(`Uncovered endpoint: ${endpoint}`);
        });
      },
    },
    {
      component: Provider,
      name: 'appState',
      props: (tester) => {
        return {
          getEndpoint: tester.getEndpoint,
          getOptions: tester.getOptions,
        };
      },
    },
  ],
  profiles: [
    {
      name: 'Default',
      appState: true,
      getEndpoint: true,
      getOptions: true,
    },
  ],
});
