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
        tester.getOptions = jest.fn();
      },
    },
    {
      name: 'getEndpoint',
      onBeforeMount: (tester) => {
        tester.getEndpoint = jest.fn();
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
