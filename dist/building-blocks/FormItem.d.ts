import { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldConfig } from '../interfaces';
import { IModel } from '../props';
export interface IFormFieldProps {
    fieldConfig: IFieldConfig;
    formManager: FormManager;
    formModel: IModel;
}
declare class FormItem extends Component<IFormFieldProps> {
    private get initialValue();
    private fieldsValidatorToValidator;
    private get rules();
    private get decoratorOptions();
    private get formItemProps();
    render(): JSX.Element;
}
export default FormItem;
