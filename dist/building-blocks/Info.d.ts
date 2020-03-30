import { Component } from 'react';
import { ClassValue } from 'classnames/types';
import { IFieldConfig } from '../interfaces';
declare class Info extends Component<{
    fieldConfig: IFieldConfig;
}> {
    render(): JSX.Element;
}
declare class Label extends Component<{
    className?: ClassValue;
}> {
    render(): JSX.Element;
}
declare class Value extends Component<{
    className?: ClassValue;
}> {
    render(): JSX.Element;
}
export default Info;
export { Label, Value, };
