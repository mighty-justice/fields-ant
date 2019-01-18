import "@babel/polyfill";
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';

import { TesterConfig } from '@mighty-justice/tester';

enzyme.configure({ adapter: new Adapter() });

TesterConfig.configure(enzyme, {
  hooks: [
    {
      name: 'getOptions',
      onBeforeMount: (tester) => {
        tester.getOptions = jest.fn().mockResolvedValue({
          results: [{ name: 'Yes', value: 'true' }, { name: 'No', value: 'false' }],
        });
      },
    },
    {
      name: 'getEndpoint',
      onBeforeMount: (tester) => {
        tester.endpoints = {};
        tester.getEndpoint = jest.fn(endpoint => {
          const endpointNoParams = endpoint.split('?').shift();

          if (tester.endpoints[endpointNoParams]) {
            return tester.endpoints[endpointNoParams];
          }

          throw new Error(`Uncovered endpoint: ${endpointNoParams}`);
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
