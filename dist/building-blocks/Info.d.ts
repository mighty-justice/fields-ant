import { Component } from 'react';
import { IClassName } from '../props';
import { IFieldConfig } from '../interfaces';
declare class Info extends Component<{
    fieldConfig: IFieldConfig;
}> {
    render(): JSX.Element;
}
declare class Label extends Component<{
    className?: IClassName;
}> {
    render(): JSX.Element;
}
declare class Value extends Component<{
    className?: IClassName;
}> {
    render(): JSX.Element;
}
export default Info;
export { Label, Value, };
