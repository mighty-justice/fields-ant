// tslint:disable max-classes-per-file
import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop } from 'lodash';

import * as Antd from 'antd';

import FormFieldSet from '../building-blocks/FormFieldSet';
import FormManager from '../utilities/FormManager';
import { asyncNoop, fillInFieldSets } from '../utilities/common';
import { IFieldSet } from '../interfaces';
import { IFormProps, IWrappedFormProps } from '../props';

import { ICardProps } from './Card';

export interface IFormCardProps extends IFormProps, ICardProps {}

export interface IFormCardWrappedProps extends IFormCardProps, IWrappedFormProps {}

@autoBindMethods
@observer
export class UnwrappedFormCard extends Component<IFormCardWrappedProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IFormCardWrappedProps> = {
    onCancel: noop,
    onSuccess: asyncNoop,
  };

  public constructor (props: IFormCardWrappedProps) {
    super(props);
    const { model, onSave, onCancel, form } = props as IFormCardWrappedProps;

    this.formManager = new FormManager(
      form,
      this.fieldSets,
      {
        model,
        onSave,
        onSuccess: onCancel,
      },
    );
  }

  @computed
  private get fieldSets () {
    return fillInFieldSets(this.props.fieldSets);
  }

  public render () {
    const { isLoading, title, onCancel, defaults, model, form, renderTopRight } = this.props;

    return (
      <Antd.Card loading={isLoading} title={title} extra={renderTopRight && renderTopRight()}>
        <Antd.Form onSubmit={this.formManager.onSave} className='notes-form'>
          {this.fieldSets.map((fieldSet: IFieldSet, idx: number) => (
            <Fragment key={idx}>
              {(idx > 0) && <Antd.Divider key={`divider-${idx}`} />}
              <div>
                <FormFieldSet
                  defaults={defaults}
                  fieldSet={fieldSet}
                  form={form}
                  formManager={this.formManager}
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
              onClick={onCancel}
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

// istanbul ignore next
const WrappedFormCard = Antd.Form.create()(UnwrappedFormCard);

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public static defaultProps: Partial<IFormCardWrappedProps> = {
    onCancel: noop,
    onSuccess: asyncNoop,
  };

  public render () {
    return <WrappedFormCard {...this.props} />;
  }
}

export default FormCard;
