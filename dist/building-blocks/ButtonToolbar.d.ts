import { Component } from 'react';
import { ClassValue } from 'classnames/types';
export interface IButtonToolbarProps {
    align?: 'between' | 'right';
    className?: ClassValue;
    fixed?: boolean;
    noSpacing?: boolean;
}
declare class ButtonToolbar extends Component<IButtonToolbarProps> {
    render(): JSX.Element;
}
export default ButtonToolbar;
