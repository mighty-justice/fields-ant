import faker from 'faker';

import { notification } from 'antd';

import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import httpStatus from 'http-status-codes';

describe('FormCard', () => {
  it('Edits text', async () => {
    const text = faker.lorem.sentence(),
      newText = faker.lorem.sentence(),
      title = 'testing',
      onSave = jest.fn().mockResolvedValue({}),
      props = {
        fieldSets: [[{ field: 'text', type: 'string' }]],
        model: { text },
        onSave,
        title,
      };

    const tester = await new Tester(FormCard, { props }).mount();

    tester.changeInput('input', newText);

    expect(onSave).not.toHaveBeenCalled();
    tester.submit();
    await tester.sleep();
    expect(onSave).toHaveBeenCalledWith({ text: newText });
  });

  it('Maps backend errors to fields on form', async () => {
    const nameError = faker.lorem.sentence(),
      otherError = faker.lorem.sentence(),
      response = {
        response: {
          data: {
            non_field_errors: [otherError],
            plaintiff: [{ name: [nameError] }],
          },
          status: httpStatus.BAD_REQUEST,
        },
      },
      name = faker.lorem.sentence(),
      onSave = jest.fn().mockRejectedValue(response),
      props = {
        fieldSets: [[{ field: 'name' }]],
        model: { name },
        onSave,
        title: 'Information',
      };

    const errorSpy = spyOn(notification, 'error');
    const tester = await new Tester(FormCard, { props }).mount();

    expect(notification.error).not.toHaveBeenCalled();
    expect(tester.text()).not.toContain(nameError);

    tester.submit();
    await tester.sleep();

    expect(notification.error).toHaveBeenCalled();
    const antErrorCall = errorSpy.calls.mostRecent();
    expect(JSON.stringify(antErrorCall)).toContain(otherError);
  });
});
