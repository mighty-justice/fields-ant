import { Component } from 'react';
import { FormManager } from '../utilities';
import { IFieldConfig, ILayout } from '../interfaces';
import { IModel } from '../props';
export interface IFormFieldProps {
    fieldConfig: IFieldConfig;
    formManager: FormManager;
    formModel: IModel;
    layout?: ILayout;
    colon?: boolean;
}
export declare const FORM_ITEM_CLASS_NAME: string;
declare class FormItem extends Component<IFormFieldProps> {
    static defaultProps: Partial<IFormFieldProps>;
    private get initialValue();
    private fieldsValidatorToValidator;
    private get rules();
    private get decoratorOptions();
    private get formItemProps();
    render(): JSX.Element;
}
export default FormItem;
