import { Component } from 'react';
interface IProps {
    align?: 'between' | 'right';
    children?: any;
    className?: any;
    fixed?: boolean;
    noSpacing?: boolean;
}
declare class ButtonToolbar extends Component<IProps> {
    render(): JSX.Element;
}
export default ButtonToolbar;
