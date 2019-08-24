import React, { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldSetPartial } from '../interfaces';
import { IModel } from '../props';
export interface INestedFieldSetProps {
    fieldSet: IFieldSetPartial;
    formManager: FormManager;
    formModel: IModel;
    id: string;
    label: React.ReactNode;
    search?: string;
}
declare class NestedFieldSet extends Component<INestedFieldSetProps> {
    private fieldValueMapper;
    private readonly fieldSet;
    private getDefaultValue;
    render(): JSX.Element;
}
export default NestedFieldSet;
