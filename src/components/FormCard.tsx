// tslint:disable max-classes-per-file
import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop } from 'lodash';

import * as Antd from 'antd';

import { ICardConfig, IFieldSet } from '../interfaces';

import FormFields from '../building-blocks/FormFields';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';

interface IExportProps {
  cardConfig: ICardConfig;
  children?: any;
  close?: () => void;
  defaults?: object;
  model?: any;
  onSave: (data: object) => Promise<void>;
  renderTopRight?: () => any;
}

interface IProps extends IExportProps {
  form: any;
}

@autoBindMethods
@observer
export class UnwrappedFormCard extends Component<IProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IProps> = {
    close: noop,
  };

  public constructor (props: IProps) {
    super(props);
    const { model, onSave, close, form } = props as IProps;

    this.formManager = new FormManager(
      form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: close,
      },
    );
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.cardConfig.fieldSets);
  }

  public render () {
    const { cardConfig, close, defaults, model, form, renderTopRight } = this.props;

    return (
      <Antd.Card title={cardConfig.title} extra={renderTopRight && renderTopRight()}>
        <Antd.Form onSubmit={this.formManager.onSave} className='notes-form'>
          {this.fieldSets.map((fieldSet: IFieldSet, idx: number) => (
            <Fragment key={idx}>
              {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}
              <div>
                <FormFields
                  defaults={defaults}
                  fieldSet={fieldSet}
                  form={form}
                  model={model}
                />
              </div>
            </Fragment>
          ))}

          {this.props.children}

          <div className='button-toolbar'>
            <Antd.Button
              htmlType='submit'
              loading={this.formManager.saving}
              size='large'
              type='primary'
            >
              Save
            </Antd.Button>

            <Antd.Button
              disabled={this.formManager.saving}
              onClick={close}
              size='large'
            >
              Cancel
            </Antd.Button>
          </div>
        </Antd.Form>
      </Antd.Card>
    );
  }
}

const WrappedFormCard = Antd.Form.create()(UnwrappedFormCard);

@autoBindMethods
@observer
export class FormCard extends Component<IExportProps> {
  public render () {
    return <WrappedFormCard {...this.props} />;
  }
}

export default FormCard;
