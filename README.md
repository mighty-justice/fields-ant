# Fields Ant

[![npm Version](https://img.shields.io/npm/v/@mighty-justice/fields-ant.svg)](https://www.npmjs.com/package/@mighty-justice/fields-ant) [![Coverage Status](https://coveralls.io/repos/github/mighty-justice/fields-ant/badge.svg?branch=master)](https://coveralls.io/github/mighty-justice/fields-ant?branch=master)

A standard library / interface for building Forms and standard CRUD components
in [Ant Design](https://ant.design/).

Open source, developed primarily at [Mighty](https://www.mighty.com/).

| [Documentation](https://mighty-justice.github.io/fields-ant/) |
| -------------------------------------------------------------- |

# Introduction / Concepts

The most common patterns in a piece of software are CRUD: Creating, reading, updating,
and deleting a piece of data. Extremely common tasks like "Add a form for editing the
phone number" require a lot of boiler-plate in libraries such as Ant Design.

Fields Ant seeks to make these simple components extremely easy to add using a common
configuration language based around the "FieldConfig."

## FieldConfig

The fieldConfig is the basic unit that fields-ant uses to define
something that should be shown or edited. There is only one required
attribute in a fieldConfig, the field.

A simple example is wanting to display or edit the field `phone_number` on an object.
The fieldConfig for this would be `{ field: 'phone_number' }`.

The components in this library use this field config by fill it in. For the example
above, the filled in version looks like this:

```
{
  disabled: false,
  editComponent: function Input(props) {,
  editProps: {},
  field: "phone_number",
  fieldConfigProp: false,
  formValidationRules: {},
  fromForm: function falseyToString(value) { return value || ''; },
  key: "phone_number",
  label: "Phone Number",
  nullify: false,
  populateFromSearch: false,
  populateNameFromSearch: false,
  readOnly: false,
  render: function (value, _fieldConfig, _model) { return func(value); },
  required: false,
  showLabel: true,
  skipFieldDecorator: false,
  toForm: function falseyToString(value) { return value || ''; },
  type: "phone",
  writeOnly: false,
}
```

Two interesting things about this example:

1. The type `phone` was inferred by the library because the field has `phone` in the name.
2. After inferring the type, a number of defaults for that type were added, like a phone number formatter.
3. A great user-readable label was generated from the field.

You can play with `fillInFieldConfig` on the FieldConfig Preview page of this documentation.

The second most important attribute of a fieldConfig is the 'type'. This is a way of applying a common
set of 'preset' of attributes. For example, `type: 'money'` includes an appropriate render function,
edit component, validator, and sets falsey values to null instead of an empty string.

## FieldConfig Attributes

- **field**: Field can be any string which would be supported in lodash get, like 'name', 'lawfirm.name',
or 'lawfirms[0].name'.

- **type**: This is a way of applying a common set of 'preset' of attributes. For example, `type: 'money'` includes
an appropriate render function, edit component, validator, and sets falsey values to null instead of empty string.

#### Core attributes
- **className**: string, applied on the `Antd.Form.Item`.
- **formItemRenderExtra**: Optional function for rendering an extra under a form item. See interfaces.ts for call signature.
- **label**: The label generated from `field` is usually very good, but sometimes you want something completely
different.
- **nullify**: If true, empty values in the submit data will be null and not empty string.
- **render**: Used for rendering the value for the user in read contexts. See interfaces.ts for call signature.
- **showLabel**: If false, read contexts will show only the output of render.
- **tooltip**: Optional tooltip to be displayed alongside the label.
- **value**: Normally read from model or defaults props, this can be used as a value override in any component.

#### Filtering
Attributes for filtering this field out. These can be very useful if you're using one fieldSet, but want something to
display only in the form, not in the form, or based one one of the other fields. One example of this is showing a
law firm contact only when a law firm is selected. Another is making a non-editable field read only.

- **insertIf**: Function that takes the current model and returns if a fieldConfig should be displayed.
- **readOnly**: Hides a fieldConfig in write contexts, like a form.
- **writeOnly**: Hides a fieldConfig in read contexts, like a card.

#### Forms
Attributes for controlling how fieldConfig works in form.

- **disabled**: Disables input in form.
- **editComponent**: Used in a write context, so a from. This component must follow the rules of an
[Ant Design Form Control](https://ant.design/components/form/#components-form-demo-customized-form-controls)
such as calling the `onChange` prop.
- **editProps**: This will be spread as the final prop on an edit component, overriding any defaults.
- **formItemProps**: Spread into props for Antd.Form.Item.
- **fromForm**: Takes a form value and fieldConfig, and returns a value to be used in a model.
- **icon**: Icon to be displayed in the input edit component.
- **required**: If the form input should be required.
- **toForm**: Takes a model value and fieldConfig, and returns a value to be used in a form.

Validation rules are documented here:
https://ant.design/components/form/#Validation-Rules

- **formValidationRules**: A dictionary of rule names to validation rules.

#### Tables
Attributes for controlling how fieldConfig works in table
- **tableColumnProps**: Standard [Ant Design Table](https://ant.design/components/table/) column props you wish to
include alongside those generated by fields-ant;

#### ObjectSearchCreate
These enable features in objectSearchCreate explained in the documentation for that type.

- **populateFromSearch**
- **populateNameFromSearch**

#### Technical
These are technical and you can safely ignore them

- **colProps**: Props passed into `Antd.Col`.
- **fieldConfigProp**: If true, a `fieldConfig` prop will be passed into `editComponent`.
- **key**: Unique string for rendering.
- **skipFieldDecorator**: If true, the `editComponent` will be mounted without an Ant Design Table fieldDecorator.
A `formManager` and `formModel` prop will be passed into the editComponent and you will be responsible for using
`FormItem` yourself.

## FieldSet

A fieldSet is just a collection of fieldConfigs. There are two types of fieldSet: Simple and Complex.
A simple fieldSet is just an array of fieldConfigs, whereas a complex fieldSet is an object. The `fields`
attribute of that object is An array of fieldConfigs, but the rest of the object can contain information
about the fieldSet:

- **fields**: An array of fieldConfigs, just like a simple `FieldSet`
- **legend**: A label to be displayed above the entire fieldset.
- **rowProps**: Props passed into `Antd.Row`.
- **tooltip**: Optional tooltip to be displayed alongside the legend.

Most components in fields-ant take a `fieldSets` prop which is an array of complex and/or simple fieldSets.

## Practical Usage

The two core components are the Card and the Form. Most of the other components are either a building block
or a variant of these two. Here are to extremely simple examples:

```ts
<Card
  fieldSets={[[
    { field: 'phone_number', }
  ]]}
  model={{ phone_number: '5558605309' }}
/>
```

This card will show the label and will format the phone number in the model.

```ts
<Form
  fieldSets={[[
    { field: 'phone_number', }
  ]]}
/>
```

This form will allow the user to type in a phone number and will validate it.

There are obviously a LOT more attributes that can be added to these fieldSets and props to
be passed to these and other components. To read about other attributes, I recommend checking out
the IFieldConfigBase definition in
[interfaces.ts](https://github.com/mighty-justice/fields-ant/blob/master/src/interfaces.ts)
and to see component props, see the components section of our online documentation.

# Installation

```
yarn add @mighty-justice/fields-ant
```

```
npm install @mighty-justice/fields-ant
```

#### peer dependencies
```
"antd": "^3.0.0",
"lodash": "^4.0.0",
"mobx": "^4.0.0 || ^5.0.0",
"mobx-react": "^5.0.0",
"moment": "^2.0.0",
"react": "^16.0.0"
```

#### npm
`npm install --save-dev @mighty-justice/fields-ant`

#### yarn
`yarn add --dev @mighty-justice/fields-ant`

# Contributing

We accept new issues and pull requests from anyone!

# Releasing a new version

- Release: `npm run deploy`

This will run checks for `test`, `lint`, `build`, bump the version number,
publish to npm, and publish the docs to Github Pages.

Gotchas:

- Make sure to `npm install` or `yarn install` first
- The deploy command must currently be run with npm not yarn due to login bug

# All other commands

- **yarn build** - Build the project
- **yarn dev** - Build the project and watch for changes
- **yarn docs:build** - Build storybook documentation
- **yarn docs:deploy** - Deploy storybook documentation to Github pages
- **yarn docs:watch** - Run auto-reloading storybook
- **yarn lint** - Run lint
- **yarn test** - Run tests
- **yarn test:watch** - Run tests and watch for changes
- **yarn view-source-map** - Opens HTML representation of source map
