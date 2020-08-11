import { Tester } from '@mighty-justice/tester';

import { COMPONENT_GENERATORS, fakeTextShort } from '../factories';
import * as Antd from 'antd';

describe('successText', () => {
  it('With no successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form
      , props = propsFactory.build({ fieldSets: [] })
      , tester = await new Tester(ComponentClass, { props }).mount()
      ;

    spyOn(Antd.notification, 'success');
    expect(Antd.notification.success).not.toHaveBeenCalled();
    await tester.submit();
    expect(Antd.notification.success).toHaveBeenCalledWith({
      description: '',
      duration: 3,
      message: 'Success',
    });
  });

  it('With successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form
      , successText = fakeTextShort()
      , props = propsFactory.build({ fieldSets: [], successText })
      , tester = await new Tester(ComponentClass, { props }).mount()
      ;

    spyOn(Antd.notification, 'success');
    expect(Antd.notification.success).not.toHaveBeenCalled();
    await tester.submit();
    expect(Antd.notification.success).toHaveBeenCalledWith({
      description: '',
      duration: 3,
      message: successText,
    });
  });

  it('With null successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form
      , successText = null
      , props = propsFactory.build({ fieldSets: [], successText })
      , tester = await new Tester(ComponentClass, { props }).mount()
      ;

    spyOn(Antd.notification, 'success');
    expect(Antd.notification.success).not.toHaveBeenCalled();
    await tester.submit();
    expect(Antd.notification.success).not.toHaveBeenCalled();
  });
});
