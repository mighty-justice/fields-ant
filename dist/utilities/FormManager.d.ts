import { ComponentClass } from 'react';
import { WrappedFormUtils } from 'antd/es/form/Form';
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
    isSaving: boolean;
    private args;
    formWrappedInstance: IFormWrappedInstance;
    constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly form: WrappedFormUtils;
    readonly isFormDisabled: boolean;
    readonly fieldSets: IFieldSet[];
    readonly fieldConfigs: IFieldConfig[];
    readonly isSubmitButtonDisabled: boolean;
    readonly isCancelButtonDisabled: boolean;
    getDefaultValue(fieldConfig: IFieldConfig): IValue;
    getFormValue(fieldConfig: IFieldConfig, formValues: IModel): IValue;
    private readonly formValues;
    readonly formModel: IModel;
    readonly submitModel: IModel;
    readonly formFieldNames: string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private hasErrors;
    private handleRequestError;
    private validateThenSaveCallback;
    onSave(event: any): Promise<void>;
}
export default FormManager;
