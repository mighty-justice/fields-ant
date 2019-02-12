import '@babel/polyfill';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';

import { TesterConfig } from '@mighty-justice/tester';

enzyme.configure({ adapter: new Adapter() });

TesterConfig.configure(enzyme, {
  hooks: [
    {
      name: 'getOptions',
      onBeforeMount: (tester: any) => {
        tester.getOptions = jest.fn((_optionName: string) => [
          { name: 'Yes', value: 'true' },
          { name: 'No', value: 'false' },
        ]);
      },
    },
    {
      name: 'getEndpoint',
      onBeforeMount: (tester: any) => {
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
      props: (tester: any) => ({
        getEndpoint: tester.getEndpoint,
        getOptions: tester.getOptions,
      }),
    },
  ],
  profiles: [
    {
      appState: true,
      getEndpoint: true,
      getOptions: true,
      name: 'Default',
    },
  ],
});
