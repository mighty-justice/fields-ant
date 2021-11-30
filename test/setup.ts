// Core runtime basics
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';
import addons, { mockChannel } from '@storybook/addons';

import { TesterConfig } from '@mighty-justice/tester';

enzyme.configure({ adapter: new Adapter() });

addons.setChannel(mockChannel());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

TesterConfig.configure(enzyme, {
  hooks: [
    {
      name: 'getOptions',
      onBeforeMount: (tester: Tester) => {
        tester.getOptions = jest.fn((_optionName: string) => [
          { name: 'Yes', value: 'true' },
          { name: 'No', value: 'false' },
        ]);
      },
    },
    {
      name: 'getEndpoint',
      onBeforeMount: (tester: Tester) => {
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
      props: (tester: Tester) => ({
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
