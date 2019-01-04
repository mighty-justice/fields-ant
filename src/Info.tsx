import React from 'react';
import cx from 'classnames';

import * as Antd from 'antd';

const CARD_COL_LABEL = 8;

const CARD_COL_VALUE = 16;

const Info = (props: any) => (
  <Antd.Row {...props} className={cx(props.className, 'info')}>{props.children}</Antd.Row>
);

const Label = (props: any) => (
  <Antd.Col span={CARD_COL_LABEL} className={cx(props.className, 'col-label')}>{props.children}</Antd.Col>
);

const Value = (props: any) => (
  <Antd.Col span={CARD_COL_VALUE} className={cx(props.className, 'col-value')}>{props.children}</Antd.Col>
);

export default Info;

export {
  CARD_COL_LABEL,
  CARD_COL_VALUE,
  Label,
  Value,
};
