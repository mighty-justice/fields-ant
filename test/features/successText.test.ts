import { Tester } from '@mighty-justice/tester';

import { notification } from 'antd';

import { TOAST_DURATION } from '../../src';
import { COMPONENT_GENERATORS, fakeTextShort } from '../factories';

describe('successText', () => {
  it('With no successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
      props = propsFactory.build({ fieldSets: [] }),
      tester = await new Tester(ComponentClass, { props }).mount();

    spyOn(notification, 'success');
    expect(notification.success).not.toHaveBeenCalled();
    await tester.submit();
    await tester.refresh();

    expect(notification.success).toHaveBeenCalledWith({
      description: '',
      duration: TOAST_DURATION,
      message: 'Success',
    });
  });

  it('With successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
      successText = fakeTextShort(),
      props = propsFactory.build({ fieldSets: [], successText }),
      tester = await new Tester(ComponentClass, { props }).mount();

    spyOn(notification, 'success');
    expect(notification.success).not.toHaveBeenCalled();
    await tester.submit();
    await tester.refresh();

    expect(notification.success).toHaveBeenCalledWith({
      description: '',
      duration: TOAST_DURATION,
      message: successText,
    });
  });

  it('With null successText', async () => {
    const { ComponentClass, propsFactory } = COMPONENT_GENERATORS.Form,
      successText = null,
      props = propsFactory.build({ fieldSets: [], successText }),
      tester = await new Tester(ComponentClass, { props }).mount();

    spyOn(notification, 'success');
    expect(notification.success).not.toHaveBeenCalled();
    await tester.submit();
    await tester.refresh();

    expect(notification.success).not.toHaveBeenCalled();
  });
});
