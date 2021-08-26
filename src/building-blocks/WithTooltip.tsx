import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

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
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    );
  }
}

export default WithTooltip;
