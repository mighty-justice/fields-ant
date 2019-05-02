import React from 'react';

import { Icon, Tooltip } from 'antd';

export function renderWithTooltip (label: string | null, tooltip: string) {
  return (
    <span>
      {label}&nbsp;
      <Tooltip title={tooltip}>
        <Icon type='question-circle-o' />
      </Tooltip>
    </span>
  );
}
