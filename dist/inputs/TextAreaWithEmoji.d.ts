import 'emoji-mart/css/emoji-mart.css';
import { Component } from 'react';
declare class TextAreaWithEmoji extends Component {
    private ref;
    private isPickerVisible;
    private value;
    private options;
    private onChange;
    private onEmojiSelect;
    private handlePickerVisibleChange;
    private onSearch;
    private onSelectEmojiFromDropdown;
    render(): JSX.Element;
}
export default TextAreaWithEmoji;
