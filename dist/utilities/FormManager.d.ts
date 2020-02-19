import { IFieldConfig, IFieldSet } from '../interfaces';
import { IForm, IModel } from '../props';
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
interface IFormWrappedInstance {
    props: {
        form: IForm;
    };
}
export declare const ERROR_WITH_DESCRIPTION: number[];
export declare const toastError: {
    description: string;
    duration: number;
    message: string;
};
declare class FormManager {
    saving: boolean;
    private args;
    formWrappedInstance: IFormWrappedInstance;
    constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>);
    get form(): any;
    get fieldConfigs(): IFieldConfig[];
    get submitButtonDisabled(): boolean;
    getDefaultValue(fieldConfig: IFieldConfig): any;
    getFormValue(fieldConfig: IFieldConfig, formValues: IModel): any;
    private get formValues();
    get formModel(): IModel;
    get submitModel(): IModel;
    get formFieldNames(): string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private hasErrors;
    private handleRequestError;
    private validateThenSaveCallback;
    onSave(event: any): void;
}
export default FormManager;
