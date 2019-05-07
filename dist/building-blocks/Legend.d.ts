import { Component } from 'react';
import { IFieldSetPartial } from '../interfaces';
interface IProps {
    fieldSet: IFieldSetPartial;
}
declare class Legend extends Component<IProps> {
    render(): JSX.Element | null;
}
export default Legend;
