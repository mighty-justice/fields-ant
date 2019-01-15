# Components

## Card
```ts
cardConfig: ICardConfig;
children?: any;
isLoading?: boolean;
model: any;
renderTopRight?: () => any;
```

## SummaryCard
```ts
cardConfig: ICardConfig;
className: any;
column: 3 | 4 | 6;
isLoading?: boolean;
model: any;
renderTopRight?: () => any;
```

## FormCard
```ts
cardConfig: ICardConfig;
children?: any;
close: () => void;
defaults?: object;
form: any;
model?: any;
onSave: (data: object) => Promise<void>;
renderTopRight?: () => any;
```

## EditableCard
```ts
cardConfig: ICardConfig;
children?: any;
isGuarded?: boolean;
isLoading?: boolean;
model: any;
onDelete?: (model: any) => Promise<any>;
onSave: (model: any) => Promise<any>;
onSuccess: () => Promise<any>;
```

## FormDrawer
```ts
fieldSets: IFieldSetPartial[];
form: any;
isVisible: SmartBool;
model?: any;
onSave: (args: any) => Promise<void>;
onSuccess?: (args?: any) => void;
title: string;
```

## FormModal
```ts
cardConfig: ICardConfig;
children?: any;
close?: () => void;
defaults?: object;
form: any;
model?: any;
onSave: (data: object) => Promise<void>;
saveText: string;
```

## ArrayCard
```ts
cardConfig: ICardConfig;
children?: any;
extra?: any;
isLoading?: boolean;
model: any;
```

## EditableArrayCard
```ts
cardConfig: ICardConfig;
children?: any;
defaults?: object;
isGuarded?: boolean;
isLoading?: boolean;
model: any[];
onCreate: (model: any) => Promise<any>;
onDelete?: (model: any) => Promise<any>;
onSave: (model: any) => Promise<any>;
onSuccess: () => Promise<any>;
```

## Cards
```ts
cardConfigs: ICardConfig[];
isLoading: boolean;
model: {[key: string]: any};
```

