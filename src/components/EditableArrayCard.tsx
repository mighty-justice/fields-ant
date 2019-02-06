import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { isEmpty, kebabCase } from 'lodash';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';

import * as Antd from 'antd';

import GuardedButton from '../building-blocks/GuardedButton';
import { ICommonCardProps } from '../interfaces';

import EditableCard from './EditableCard';
import FormCard from './FormCard';

interface IProps extends ICommonCardProps {
  children?: any;
  defaults?: object;
  isGuarded?: boolean;
  isLoading?: boolean;
  model: any[];
  onCreate: (model: any) => Promise<any>;
  onDelete?: (model: any) => Promise<any>;
  onSave: (model: any) => Promise<any>;
  onSuccess: () => Promise<any>;
}

@autoBindMethods
@observer
class EditableArrayCard extends Component<IProps> {
  @observable private isAddingNew = new SmartBool();

  private async handleSaveNew (model: any) {
    const { onCreate, onSuccess } = this.props;
    await onCreate(model);
    await onSuccess();
  }

  private renderAddNew () {
    const { title, isLoading, isGuarded } = this.props
      , classNameSuffix = this.props.classNameSuffix || kebabCase(title);

    return (
      <GuardedButton
        className={`btn-new btn-new-${classNameSuffix}`}
        disabled={isLoading || this.isAddingNew.isTrue}
        icon='plus'
        isGuarded={isGuarded}
        onClick={this.isAddingNew.setTrue}
        size='small'
        type='primary'
      >
        Add
      </GuardedButton>
    );
  }

  public render () {
    const {
      defaults,
      fieldSets,
      isLoading,
      model,
      onDelete,
      onSave,
      onSuccess,
      title,
    } = this.props;

    return (
      <Antd.Card title={title} extra={this.renderAddNew()} loading={isLoading}>
        {this.isAddingNew.isTrue && (
          <FormCard
            close={this.isAddingNew.setFalse}
            defaults={defaults}
            fieldSets={fieldSets}
            onSave={this.handleSaveNew}
            title={`New ${title}`}
          />
        )}

        {isEmpty(model) && !this.isAddingNew.isTrue && (
          <p className='empty-message'>No records</p>
        )}

        {model.map(modelItem => (
          <EditableCard
            classNameSuffix={kebabCase(title)}
            fieldSets={fieldSets}
            key={modelItem.id}
            model={modelItem}
            onDelete={onDelete}
            onSave={onSave}
            onSuccess={onSuccess}
            title=''
          />
        ))}
      </Antd.Card>
    );
  }
}

export default EditableArrayCard;
