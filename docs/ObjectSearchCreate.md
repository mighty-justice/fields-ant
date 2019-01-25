## Features

```ts
interface IFieldConfig {
  // [...]
  populateFromSearch: boolean;
  populateNameFromSearch: boolean;
  // [...]
}


export interface IFieldConfigObjectSearchCreate extends IFieldConfigBase {
  createFields: IFieldConfigBase[];
  endpoint: string;
  searchFilters?: { [key: string]: any };
}
```

A FieldConfig of type `objectSearchCreate` defines:

- `endpoint` which it will submit its `?search=` queries to
- `createFields` a FieldSet to allow the user to compose their own
  object if they are unable to find one that matches their query
- `searchFilters` (optional) params to include alongside the search

The create functionality is currently blocked until the user types at least
3 characters, but this will be customizable in the future.

Create fields may include these optional attributes:

- `populateFromSearch` to default the value of this field to the user's search 
  string
- `populateNameFromSearch` to default the value of a field ending in
  `first_name` or `last_name` with the search string (split by best guess)


**Note:** This example features an objectSearchCreate inside an 
objectSearchCreate which does not crash, but is not currently supported.
