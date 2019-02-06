import { IFieldSet } from '../interfaces';
interface IArgs {
    fieldSets: IFieldSet[];
    form: any;
    model: {
        [key: string]: any;
        id?: string;
    };
    onSave: (data: {
        [key: string]: any;
    }) => void | Promise<void>;
    onSuccess: () => void;
}
declare class FormManager {
    saving: boolean;
    private args;
    constructor(form: any, fieldSets: IFieldSet[], args: Partial<IArgs>);
    readonly formModel: any;
    private readonly formValues;
    readonly formFieldNames: string[];
    private onSuccess;
    private setErrorsOnFormFields;
    private notifyUserAboutErrors;
    private handleBackendResponse;
    private validateThenSaveCallback;
    onSave(event: any): Promise<void>;
}
export default FormManager;
