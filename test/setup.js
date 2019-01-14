import "@babel/polyfill";
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TesterConfig } from '@mighty-justice/tester';

enzyme.configure({ adapter: new Adapter() });

TesterConfig.configure(enzyme, {
  hooks: [],
  profiles: [],
});
