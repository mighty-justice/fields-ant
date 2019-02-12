/* global it, describe, expect */
import React from 'react';

import { Tester } from '@mighty-justice/tester';

import { Card, FormCard, TYPES } from '../../src';
import { TYPE_GENERATORS } from '../factories';

const SKIP = null;

const expectedValue = {
  boolean: [true, 'Yes'],
  date: ['2017-11-22', '11/22/17'],
  objectSearchCreate: [{ name: 'Example Co.' }, 'Example Co.'],
  optionSelect: ['second', 'Second Item'],
  percentage: ['0.278', '27.80%'],
  radio: ['second', 'Second Item'],
  rating: ['3', SKIP],
};

describe('Types', () => {
  it('Tests all types', async () => {
    expect(Object.keys(TYPE_GENERATORS)).toEqual(Object.keys(TYPES));
  });
});

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
      rendered && expect(withoutData.text()).not.toContain(rendered);
      expect(withoutData.text()).toContain('--');

      // Renders formatted value
      const withData = await new Tester(Card, { props }).mount();
      rendered && expect(withData.text()).toContain(rendered);
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
