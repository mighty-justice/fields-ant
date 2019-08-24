/// <reference types="rosie" />
import { IValue } from '../src/props';
export declare function sleep(ms?: number): Promise<void>;
export declare const onSave: () => (data: any) => Promise<void>;
export declare const onCreate: () => (data: any) => Promise<void>;
export declare const onDelete: () => (data: any) => Promise<void>;
export declare const fakeTextShort: () => string;
export declare const fakeAddress: () => {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip_code: string;
};
export declare const fakeBoolean: () => boolean | undefined;
export declare const fakeDateRecent: () => string;
export declare const fakeDatePast: () => string;
export declare const fakeDuration: () => string;
export declare const fakeEin: () => string;
export declare const fakeField: () => string;
export declare const fakeObjectSearch: () => {
    name: string;
    id: string;
};
export declare const fakerPercentage: () => string | undefined;
export declare const fakeTextLong: () => string;
export declare const fakeRate: () => number;
export declare const fakeSsn: () => string;
export declare const attrNumber: (num?: number) => () => number;
export declare const attrSubFactoryList: (factory: any, num?: number | undefined) => () => any;
export declare const fieldFactory: import("rosie").IFactory<any>;
export declare function fieldFactoryForType(type: string): import("rosie").IFactory<{}>;
export declare const booleanFactory: import("rosie").IFactory<{}>;
export declare const checkboxFactory: import("rosie").IFactory<{}>;
export declare const dateFactory: import("rosie").IFactory<{}>;
export declare const datepickerFactory: import("rosie").IFactory<{}>;
export declare const durationFactory: import("rosie").IFactory<{}>;
export declare const einFactory: import("rosie").IFactory<{}>;
export declare const emailFactory: import("rosie").IFactory<{}>;
export declare const hiddenFactory: import("rosie").IFactory<{}>;
export declare const moneyFactory: import("rosie").IFactory<{}>;
export declare const numberFactory: import("rosie").IFactory<{}>;
export declare const passwordFactory: import("rosie").IFactory<{}>;
export declare const percentageFactory: import("rosie").IFactory<{}>;
export declare const phoneFactory: import("rosie").IFactory<{}>;
export declare const ratingFactory: import("rosie").IFactory<{}>;
export declare const ssnFactory: import("rosie").IFactory<{}>;
export declare const stringFactory: import("rosie").IFactory<{}>;
export declare const textFactory: import("rosie").IFactory<{}>;
export declare const urlFactory: import("rosie").IFactory<{}>;
export declare const attrOptions: {
    value: string;
    name: string;
}[];
export declare const stateOptions: {
    name: {};
    value: {};
}[];
export declare const addressFactory: import("rosie").IFactory<{}>;
export declare const radioFactory: import("rosie").IFactory<{}>;
export declare const optionSelectFactory: import("rosie").IFactory<{}>;
export declare const objectSearchFactory: import("rosie").IFactory<{}>;
export declare const objectSearchCreateFactory: import("rosie").IFactory<{}>;
export declare const fieldSetFactory: import("rosie").IFactory<any>;
export declare const cardPropsFactory: import("rosie").IFactory<any>;
export declare const summaryCardPropsFactory: import("rosie").IFactory<{}>;
export declare const formPropsFactory: import("rosie").IFactory<{}>;
export declare const formCardPropsFactory: import("rosie").IFactory<{}>;
export declare const editableCardPropsFactory: import("rosie").IFactory<{}>;
export declare const arrayCardPropsFactory: import("rosie").IFactory<{}>;
export declare const tablePropsFactory: import("rosie").IFactory<{}>;
export declare const editableArrayCardPropsFactory: import("rosie").IFactory<{}>;
export declare const formDrawerPropsFactory: import("rosie").IFactory<{}>;
export declare const formModalPropsFactory: import("rosie").IFactory<{}>;
interface ITypeGenerators {
    [key: string]: {
        fieldConfigFactory: any;
        valueFunction: () => IValue;
    };
}
export declare const TYPE_GENERATORS: ITypeGenerators;
export declare const valueRenderPairs: {
    [key: string]: [IValue, string | null];
};
export interface IComponentGenerator {
    ComponentClass: any;
    propsFactory: {
        build: (overrides?: object) => object;
    };
}
export interface IComponentGenerators {
    [key: string]: IComponentGenerator;
}
export declare const COMPONENT_GENERATORS: IComponentGenerators;
export {};
