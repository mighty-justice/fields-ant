import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { Button } from 'antd';

import { storiesOf } from '@storybook/react';
import SmartBool from '@mighty-justice/smart-bool';

import { withInfoConfigured } from '../.storybook/config';
import { COMPONENT_GENERATORS, IComponentGenerator } from '../test/factories';

const componentStories = storiesOf('Components', module)
  .addDecorator(withInfoConfigured)
  ;

const BUTTON_WRAP = ['FormModal', 'FormDrawer'];

@autoBindMethods
@observer
class ButtonWrap extends Component<IComponentGenerator> {
  @observable private showComponent = new SmartBool();

  public render () {
    const { ComponentClass, propsFactory } = this.props;

    return (
      <div>
        <Button onClick={this.showComponent.toggle}>Open</Button>
        {this.showComponent.isTrue && (
          <ComponentClass
            {...propsFactory.build()}
            isVisible={this.showComponent}
            onCancel={this.showComponent.setFalse}
          />
        )}
      </div>
    );
  }
}

Object.keys(COMPONENT_GENERATORS).forEach(componentName => {
  const { ComponentClass, propsFactory } = COMPONENT_GENERATORS[componentName];
  componentStories.add(componentName, () => {
    if (BUTTON_WRAP.includes(componentName)) {
      return <ButtonWrap ComponentClass={ComponentClass} propsFactory={propsFactory} />;
    }

    return <ComponentClass {...propsFactory.build()} />;
  });
});
