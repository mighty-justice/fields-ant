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
export declare const toastError: {
    description: string;
    duration: null;
    message: string;
};
declare class FormManager {
    saving: boolean;
    private args;
    formWrappedInstance: IFormWrappedInstance;
    constructor(formWrappedInstance: IFormWrappedInstance, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly form: any;
    readonly fieldConfigs: IFieldConfig[];
    getDefaultValue(fieldConfig: IFieldConfig): any;
    getFormValue(fieldConfig: IFieldConfig, formValues: IModel): any;
    private readonly formValues;
    readonly formModel: IModel;
    readonly submitModel: IModel;
    readonly formFieldNames: string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private handleRequestError;
    private validateThenSaveCallback;
    onSave(event: any): Promise<void>;
}
export default FormManager;
