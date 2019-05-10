import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import { parseAndPreserveNewlines } from '@mighty-justice/utils';

import { IModel } from '../src/props';
import { fillInFieldConfig } from '../src/utilities';
import Form from '../src/components/Form';

const render = (value: object) => JSON.stringify(value, undefined, 4)
  , defaultValue = { field: 'example_field' };

@autoBindMethods
@observer
class FieldConfigPreview extends Component<{}> {
  @observable private fieldConfigPartial = defaultValue;
  @observable private model: IModel = { fieldConfigPartial: render(defaultValue) };

  private onSave (model: IModel) {
    this.model = model;
    // tslint:disable no-eval
    this.fieldConfigPartial = eval(`(${model.fieldConfigPartial})`);
  }

  public render () {
    return (
      <Antd.Row type='flex' justify='center' align='top' gutter={16}>
        <Antd.Col span={10}>
          <Antd.Card>
            <Form
              defaults={this.model}
              fieldSets={[[{
                field: 'fieldConfigPartial',
                label: 'Partial fieldConfig',
                type: 'text',
              }]]}
              model={this.model}
              onSave={this.onSave}
              resetOnSuccess={false}
              saveText='Fill in fieldConfig'
            />
          </Antd.Card>
        </Antd.Col>
        <Antd.Col span={10}>
          <Antd.Card>
            <pre>
              {parseAndPreserveNewlines(render(fillInFieldConfig(this.fieldConfigPartial)))}
            </pre>
          </Antd.Card>
        </Antd.Col>
      </Antd.Row>
    );
  }
}

export default FieldConfigPreview;
