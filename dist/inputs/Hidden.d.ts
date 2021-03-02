import React, { Component } from 'react';
import { IInputProps } from '../interfaces';
declare class Hidden extends Component<IInputProps> {
    private get injected();
    render(): React.ReactNode;
}
export default Hidden;
