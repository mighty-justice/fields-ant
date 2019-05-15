import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { Button } from 'antd';

import { storiesOf } from '@storybook/react';
import SmartBool from '@mighty-justice/smart-bool';

import { withInfoConfigured } from '../.storybook/config';
import { COMPONENT_GENERATORS } from '../test/factories';

const componentStories = storiesOf('Components', module)
  .addDecorator(withInfoConfigured)
  ;

const BUTTON_WRAP = ['FormModal', 'FormDrawer'];

@autoBindMethods
@observer
class ButtonWrap extends Component<{ showComponent: SmartBool }> {
  public render () {
    return (
      <div>
        <Button onClick={this.props.showComponent.toggle}>Open</Button>
        {this.props.showComponent.isTrue && (
          this.props.children
        )}
      </div>
    );
  }
}

Object.keys(COMPONENT_GENERATORS).forEach(componentName => {
  const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName];
  componentStories.add(componentName, () => {
    if (BUTTON_WRAP.includes(componentName)) {
      const showComponent = new SmartBool();

      return (
        <ButtonWrap showComponent={showComponent}>
          <ComponentClass
            {...propsFactory.build()}
            isVisible={showComponent}
            onCancel={showComponent.setFalse}
          />
        </ButtonWrap>
      );
    }

    return <ComponentClass {...propsFactory.build()} />;
  });
});
