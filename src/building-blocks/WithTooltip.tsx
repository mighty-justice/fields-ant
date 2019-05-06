import React, { Component } from 'react';

import { Icon, Tooltip } from 'antd';

interface IProps {
  tooltip?: string;
}

class WithTooltip extends Component<IProps> {
  public render () {
    const { tooltip, children } = this.props;

    if (!tooltip) {
      return children;
    }

    return (
      <span>
        {children}&nbsp;
        <Tooltip title={tooltip}>
          <Icon type='question-circle-o'/>
        </Tooltip>
      </span>
    );
  }
}

export default WithTooltip;
