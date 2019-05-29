import faker from 'faker';

import * as Antd from 'antd';

import { Tester } from '@mighty-justice/tester';

import { FormCard } from '../../src';
import httpStatus from 'http-status-codes';

describe('FormCard', () => {
  it('Edits text', async () => {
    const text = faker.lorem.sentence()
      , newText = faker.lorem.sentence()
      , title = 'testing'
      , onSave = jest.fn().mockResolvedValue({})
      , props = {
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
    expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);
  });

  it('Maps backend errors to fields on form', async () => {
    const nameError = faker.lorem.sentence()
      , otherError = faker.lorem.sentence()
      , response = {
        response: {
          data: {
            non_field_errors: [otherError],
            plaintiff: [{ name: [nameError] }],
          },
          status: httpStatus.BAD_REQUEST,
        },
      }
      , name = faker.lorem.sentence()
      , onSave = jest.fn().mockRejectedValue(response)
      , props = {
        fieldSets: [[{ field: 'name' }]],
        model: { name },
        onSave,
        title: 'Information',
      };

    spyOn(Antd.notification, 'error');
    const tester = await new Tester(FormCard, { props }).mount();

    expect(Antd.notification.error).not.toHaveBeenCalled();
    expect(tester.text()).not.toContain(nameError);

    tester.submit();
    await tester.sleep();

    expect(Antd.notification.error).toHaveBeenCalled();
    const antErrorCall = (Antd.notification.error as any).calls.mostRecent();
    expect(JSON.stringify(antErrorCall)).toContain(otherError);

    // Expect submit button to be disabled due to error.
    expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(1);
  });

  // Tests whether submit button correctly enables and disables.
  it('Submit button disables after error raised', async () => {
    const name = faker.lorem.sentence()
    , onSave = jest.fn()
    , props = {
      fieldSets: [[{ field: 'name', required: true }]],
      model: { name },
      onSave,
      title: 'Information',
    };

    const tester = await new Tester(FormCard, { props }).mount();
    expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);

    tester.changeInput('input', null);
    tester.click(tester.find('.ant-btn-primary'));
    expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(1);

    tester.changeInput('input', name);
    tester.click(tester.find('.ant-btn-primary'));
    expect(tester.find('.ant-btn-primary[disabled=true]').length).toBe(0);
  });
});
