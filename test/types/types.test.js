/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard } from '../../src';
import { TYPE_GENERATORS } from '../factories';

const expectedValue = {
  objectSearchCreate: [{ name: 'Example Co.' }, 'Example Co.'],
  date: ['2017-11-22', '11/22/17'],
  percentage: ['0.278', '27.80%'],
  radio: ['second', 'Second Item']
};

Object.keys(TYPE_GENERATORS).forEach(type => {
  const { fieldConfigFactory, valueFunction } = TYPE_GENERATORS[type]
    , fieldConfig = fieldConfigFactory.build()
    , fieldSets = [[fieldConfig]]
    , randomValue = valueFunction()
    , [value, rendered] = expectedValue[type] || [randomValue, randomValue]
    , model = { [fieldConfig.field]: value }
    ;

  describe(type, () => {
    it('Renders', async () => {
      const props = { fieldSets, model };

      // Renders empty placeholder
      const withoutData = await new Tester(Card, { props: { ...props, model: {} }}).mount();
      expect(withoutData.text()).not.toContain(rendered);
      expect(withoutData.text()).toContain('--');

      // Renders formatted value
      const withData = await new Tester(Card, { props }).mount();
      expect(withData.text()).toContain(rendered);
      expect(withData.text()).not.toContain('--');
    });

    it('Edits', async () => {
      const onSave = jest.fn()
        , props = { fieldSets, model, onSave };

      // Renders formatted value
      const tester = await new Tester(FormCard, { props }).mount();
      expect(onSave).not.toHaveBeenCalled();
      tester.find('form').simulate('submit');
      expect(onSave).toHaveBeenCalledWith(model);
    });
  });
});
