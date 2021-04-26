import { ILayout } from './interfaces';
declare function asyncNoop(): Promise<void>;
export declare const formPropsDefaults: {
    cancelText: string;
    onSave: typeof asyncNoop;
    saveText: string;
};
export declare const cardPropsDefaults: {
    bordered: boolean;
};
export declare const sharedComponentPropsDefaults: {
    layout?: ILayout;
    colon: boolean;
};
export {};
