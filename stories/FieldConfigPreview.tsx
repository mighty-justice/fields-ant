import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';

import { Card, Col, Row } from 'antd';

import { parseAndPreserveNewlines } from '@mighty-justice/utils';

import { IModel } from '../src/props';
import { fillInFieldConfig } from '../src/utilities/fillIn';
import Form from '../src/components/Form';

const render = (value: any) => {
    let output = '{\n';
    Object.keys(value).forEach(key => {
      output += `  ${key}: ${JSON.stringify(value[key]) || value[key].toString().split('\n')[0]},\n`;
    });
    output += `}`;
    return output;
  }
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
      <Row type='flex' justify='center' align='top' gutter={16}>
        <Col span={10}>
          <Card>
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
          </Card>
        </Col>
        <Col span={10}>
          <Card>
            <pre>
              {parseAndPreserveNewlines(render(fillInFieldConfig(this.fieldConfigPartial)))}
            </pre>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default FieldConfigPreview;
