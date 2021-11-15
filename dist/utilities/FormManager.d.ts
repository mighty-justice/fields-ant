import { ComponentClass } from 'react';
import { FormInstance } from 'antd';
import { FieldData } from 'rc-field-form/es/interface';
import { IFieldConfig, IFieldSet } from '../interfaces';
import { IFormWrappedProps } from '../components/Form';
import { IModel, IValue } from '../props';
export interface IFoundOnForm {
    [key: string]: string;
}
export interface IErrorMessage {
    field: string;
    message: string;
}
export interface IBackendValidation {
    errorMessages: IErrorMessage[];
    foundOnForm: IFoundOnForm;
}
interface IArgs {
    defaults: IModel;
    fieldSets: IFieldSet[];
    model: IModel;
    onSave: (data: IModel) => void | Promise<void>;
    onSuccess: () => any | Promise<any>;
    processErrors: (errors: IBackendValidation) => IBackendValidation;
    resetOnSuccess: boolean;
    successText: null | string;
}
declare type IFormWrappedInstance = InstanceType<ComponentClass<IFormWrappedProps>>;
export declare const ERROR_WITH_DESCRIPTION: number[];
export declare const toastError: {
    description: string;
    duration: number;
    message: string;
};
declare class FormManager {
    hasErrors: boolean;
    isSaving: boolean;
    private args;
    formWrappedInstance: IFormWrappedInstance;
    constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>);
    get form(): FormInstance;
    get isFormDisabled(): boolean;
    get fieldSets(): IFieldSet[];
    get fieldConfigs(): IFieldConfig[];
    get isSubmitButtonDisabled(): boolean;
    get isCancelButtonDisabled(): boolean;
    getDefaultValue(fieldConfig: IFieldConfig): IValue;
    getFormValue(fieldConfig: IFieldConfig, formValues: IModel): IValue;
    private get formValues();
    get formModel(): IModel;
    get submitModel(): IModel;
    get formFieldNames(): string[];
    onFieldsChange(_changedValues: any, values: FieldData[]): void;
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private handleRequestError;
    onFinish(): Promise<void>;
}
export default FormManager;
