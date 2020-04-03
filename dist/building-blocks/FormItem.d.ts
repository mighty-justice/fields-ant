import { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldConfig } from '../interfaces';
import { IModel } from '../props';
export interface IFormFieldProps {
    fieldConfig: IFieldConfig;
    formManager: FormManager;
    formModel: IModel;
}
export declare const FORM_ITEM_CLASS_NAME: string;
declare class FormItem extends Component<IFormFieldProps> {
    private readonly initialValue;
    private fieldsValidatorToValidator;
    private readonly rules;
    private readonly decoratorOptions;
    private readonly formItemProps;
    render(): JSX.Element;
}
export default FormItem;
