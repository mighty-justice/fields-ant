import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';

interface IProps {
  className?: any;
  children?: any;
}

@autoBindMethods
class ButtonToolbar extends Component<IProps> {
  public render () {
    return <div {...this.props} className={cx(this.props.className, 'button-toolbar')}>{this.props.children}</div>;
  }
}

export default ButtonToolbar;
