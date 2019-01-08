import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';
import { kebabCase } from 'lodash';

import ButtonToolbar from '../building-blocks/ButtonToolbar';
import Card from './Card';
import FormCard from './FormCard';
import GuardedButton from '../building-blocks/GuardedButton';
import { ICardConfig } from '../interfaces';

interface IProps {
  cardConfig: ICardConfig;
  children?: any;
  isGuarded?: boolean;
  isLoading?: boolean;
  model: any;
  onDelete?: (model: any) => Promise<any>;
  onSave: (model: any) => Promise<any>;
  onSuccess: () => Promise<any>;
}

@autoBindMethods
@observer
class EditableCard extends Component<IProps> {
  @observable private isDeleting = new SmartBool();
  @observable private isEditing = new SmartBool();

  private async handleDelete () {
    const { model, onDelete, onSuccess } = this.props;
    if (!onDelete) { return; }

    this.isDeleting.set(true);
    await onDelete(model);
    await onSuccess();
    this.isDeleting.set(false);
  }

  private async handleSave (model: any) {
    const { onSuccess, onSave } = this.props;

    await onSave(model);
    await onSuccess();
  }

  private get deleteButton () {
    const { isGuarded, cardConfig, onDelete, isLoading } = this.props
      , classNameSuffix = cardConfig.classNameSuffix || kebabCase(cardConfig.title);

    if (!onDelete) { return; }

    return (
      <GuardedButton
        className={`btn-delete-${classNameSuffix}`}
        confirm={true}
        disabled={isLoading || this.isDeleting.isTrue}
        icon='delete'
        isGuarded={isGuarded}
        onClick={this.handleDelete}
        size='small'
        type='danger'
      >
        Delete
      </GuardedButton>
    );
  }

  private get editButton () {
    const { cardConfig, isLoading, isGuarded } = this.props
      , classNameSuffix = cardConfig.classNameSuffix || kebabCase(cardConfig.title);

    return (
      <GuardedButton
        className={`btn-edit-${classNameSuffix}`}
        disabled={isLoading || this.isEditing.isTrue || this.isDeleting.isTrue}
        icon='edit'
        isGuarded={isGuarded}
        onClick={this.isEditing.setTrue}
        size='small'
        type='primary'
      >
        Edit
      </GuardedButton>
    );
  }

  private buttons () {
    return (
      <ButtonToolbar>
        {this.deleteButton}
        {this.editButton}
      </ButtonToolbar>
    );
  }

  public render () {
    if (this.isEditing.isTrue) {
      return (
        <FormCard
          {...this.props}
          close={this.isEditing.setFalse}
          onSave={this.handleSave}
          renderTopRight={this.buttons}
        />
      );
    }

    return <Card {...this.props} renderTopRight={this.buttons} />;
  }
}

export default EditableCard;
