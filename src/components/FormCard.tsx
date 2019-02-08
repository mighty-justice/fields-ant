// tslint:disable max-classes-per-file
import React, { Component, Fragment } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import { noop } from 'lodash';

import * as Antd from 'antd';

import { ICommonCardProps, IFieldSet } from '../interfaces';

import FormFieldSet from '../building-blocks/FormFieldSet';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';

export interface IFormCardProps extends ICommonCardProps {
  children?: any;
  defaults?: object;
  isLoading?: boolean;
  model?: any;
  onCancel?: () => void;
  onSave: (data: object) => Promise<void>;
  renderTopRight?: () => any;
}

interface IProps extends IFormCardProps {
  form: any;
}

@autoBindMethods
@observer
export class UnwrappedFormCard extends Component<IProps> {
  private formManager: FormManager;

  public static defaultProps: Partial<IProps> = {
    onCancel: noop,
  };

  public constructor (props: IProps) {
    super(props);
    const { model, onSave, onCancel, form } = props as IProps;

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

const WrappedFormCard = Antd.Form.create()(UnwrappedFormCard);

@autoBindMethods
@observer
export class FormCard extends Component<IFormCardProps> {
  public render () {
    return <WrappedFormCard {...this.props} />;
  }
}

export default FormCard;
