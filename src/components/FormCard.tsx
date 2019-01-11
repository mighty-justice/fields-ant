import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';

import * as Antd from 'antd';

import { ICardConfig, IFieldSet } from '../interfaces';

import FormFields from '../building-blocks/FormFields';
import FormManager from '../utilities/FormManager';
import { fillInFieldSets } from '../utilities/common';
import { computed } from 'mobx';

interface IProps {
  cardConfig: ICardConfig;
  children?: any;
  close: () => void;
  defaults?: object;
  form: any;
  model?: any;
  onSave: (data: object) => Promise<void>;
  renderTopRight?: () => any;
}

@autoBindMethods
@observer
class FormCard extends Component<IProps> {
  private formManager: FormManager;

  public constructor (props: IProps) {
    super(props);
    const { model, onSave, close } = props;

    this.formManager = new FormManager(
      props.form,
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

const WrappedFormCard = Antd.Form.create()(FormCard);

export default WrappedFormCard;
