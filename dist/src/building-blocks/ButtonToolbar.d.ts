import { Component } from 'react';
export interface IButtonToolbarProps {
    align?: 'between' | 'right';
    className?: any;
    fixed?: boolean;
    noSpacing?: boolean;
}
declare class ButtonToolbar extends Component<IButtonToolbarProps> {
    render(): JSX.Element;
}
export default ButtonToolbar;
