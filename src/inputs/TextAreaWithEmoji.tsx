import 'emoji-mart/css/emoji-mart.css';

import React, { Component } from 'react';
import { replace } from 'lodash';

import { Button, Mentions, Popover } from 'antd';
import { Picker, emojiIndex } from 'emoji-mart';

import { observable, toJS } from 'mobx';
import { observer } from 'mobx-react';
import autoBindMethods from 'class-autobind-decorator';
import SmartBool from '@mighty-justice/smart-bool';
import { IAntFormField, IInjected, IInputProps } from '../interfaces';

const { Option } = Mentions;

// function insertAtCursor (field: any, value: any) {
//   // IE support
//   if ((document as any).selection) {
//     field.focus();
//     const sel = (document as any).selection.createRange();
//     sel.text = value;
//   }
//   // Firefox, Chrome and others
//   else if (field.selectionStart || field.selectionStart === '0' || field.selectionStart === 0) {
//     const startPos = field.selectionStart;
//     const endPos = field.selectionEnd;
//     field.value = field.value.substring(0, startPos)
//       + value
//       + field.value.substring(endPos, field.value.length);
//   }
//   else {
//     field.value += value;
//   }
// }

interface IProps {
  icon?: any;
}

@autoBindMethods
@observer
class TextAreaWithEmoji extends Component<IProps> {
  private ref: any;
  @observable private isPickerVisible = new SmartBool();
  @observable private value = '';
  @observable private options: any[] = [];

  private get injected () {
    return this.props as IInjected & IInputProps & IAntFormField;
  }

  private onChange (value: string) {
    this.value = value;
    this.injected.onChange(this.value);
  }

  private onEmojiSelect (emojiData: any) {
    this.value += emojiData.native;
    this.injected.onChange(this.value);
    this.isPickerVisible.setFalse();
    this.ref.focus();
  }

  private handlePickerVisibleChange (isVisible: boolean) {
    this.isPickerVisible.set(isVisible);
  }

  private onSearch (search: string) {
    this.options = (emojiIndex.search(search) || []);
  }

  private onSelectEmojiFromDropdown (_option: any, prefix: string) {
    this.value = replace(this.value, prefix, '');
    this.injected.onChange(this.value);
  }

  public render () {
    return (
      <>
        <Mentions
          {...this.props}
          onChange={this.onChange}
          placeholder='Type a note...'
          filterOption={false}
          notFoundContent={null}
          ref={(input: any) => { this.ref = input; }}
          onSearch={this.onSearch}
          onSelect={this.onSelectEmojiFromDropdown}
          prefix=':'
          value={this.value}
        >
          {toJS(this.options).map((emoji: any) =>
            <Option value={emoji.native} key={emoji.id}>{emoji.native} {emoji.name}</Option>,
          )}
        </Mentions>
        <Popover
          content={
            <Picker
              onSelect={this.onEmojiSelect}
              showPreview={false}
              enableFrequentEmojiSort
            />
          }
          onVisibleChange={this.handlePickerVisibleChange}
          visible={this.isPickerVisible.isTrue}
          trigger='click'
        >
          <Button>{this.props.icon || 'Click here!'}</Button>
        </Popover>
      </>
    );
  }
}

export default TextAreaWithEmoji;
