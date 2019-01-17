import React from 'react';
import faker from 'faker';

import { storiesOf } from '@storybook/react';
import { withInfo } from "@storybook/addon-info";

import Card from '../src/components/Card';

const props = {
    cardConfig: {
      fieldSets: [
        ['string', 'money'].map(s => ({ field: s, type: s })),
      ],
      title: 'Working Title',
    },
    model: {
      string: faker.lorem.sentence(),
      money: faker.finance.amount(),
    },
  };


storiesOf('Components', module)
  .add('Card', withInfo({ inline: true })(() => (
    <Card {...props} />
  )))
  ;

