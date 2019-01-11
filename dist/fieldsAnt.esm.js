import React, { Component, Fragment } from 'react';
import autoBindMethods from 'class-autobind-decorator';
import cx from 'classnames';
import { Form, Row, Col, Button, Icon, Input, Select, Rate, DatePicker, Popconfirm, Card, Divider, notification, List, Drawer, Modal } from 'antd';
import { omit, sortBy, isArray, get, isEmpty, set, noop, kebabCase, result } from 'lodash';
import { toKey, EMPTY_FIELD, mapBooleanToText, formatDate, formatMoney, formatCommaSeparatedNumber, getPercentValue, formatPercentage, getPercentDisplay, parseAndPreserveNewlines, varToLabel, getOrDefault, createDisabledContainer, createGuardedContainer } from '@mighty-justice/utils';
import moment from 'moment';
import { format } from 'date-fns';
import { pattern } from 'iso8601-duration';
import { observable, computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import SmartBool from '@mighty-justice/smart-bool';
import flatten from 'flat';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var _class;

var ButtonToolbar = autoBindMethods(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(ButtonToolbar, _Component);

  function ButtonToolbar() {
    _classCallCheck(this, ButtonToolbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonToolbar).apply(this, arguments));
  }

  _createClass(ButtonToolbar, [{
    key: "render",
    value: function render() {
      var className = cx('button-toolbar', this.props.align ? "align-".concat(this.props.align) : null, {
        'no-spacing': this.props.noSpacing
      }, _defineProperty({}, "position-fixed", this.props.fixed), this.props.className);
      return React.createElement(Form.Item, _extends({}, this.props, {
        className: className
      }), this.props.children);
    }
  }]);

  return ButtonToolbar;
}(Component)) || _class;

var CARD_COL_LABEL = 8;
var CARD_COL_VALUE = 16;

var Info = function Info(props) {
  return React.createElement(Row, _extends({}, props, {
    className: cx(props.className, 'info')
  }), props.children);
};

var Label = function Label(props) {
  return React.createElement(Col, {
    span: CARD_COL_LABEL,
    className: cx(props.className, 'col-label')
  }, props.children);
};

var Value = function Value(props) {
  return React.createElement(Col, {
    span: CARD_COL_VALUE,
    className: cx(props.className, 'col-value')
  }, props.children);
};

var _dec, _class$1, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;
var ObjectSearchCreate$$1 = (_dec = inject('getEndpoint'), _dec(_class$1 = autoBindMethods(_class$1 = observer(_class$1 = (_class2 = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectSearchCreate$$1, _Component);

  function ObjectSearchCreate$$1(props) {
    var _this;

    _classCallCheck(this, ObjectSearchCreate$$1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObjectSearchCreate$$1).call(this, props));

    _initializerDefineProperty(_this, "search", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "options", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "isAddingNew", _descriptor3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "AddNewForm", _descriptor4, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.AddNewForm = Form.create({
      onValuesChange: _this.onCreateValuesChange
    })(FormFields);
    return _this;
  }

  _createClass(ObjectSearchCreate$$1, [{
    key: "handleSearch",
    value: function () {
      var _handleSearch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(value) {
        var getEndpoint, _this$fieldConfig, endpoint, searchFilters, params, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                getEndpoint = this.injected.getEndpoint, _this$fieldConfig = this.fieldConfig, endpoint = _this$fieldConfig.endpoint, searchFilters = _this$fieldConfig.searchFilters, params = _objectSpread({
                  search: value
                }, searchFilters);
                this.search = value;
                _context.next = 4;
                return getEndpoint("/".concat(endpoint, "/").concat(toKey(params)));

              case 4:
                response = _context.sent;
                this.options = response.results.map(function (option) {
                  return {
                    name: option.name,
                    value: option.id
                  };
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSearch(_x) {
        return _handleSearch.apply(this, arguments);
      }

      return handleSearch;
    }()
  }, {
    key: "addNew",
    value: function addNew() {
      this.isAddingNew.setTrue();
    }
  }, {
    key: "onCreateValuesChange",
    value: function onCreateValuesChange(_props, _changedValues, allValues) {
      var onChange = this.injected.onChange;

      if (onChange) {
        onChange(allValues);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isAddingNew.isTrue) {
        return React.createElement(React.Fragment, null, React.createElement(this.AddNewForm, {
          fieldSet: this.fieldConfig.createFields
        }), React.createElement(Button, {
          size: "small",
          onClick: this.isAddingNew.setFalse
        }, React.createElement(Icon, {
          type: "left"
        }), " Back to search"));
      }

      return React.createElement(React.Fragment, null, React.createElement(Input.Group, {
        compact: true
      }, React.createElement(Select, _extends({
        allowClear: true,
        defaultActiveFirstOption: false,
        filterOption: false,
        labelInValue: true,
        onSearch: this.handleSearch,
        placeholder: "Select existing",
        showSearch: true
      }, omit(this.props, ['value', 'getEndpoint'])), this.options.map(function (option) {
        return React.createElement(Select.Option, {
          value: option.value,
          key: option.value
        }, option.name);
      })), React.createElement(Button, {
        disabled: this.search.length < 3,
        icon: "plus",
        onClick: this.addNew
      }, "Add New")));
    }
  }, {
    key: "injected",
    get: function get$$1() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get$$1() {
      return this.props.fieldConfig;
    }
  }]);

  return ObjectSearchCreate$$1;
}(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "search", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "options", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isAddingNew", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "AddNewForm", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class$1) || _class$1) || _class$1);

var _dec$1, _class$2;
var OptionSelect = (_dec$1 = inject('getOptions'), _dec$1(_class$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(OptionSelect, _Component);

  function OptionSelect() {
    _classCallCheck(this, OptionSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionSelect).apply(this, arguments));
  }

  _createClass(OptionSelect, [{
    key: "render",
    value: function render() {
      return React.createElement(Select, _extends({
        allowClear: true,
        optionFilterProp: "children",
        showSearch: !!this.fieldConfig.showSearch
      }, this.props), this.options.map(function (option) {
        return React.createElement(Select.Option, {
          value: option.value,
          key: option.value
        }, option.name);
      }));
    }
  }, {
    key: "injected",
    get: function get$$1() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get$$1() {
      return this.props.fieldConfig;
    }
  }, {
    key: "unsortedOptions",
    get: function get$$1() {
      var _this$fieldConfig = this.fieldConfig,
          options = _this$fieldConfig.options,
          optionType = _this$fieldConfig.optionType;

      if (options) {
        return options;
      }

      if (this.fieldConfig.getOptions) {
        return this.fieldConfig.getOptions(optionType);
      }

      if (this.injected.getOptions) {
        return this.injected.getOptions(optionType);
      }

      return [];
    }
  }, {
    key: "options",
    get: function get$$1() {
      return this.fieldConfig.sorted ? sortBy(this.unsortedOptions, 'name') : this.unsortedOptions;
    }
  }]);

  return OptionSelect;
}(Component)) || _class$2);

function formatRating(value) {
  return value ? React.createElement(Rate, {
    disabled: true,
    defaultValue: +value
  }) : EMPTY_FIELD;
}

var Rate$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(Rate$$1, _Component);

  function Rate$$1() {
    _classCallCheck(this, Rate$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rate$$1).apply(this, arguments));
  }

  _createClass(Rate$$1, [{
    key: "render",
    value: function render() {
      return React.createElement(Rate, _extends({}, this.props, {
        value: Number(this.props.value)
      }));
    }
  }]);

  return Rate$$1;
}(Component);

var _dec$2, _class$3;
var OptionSelectDisplay = (_dec$2 = inject('getOptions'), _dec$2(_class$3 = autoBindMethods(_class$3 = observer(_class$3 =
/*#__PURE__*/
function (_Component) {
  _inherits(OptionSelectDisplay, _Component);

  function OptionSelectDisplay() {
    _classCallCheck(this, OptionSelectDisplay);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionSelectDisplay).apply(this, arguments));
  }

  _createClass(OptionSelectDisplay, [{
    key: "render",
    value: function render() {
      var value = this.props.value,
          option = this.options.find(function (o) {
        return o.value === value;
      });

      if (!option) {
        return '--';
      }

      return option.name;
    }
  }, {
    key: "injected",
    get: function get$$1() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get$$1() {
      return this.props.fieldConfig;
    }
  }, {
    key: "options",
    get: function get$$1() {
      var _this$fieldConfig = this.fieldConfig,
          options = _this$fieldConfig.options,
          optionType = _this$fieldConfig.optionType;

      if (options) {
        return options;
      }

      if (this.fieldConfig.getOptions) {
        return this.fieldConfig.getOptions(optionType);
      }

      if (this.injected.getOptions) {
        return this.injected.getOptions(optionType);
      }

      return [];
    }
  }]);

  return OptionSelectDisplay;
}(Component)) || _class$3) || _class$3) || _class$3);
function formatOptionSelect(value, fieldConfig) {
  if (isArray(value)) {
    if (value.length > 1) {
      return "(".concat(value.length, " values)");
    }

    return React.createElement(OptionSelectDisplay, {
      value: value[0],
      fieldConfig: fieldConfig
    });
  }

  return React.createElement(OptionSelectDisplay, {
    value: value,
    fieldConfig: fieldConfig
  });
}

function stripFieldConfig(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value) {
    return func(value);
  };
}

var TYPES = {
  boolean: {
    render: stripFieldConfig(mapBooleanToText)
  },
  date: {
    editComponent: DatePicker,
    fromForm: function fromForm(value) {
      return value && format(value, 'YYYY-MM-DD');
    },
    render: stripFieldConfig(formatDate),
    toForm: function toForm(data, field) {
      return get(data, field, null) && moment(data[field]);
    }
  },
  duration: {
    formValidationRules: [{
      message: 'Must be a valid iso8601 duration',
      pattern: pattern
    }],
    nullify: true
  },
  email: {
    formValidationRules: [{
      message: 'Must be a valid email address',
      type: 'email'
    }]
  },
  money: {
    editProps: {
      addonBefore: '$',
      type: 'number'
    },
    formValidationRules: [{
      message: 'Amount must be greater than or equal to 0',
      min: 0,
      transform: function transform(value) {
        return value ? Number(value) : undefined;
      },
      type: 'number'
    }],
    nullify: true,
    render: stripFieldConfig(formatMoney),
    toForm: function toForm(data, field) {
      return get(data, field, '');
    }
  },
  number: {
    editComponent: Input,
    editProps: {
      type: 'number'
    },
    nullify: true,
    render: formatCommaSeparatedNumber
  },
  objectSearchCreate: {
    editComponent: ObjectSearchCreate$$1,
    fieldConfigProp: true
  },
  optionSelect: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    nullify: true,
    render: formatOptionSelect
  },
  percent: {
    editProps: {
      addonAfter: '%',
      type: 'number'
    },
    formValidationRules: [{
      max: 100,
      message: 'Percentage must be an integer between 0 and 100',
      min: 0,
      transform: function transform(value) {
        return value ? Number(value) : undefined;
      },
      type: 'integer'
    }],
    fromForm: function fromForm(value) {
      return value && getPercentValue(value);
    },
    render: stripFieldConfig(formatPercentage),
    toForm: function toForm(data, field) {
      return getPercentDisplay(get(data, field));
    }
  },
  rating: {
    editComponent: Rate$1,
    nullify: true,
    render: formatRating
  },
  string: {},
  text: {
    editComponent: Input.TextArea,
    editProps: {
      autosize: {
        minRows: 4
      }
    },
    render: stripFieldConfig(parseAndPreserveNewlines)
  }
};

var typeDefaults = {
  editComponent: Input,
  fieldConfigProp: false,
  formValidationRules: [],
  fromForm: function fromForm(value) {
    return value;
  },
  nullify: false,
  toForm: function toForm(data, field) {
    return get(data, field, '');
  }
};

function stripFieldConfig$1(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value) {
    return func(value);
  };
}

function getFieldSuffix(field) {
  return (field || '').split('.').pop() || '';
} // tslint:disable-next-line cyclomatic-complexity


function inferType(fieldConfig) {
  if (fieldConfig.type) {
    return fieldConfig.type;
  }

  var field = getFieldSuffix(fieldConfig.field);

  if (field.includes('duration')) {
    return 'duration';
  }

  if (field.includes('rating')) {
    return 'rating';
  }

  if (field.includes('amount')) {
    return 'money';
  }

  if (field.endsWith('_on')) {
    return 'date';
  }

  if (field.startsWith('date')) {
    return 'date';
  }

  if (field.endsWith('date')) {
    return 'date';
  }

  if (field.endsWith('_at')) {
    return 'date';
  }

  if (field.startsWith('is_')) {
    return 'boolean';
  }

  if (field.includes('note')) {
    return 'text';
  }

  if (field.includes('body')) {
    return 'text';
  }

  if (field.includes('summary')) {
    return 'text';
  }

  if (field.includes('percent')) {
    return 'percent';
  }

  return 'string';
}

function isPartialFieldSetSimple(fieldSet) {
  return isArray(fieldSet);
}
function isFieldSetSimple(fieldSet) {
  return isArray(fieldSet);
}
function filterInsertIf(fieldConfig, model) {
  return fieldConfig.insertIf && !fieldConfig.insertIf(model);
}
function fillInFieldConfig(fieldConfig) {
  var type = inferType(fieldConfig),
      label = varToLabel(getFieldSuffix(fieldConfig.field));
  var requiredValidationRule = [];

  if (fieldConfig.required) {
    requiredValidationRule.push({
      message: 'Field required',
      required: true
    });
  }

  return _objectSpread({
    key: fieldConfig.field,
    label: label,
    readOnly: false,
    render: stripFieldConfig$1(getOrDefault),
    required: false,
    showLabel: true,
    type: type
  }, typeDefaults, TYPES[type], fieldConfig, {
    editProps: _objectSpread({}, fieldConfig.editProps, TYPES[type].editProps),
    formValidationRules: [].concat(_toConsumableArray(fieldConfig.formValidationRules || []), _toConsumableArray(TYPES[type].formValidationRules || []), requiredValidationRule)
  });
}
function fillInFieldSet(fieldSet) {
  // Fills in the defaults from common so we can keep configurations light
  if (isPartialFieldSetSimple(fieldSet)) {
    return fieldSet.map(fillInFieldConfig);
  }

  return _objectSpread({}, fieldSet, {
    fields: fieldSet.fields.map(fillInFieldConfig)
  });
}
function fillInFieldSets(fieldSets) {
  return fieldSets.map(fillInFieldSet);
}
function getCardModel(model, cardConfig) {
  var accessor = cardConfig.accessor;

  if (accessor) {
    return get(model, accessor);
  }

  return model;
}
function getFieldSetFields(fieldSet) {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return fieldSet.fields;
}

var CardRow =
/*#__PURE__*/
function (_Component) {
  _inherits(CardRow, _Component);

  function CardRow() {
    _classCallCheck(this, CardRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardRow).apply(this, arguments));
  }

  _createClass(CardRow, [{
    key: "render",
    value: function render() {
      var model = this.props.model,
          fieldConfig = fillInFieldConfig(this.props.fieldConfig),
          field = fieldConfig.field,
          render = fieldConfig.render,
          label = fieldConfig.label,
          showLabel = fieldConfig.showLabel,
          writeOnly = fieldConfig.writeOnly;

      if (!render) {
        // istanbul ignore next
        return;
      }

      var value = render(fieldConfig.value || get(model, field), fieldConfig);

      if (writeOnly || filterInsertIf(fieldConfig, model)) {
        return null;
      }

      return React.createElement(Info, {
        key: field
      }, !showLabel ? value : React.createElement(React.Fragment, null, React.createElement(Label, null, label), React.createElement(Value, null, value)));
    }
  }]);

  return CardRow;
}(Component);

var _class$4;

var FormField = autoBindMethods(_class$4 = observer(_class$4 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormField).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          form = _this$props.form,
          defaults = _this$props.defaults,
          fieldConfig = _this$props.fieldConfig,
          getFieldDecorator = form.getFieldDecorator;

      var initialValue = fieldConfig.value || fieldConfig.toForm(model, fieldConfig.field) || fieldConfig.toForm(defaults, fieldConfig.field),
          EditComponent = fieldConfig.editComponent,
          decoratorOptions = {
        initialValue: initialValue,
        rules: fieldConfig.formValidationRules
      },
          fieldConfigProp = fieldConfig.fieldConfigProp ? {
        fieldConfig: fieldConfig
      } : {},
          editProps = _objectSpread({}, fieldConfig.editProps, fieldConfigProp);

      if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
        return null;
      }

      return React.createElement(Form.Item, {
        label: fieldConfig.label
      }, getFieldDecorator(fieldConfig.field, decoratorOptions)(React.createElement(EditComponent, editProps)));
    }
  }]);

  return FormField;
}(Component)) || _class$4) || _class$4;

var _class$5, _class2$1;

var FormFields = autoBindMethods(_class$5 = observer(_class$5 = (_class2$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormFields, _Component);

  function FormFields() {
    _classCallCheck(this, FormFields);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormFields).apply(this, arguments));
  }

  _createClass(FormFields, [{
    key: "render",
    value: function render() {
      var _this = this;

      var fieldConfigs = getFieldSetFields(this.fieldSet),
          legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend;
      return React.createElement(React.Fragment, null, legend && React.createElement("h3", null, legend), fieldConfigs.map(function (fieldConfig, index) {
        return React.createElement(FormField, _extends({}, _this.props, {
          fieldConfig: fieldConfig,
          key: "field-config-".concat(fieldConfig.field, "-").concat(index)
        }));
      }));
    }
  }, {
    key: "fieldSet",
    get: function get$$1() {
      return fillInFieldSet(this.props.fieldSet);
    }
  }]);

  return FormFields;
}(Component), (_applyDecoratedDescriptor(_class2$1.prototype, "fieldSet", [computed], Object.getOwnPropertyDescriptor(_class2$1.prototype, "fieldSet"), _class2$1.prototype)), _class2$1)) || _class$5) || _class$5;

var GuardedButton =
/*#__PURE__*/
function (_Component) {
  _inherits(GuardedButton, _Component);

  function GuardedButton(props) {
    var _this;

    _classCallCheck(this, GuardedButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GuardedButton).call(this, props));
    _this.guardedContainer = void 0;
    var isGuarded = _this.props.isGuarded,
        disabledComponent = createDisabledContainer(Button);
    _this.guardedContainer = createGuardedContainer({
      disabledComponent: disabledComponent,
      enabledComponent: Button,
      isGuarded: isGuarded
    });
    return _this;
  }

  _createClass(GuardedButton, [{
    key: "render",
    value: function render() {
      var GuardedContainer = this.guardedContainer,
          omitProps = ['isGuarded'];

      if (this.props.confirm) {
        omitProps.push('confirm');
        omitProps.push('onClick');
        return React.createElement(Popconfirm, {
          title: "Are you sure?",
          onConfirm: this.props.onClick
        }, React.createElement(GuardedContainer, omit(this.props, omitProps)));
      }

      return React.createElement(GuardedContainer, omit(this.props, omitProps));
    }
  }]);

  return GuardedButton;
}(Component);

var _class$6, _class2$2;

var Card$1 = observer(_class$6 = (_class2$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(Card$$1, _Component);

  function Card$$1() {
    _classCallCheck(this, Card$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card$$1).apply(this, arguments));
  }

  _createClass(Card$$1, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cardConfig = _this$props.cardConfig,
          renderTopRight = _this$props.renderTopRight,
          isLoading = _this$props.isLoading,
          model = getCardModel(this.props.model, cardConfig);
      return React.createElement(Card, {
        title: cardConfig.title,
        extra: renderTopRight && renderTopRight(),
        loading: isLoading
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React.createElement(Fragment, {
          key: idx
        }, idx > 0 && React.createElement(Divider, {
          key: "divider-".concat(idx)
        }), getFieldSetFields(fieldSet).map(function (fieldConfig) {
          return React.createElement(CardRow, {
            fieldConfig: fieldConfig,
            key: fieldConfig.field,
            model: model
          });
        }));
      }), this.props.children);
    }
  }, {
    key: "fieldSets",
    get: function get$$1() {
      return fillInFieldSets(this.props.cardConfig.fieldSets);
    }
  }]);

  return Card$$1;
}(Component), (_applyDecoratedDescriptor(_class2$2.prototype, "fieldSets", [computed], Object.getOwnPropertyDescriptor(_class2$2.prototype, "fieldSets"), _class2$2.prototype)), _class2$2)) || _class$6;

var _class$7;

var ArrayCard = observer(_class$7 =
/*#__PURE__*/
function (_Component) {
  _inherits(ArrayCard, _Component);

  function ArrayCard() {
    _classCallCheck(this, ArrayCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(ArrayCard).apply(this, arguments));
  }

  _createClass(ArrayCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cardConfig = _this$props.cardConfig,
          extra = _this$props.extra,
          isLoading = _this$props.isLoading,
          model = getCardModel(this.props.model, cardConfig);

      if (isEmpty(model)) {
        return null;
      }

      return React.createElement(Card, {
        title: cardConfig.title,
        extra: extra,
        loading: isLoading
      }, model.map(function (modelItem) {
        return React.createElement(Card$1, {
          key: modelItem.id,
          cardConfig: _objectSpread({}, cardConfig, {
            title: ''
          }),
          model: modelItem
        });
      }));
    }
  }]);

  return ArrayCard;
}(Component)) || _class$7;

var _class$8;

var Cards = observer(_class$8 =
/*#__PURE__*/
function (_Component) {
  _inherits(Cards, _Component);

  function Cards() {
    _classCallCheck(this, Cards);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cards).apply(this, arguments));
  }

  _createClass(Cards, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          isLoading = _this$props.isLoading,
          cardConfigs = _this$props.cardConfigs;
      return cardConfigs.map(function (cardConfig, idx) {
        if (cardConfig.isArray) {
          return React.createElement(Row, {
            key: "detail-cards-".concat(idx)
          }, React.createElement(ArrayCard, {
            cardConfig: cardConfig,
            model: model,
            isLoading: isLoading
          }));
        }

        return React.createElement(Row, {
          key: "detail-cards-".concat(idx)
        }, React.createElement(Card$1, {
          cardConfig: cardConfig,
          model: model,
          isLoading: isLoading
        }));
      });
    }
  }]);

  return Cards;
}(Component)) || _class$8;

var _class$9, _class2$3, _descriptor$1, _temp$1;

var FormManager = autoBindMethods(_class$9 = (_class2$3 = (_temp$1 =
/*#__PURE__*/
function () {
  function FormManager(form, fieldSets, args) {
    _classCallCheck(this, FormManager);

    _initializerDefineProperty(this, "saving", _descriptor$1, this);

    this.args = void 0;
    this.args = _objectSpread({
      fieldSets: fieldSets,
      form: form,
      model: {},
      onSave: noop,
      onSuccess: noop
    }, args);
  }

  _createClass(FormManager, [{
    key: "onSave",
    value: function () {
      var _onSave = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(event) {
        var _this$args, form, onSave, onSuccess, hasValidationErrors, description;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$args = this.args, form = _this$args.form, onSave = _this$args.onSave, onSuccess = _this$args.onSuccess;
                event.preventDefault();
                form.validateFields();
                hasValidationErrors = Object.values(flatten(form.getFieldsError())).some(function (field) {
                  return !!field;
                });

                if (!hasValidationErrors) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                this.saving = true;
                _context.prev = 7;
                _context.next = 10;
                return onSave(this.formModel);

              case 10:
                notification.success({
                  description: '',
                  duration: 3,
                  message: 'Success'
                });
                onSuccess();
                _context.next = 19;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                description = get(_context.t0, 'request.responseText', 'No Response from server'); // tslint:disable-next-line no-console

                console.warn("FormManager.onSave error: ".concat(description));
                notification.error({
                  description: description,
                  duration: null,
                  message: 'Error submitting form'
                });

              case 19:
                _context.prev = 19;
                this.args.form.resetFields();
                this.saving = false;
                return _context.finish(19);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 14, 19, 23]]);
      }));

      function onSave(_x) {
        return _onSave.apply(this, arguments);
      }

      return onSave;
    }()
  }, {
    key: "formModel",
    get: function get$$1() {
      var _this$args2 = this.args,
          form = _this$args2.form,
          fieldSets = _this$args2.fieldSets,
          model = form.getFieldsValue();
      fieldSets.forEach(function (fieldSet) {
        getFieldSetFields(fieldSet).forEach(function (fieldConfig) {
          var formValue = get(model, fieldConfig.field),
              value = fieldConfig.fromForm(formValue);

          if (!value && fieldConfig.nullify) {
            set(model, fieldConfig.field, null);
          } else {
            set(model, fieldConfig.field, value);
          }
        });
      });

      if (this.args.model && this.args.model.id) {
        model.id = this.args.model.id;
      }

      return model;
    }
  }]);

  return FormManager;
}(), _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$3.prototype, "saving", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2$3)) || _class$9;

var _class$a, _class2$4, _temp$2;

var FormCard = autoBindMethods(_class$a = observer(_class$a = (_class2$4 = (_temp$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormCard, _Component);

  function FormCard(props) {
    var _this;

    _classCallCheck(this, FormCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormCard).call(this, props));
    _this.formManager = void 0;
    var model = props.model,
        onSave = props.onSave,
        close = props.close;
    _this.formManager = new FormManager(props.form, _this.fieldSets, {
      model: model,
      onSave: onSave,
      onSuccess: close
    });
    return _this;
  }

  _createClass(FormCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cardConfig = _this$props.cardConfig,
          close = _this$props.close,
          defaults = _this$props.defaults,
          model = _this$props.model,
          form = _this$props.form,
          renderTopRight = _this$props.renderTopRight;
      return React.createElement(Card, {
        title: cardConfig.title,
        extra: renderTopRight && renderTopRight()
      }, React.createElement(Form, {
        onSubmit: this.formManager.onSave,
        className: "notes-form"
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React.createElement(Fragment, {
          key: idx
        }, idx > 0 && React.createElement(Divider, {
          key: "divider-".concat(idx)
        }), React.createElement("div", null, React.createElement(FormFields, {
          defaults: defaults,
          fieldSet: fieldSet,
          form: form,
          model: model
        })));
      }), this.props.children, React.createElement("div", {
        className: "button-toolbar"
      }, React.createElement(Button, {
        htmlType: "submit",
        loading: this.formManager.saving,
        size: "large",
        type: "primary"
      }, "Save"), React.createElement(Button, {
        disabled: this.formManager.saving,
        onClick: close,
        size: "large"
      }, "Cancel"))));
    }
  }, {
    key: "fieldSets",
    get: function get$$1() {
      return fillInFieldSets(this.props.cardConfig.fieldSets);
    }
  }]);

  return FormCard;
}(Component), _temp$2), (_applyDecoratedDescriptor(_class2$4.prototype, "fieldSets", [computed], Object.getOwnPropertyDescriptor(_class2$4.prototype, "fieldSets"), _class2$4.prototype)), _class2$4)) || _class$a) || _class$a;

var WrappedFormCard = Form.create()(FormCard);

var _class$b, _class2$5, _descriptor$2, _descriptor2$1, _class3, _temp$3;

var EditableCard = autoBindMethods(_class$b = observer(_class$b = (_class2$5 = (_temp$3 = _class3 =
/*#__PURE__*/
function (_Component) {
  _inherits(EditableCard, _Component);

  function EditableCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isDeleting", _descriptor$2, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "isEditing", _descriptor2$1, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(EditableCard, [{
    key: "handleDelete",
    value: function () {
      var _handleDelete = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$propsWithDefaul, model, onDelete, onSuccess;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$propsWithDefaul = this.propsWithDefaults, model = _this$propsWithDefaul.model, onDelete = _this$propsWithDefaul.onDelete, onSuccess = _this$propsWithDefaul.onSuccess;

                if (onDelete) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                this.isDeleting.set(true);
                _context.next = 6;
                return onDelete(model);

              case 6:
                _context.next = 8;
                return onSuccess();

              case 8:
                this.isDeleting.set(false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleDelete() {
        return _handleDelete.apply(this, arguments);
      }

      return handleDelete;
    }()
  }, {
    key: "handleSave",
    value: function () {
      var _handleSave = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(model) {
        var _this$propsWithDefaul2, onSuccess, onSave;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$propsWithDefaul2 = this.propsWithDefaults, onSuccess = _this$propsWithDefaul2.onSuccess, onSave = _this$propsWithDefaul2.onSave;
                _context2.next = 3;
                return onSave(model);

              case 3:
                _context2.next = 5;
                return onSuccess();

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleSave(_x) {
        return _handleSave.apply(this, arguments);
      }

      return handleSave;
    }()
  }, {
    key: "buttons",
    value: function buttons() {
      return React.createElement(ButtonToolbar, null, this.deleteButton, this.editButton);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isEditing.isTrue) {
        return React.createElement(WrappedFormCard, _extends({}, this.props, {
          close: this.isEditing.setFalse,
          onSave: this.handleSave,
          renderTopRight: this.buttons
        }));
      }

      return React.createElement(Card$1, _extends({}, this.props, {
        renderTopRight: this.buttons
      }));
    }
  }, {
    key: "propsWithDefaults",
    get: function get$$1() {
      return this.props;
    }
  }, {
    key: "deleteButton",
    get: function get$$1() {
      var _this$propsWithDefaul3 = this.propsWithDefaults,
          isGuarded = _this$propsWithDefaul3.isGuarded,
          cardConfig = _this$propsWithDefaul3.cardConfig,
          onDelete = _this$propsWithDefaul3.onDelete,
          isLoading = _this$propsWithDefaul3.isLoading,
          classNameSuffix = cardConfig.classNameSuffix || kebabCase(cardConfig.title);

      if (!onDelete) {
        return;
      }

      return React.createElement(GuardedButton, {
        className: "btn-delete-".concat(classNameSuffix),
        confirm: true,
        disabled: isLoading || this.isDeleting.isTrue,
        icon: "delete",
        isGuarded: isGuarded,
        onClick: this.handleDelete,
        size: "small",
        type: "danger"
      }, "Delete");
    }
  }, {
    key: "editButton",
    get: function get$$1() {
      var _this$propsWithDefaul4 = this.propsWithDefaults,
          cardConfig = _this$propsWithDefaul4.cardConfig,
          isLoading = _this$propsWithDefaul4.isLoading,
          isGuarded = _this$propsWithDefaul4.isGuarded,
          classNameSuffix = cardConfig.classNameSuffix || kebabCase(cardConfig.title);
      return React.createElement(GuardedButton, {
        className: "btn-edit-".concat(classNameSuffix),
        disabled: isLoading || this.isEditing.isTrue || this.isDeleting.isTrue,
        icon: "edit",
        isGuarded: isGuarded,
        onClick: this.isEditing.setTrue,
        size: "small",
        type: "primary"
      }, "Edit");
    }
  }]);

  return EditableCard;
}(Component), _class3.defaultProps = {
  onSuccess: function () {
    var _onSuccess = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return");

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function onSuccess() {
      return _onSuccess.apply(this, arguments);
    }

    return onSuccess;
  }()
}, _temp$3), (_descriptor$2 = _applyDecoratedDescriptor(_class2$5.prototype, "isDeleting", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$1 = _applyDecoratedDescriptor(_class2$5.prototype, "isEditing", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$5)) || _class$b) || _class$b;

var _class$c, _class2$6, _descriptor$3, _temp$4;

var EditableArrayCard = autoBindMethods(_class$c = observer(_class$c = (_class2$6 = (_temp$4 =
/*#__PURE__*/
function (_Component) {
  _inherits(EditableArrayCard, _Component);

  function EditableArrayCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableArrayCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableArrayCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$3, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(EditableArrayCard, [{
    key: "handleSaveNew",
    value: function () {
      var _handleSaveNew = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(model) {
        var _this$props, onCreate, onSuccess;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, onCreate = _this$props.onCreate, onSuccess = _this$props.onSuccess;
                _context.next = 3;
                return onCreate(model);

              case 3:
                _context.next = 5;
                return onSuccess();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSaveNew(_x) {
        return _handleSaveNew.apply(this, arguments);
      }

      return handleSaveNew;
    }()
  }, {
    key: "renderAddNew",
    value: function renderAddNew() {
      var _this$props2 = this.props,
          cardConfig = _this$props2.cardConfig,
          isLoading = _this$props2.isLoading,
          isGuarded = _this$props2.isGuarded,
          classNameSuffix = cardConfig.classNameSuffix || kebabCase(cardConfig.title);
      return React.createElement(GuardedButton, {
        className: "btn-new-".concat(classNameSuffix),
        disabled: isLoading || this.isAddingNew.isTrue,
        icon: "plus",
        isGuarded: isGuarded,
        onClick: this.isAddingNew.setTrue,
        size: "small",
        type: "primary"
      }, "Add");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          cardConfig = _this$props3.cardConfig,
          defaults = _this$props3.defaults,
          isLoading = _this$props3.isLoading,
          model = _this$props3.model,
          onDelete = _this$props3.onDelete,
          onSave = _this$props3.onSave,
          onSuccess = _this$props3.onSuccess;
      return React.createElement(Card, {
        title: cardConfig.title,
        extra: this.renderAddNew(),
        loading: isLoading
      }, this.isAddingNew.isTrue && React.createElement(WrappedFormCard, {
        cardConfig: _objectSpread({}, cardConfig, {
          title: "New ".concat(cardConfig.title)
        }),
        close: this.isAddingNew.setFalse,
        defaults: defaults,
        onSave: this.handleSaveNew
      }), isEmpty(model) && !this.isAddingNew.isTrue && React.createElement("p", {
        className: "empty-message"
      }, "No records"), model.map(function (modelItem) {
        return React.createElement(EditableCard, {
          onDelete: onDelete,
          onSave: onSave,
          cardConfig: _objectSpread({}, cardConfig, {
            classNameSuffix: kebabCase(cardConfig.title),
            title: ''
          }),
          key: modelItem.id,
          model: modelItem,
          onSuccess: onSuccess
        });
      }));
    }
  }]);

  return EditableArrayCard;
}(Component), _temp$4), (_descriptor$3 = _applyDecoratedDescriptor(_class2$6.prototype, "isAddingNew", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$6)) || _class$c) || _class$c;

var _class$d, _class2$7, _class3$1, _temp$5;

var SummaryCard = autoBindMethods(_class$d = observer(_class$d = (_class2$7 = (_temp$5 = _class3$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(SummaryCard, _Component);

  function SummaryCard() {
    _classCallCheck(this, SummaryCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(SummaryCard).apply(this, arguments));
  }

  _createClass(SummaryCard, [{
    key: "renderItem",
    value: function renderItem(fieldConfig) {
      var model = this.props.model;
      var value = fieldConfig.value || result(model, fieldConfig.field),
          className = "summary-".concat(kebabCase(fieldConfig.field));
      return React.createElement(List.Item, {
        key: fieldConfig.field,
        className: className,
        extra: null
      }, React.createElement("h4", null, fieldConfig.label), React.createElement("p", null, fieldConfig.render(value, fieldConfig)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          cardConfig = _this$props.cardConfig,
          column = _this$props.column,
          isLoading = _this$props.isLoading,
          renderTopRight = _this$props.renderTopRight,
          className = _this$props.className;
      return React.createElement(Card, {
        className: cx('summary-card', className),
        extra: renderTopRight && renderTopRight(),
        loading: isLoading,
        title: cardConfig.title
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React.createElement(List, {
          className: "list-summary",
          dataSource: getFieldSetFields(fieldSet),
          grid: {
            gutter: 24,
            column: column
          },
          key: idx,
          renderItem: _this.renderItem
        });
      }));
    }
  }, {
    key: "fieldSets",
    get: function get$$1() {
      return fillInFieldSets(this.props.cardConfig.fieldSets);
    }
  }]);

  return SummaryCard;
}(Component), _class3$1.defaultProps = {
  column: 4
}, _temp$5), (_applyDecoratedDescriptor(_class2$7.prototype, "fieldSets", [computed], Object.getOwnPropertyDescriptor(_class2$7.prototype, "fieldSets"), _class2$7.prototype)), _class2$7)) || _class$d) || _class$d;

var _class$e, _class2$8, _temp$6;
var DRAWER_WIDTH = 420;

var BaseFormDrawer = autoBindMethods(_class$e = observer(_class$e = (_class2$8 = (_temp$6 =
/*#__PURE__*/
function (_Component) {
  _inherits(BaseFormDrawer, _Component);

  _createClass(BaseFormDrawer, [{
    key: "fieldSets",
    get: function get$$1() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  function BaseFormDrawer(props) {
    var _this;

    _classCallCheck(this, BaseFormDrawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseFormDrawer).call(this, props));
    _this.formManager = void 0;
    var form = props.form,
        isVisible = props.isVisible,
        model = props.model,
        onSave = props.onSave,
        onSuccess = props.onSuccess;
    _this.formManager = new FormManager(form, _this.fieldSets, {
      model: model,
      onSave: onSave,
      onSuccess: onSuccess || isVisible.setFalse
    });
    return _this;
  }

  _createClass(BaseFormDrawer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          form = _this$props.form,
          isVisible = _this$props.isVisible,
          model = _this$props.model,
          title = _this$props.title;
      return React.createElement(Drawer, {
        closable: true,
        destroyOnClose: true,
        maskClosable: false,
        onClose: isVisible.setFalse,
        placement: "right",
        title: title,
        visible: isVisible.isTrue,
        width: DRAWER_WIDTH
      }, React.createElement(Form, {
        layout: "vertical",
        hideRequiredMark: true,
        onSubmit: this.formManager.onSave
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React.createElement("div", null, React.createElement(FormFields, {
          fieldSet: fieldSet,
          form: form,
          key: idx,
          model: model
        }));
      }), React.createElement(Divider, null), React.createElement(ButtonToolbar, {
        align: "right"
      }, React.createElement(Button, {
        disabled: this.formManager.saving,
        onClick: isVisible.setFalse,
        size: "large"
      }, "Cancel"), React.createElement(Button, {
        loading: this.formManager.saving,
        type: "primary",
        htmlType: "submit",
        size: "large"
      }, "Submit"))));
    }
  }]);

  return BaseFormDrawer;
}(Component), _temp$6), (_applyDecoratedDescriptor(_class2$8.prototype, "fieldSets", [computed], Object.getOwnPropertyDescriptor(_class2$8.prototype, "fieldSets"), _class2$8.prototype)), _class2$8)) || _class$e) || _class$e;

var FormDrawer$$1 = Form.create()(BaseFormDrawer);

var _class$f, _class2$9, _class3$2, _temp$7;

var FormModal = autoBindMethods(_class$f = observer(_class$f = (_class2$9 = (_temp$7 = _class3$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormModal, _Component);

  _createClass(FormModal, [{
    key: "propsWithDefaults",
    get: function get$$1() {
      return this.props;
    }
  }]);

  function FormModal(props) {
    var _this;

    _classCallCheck(this, FormModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormModal).call(this, props));
    _this.formManager = void 0;
    var model = props.model,
        onSave = props.onSave,
        close = props.close;
    _this.formManager = new FormManager(props.form, _this.fieldSets, {
      model: model,
      onSave: onSave,
      onSuccess: close
    });
    return _this;
  }

  _createClass(FormModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cardConfig = _this$props.cardConfig,
          close = _this$props.close,
          defaults = _this$props.defaults,
          model = _this$props.model,
          form = _this$props.form,
          saveText = this.propsWithDefaults.saveText;
      return React.createElement(Modal, {
        confirmLoading: this.formManager.saving,
        okText: this.formManager.saving ? 'Saving...' : saveText,
        onCancel: close,
        onOk: this.formManager.onSave,
        title: cardConfig.title,
        visible: true
      }, React.createElement(Form, {
        onSubmit: this.formManager.onSave,
        className: "notes-form"
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React.createElement("div", null, React.createElement(FormFields, {
          defaults: defaults,
          fieldSet: fieldSet,
          form: form,
          key: idx,
          model: model
        }));
      }), this.props.children));
    }
  }, {
    key: "fieldSets",
    get: function get$$1() {
      return fillInFieldSets(this.props.cardConfig.fieldSets);
    }
  }]);

  return FormModal;
}(Component), _class3$2.defaultProps = {
  saveText: 'Save'
}, _temp$7), (_applyDecoratedDescriptor(_class2$9.prototype, "fieldSets", [computed], Object.getOwnPropertyDescriptor(_class2$9.prototype, "fieldSets"), _class2$9.prototype)), _class2$9)) || _class$f) || _class$f;

var WrappedFormModal = Form.create()(FormModal);

// Lower-level building blocks and helper components

export { ButtonToolbar, CardRow, FormField, FormFields, GuardedButton, Info, Label, Value, CARD_COL_LABEL, CARD_COL_VALUE, ArrayCard, Card$1 as Card, Cards, EditableArrayCard, EditableCard, SummaryCard as FormCard, SummaryCard, FormDrawer$$1 as FormDrawer, WrappedFormModal as FormModal, ObjectSearchCreate$$1 as ObjectSearchCreate, OptionSelect, OptionSelectDisplay, formatOptionSelect, Rate$1 as Rate, FormManager, isPartialFieldSetSimple, isFieldSetSimple, filterInsertIf, fillInFieldConfig, fillInFieldSet, fillInFieldSets, getCardModel, getFieldSetFields };
