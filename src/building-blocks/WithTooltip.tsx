import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { Icon, Tooltip } from 'antd';

interface IProps {
  tooltip?: string;
}

@autoBindMethods
@observer
class WithTooltip extends Component<IProps> {
  public render() {
    const { tooltip, children } = this.props;

    if (!tooltip) {
      return children;
    }

    return (
      <span>
        {children}&nbsp;
        <Tooltip title={tooltip}>
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    );
  }
}

export default WithTooltip;
