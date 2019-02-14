import { asyncNoop } from './utilities/common';
export declare const formPropsDefaults: {
    onCancel: (...args: any[]) => void;
    onSave: typeof asyncNoop;
    onSuccess: typeof asyncNoop;
    saveText: string;
};
