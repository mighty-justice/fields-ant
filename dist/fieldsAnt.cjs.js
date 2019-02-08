'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var autoBindMethods = _interopDefault(require('class-autobind-decorator'));
var cx = _interopDefault(require('classnames'));
var Antd = require('antd');
var lodash = require('lodash');
var utils = require('@mighty-justice/utils');
var moment = _interopDefault(require('moment'));
var dateFns = require('date-fns');
var iso8601Duration = require('iso8601-duration');
var mobx = require('mobx');
var mobxReact = require('mobx-react');
var SmartBool = _interopDefault(require('@mighty-justice/smart-bool'));
var flatten = _interopDefault(require('flat'));

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
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
      return React__default.createElement(Antd.Form.Item, _extends({}, this.props, {
        className: className
      }), this.props.children);
    }
  }]);

  return ButtonToolbar;
}(React.Component)) || _class;

var _dec, _class$1, _class2, _descriptor, _descriptor2, _temp;
var ObjectSearch = (_dec = mobxReact.inject('getEndpoint'), _dec(_class$1 = autoBindMethods(_class$1 = mobxReact.observer(_class$1 = (_class2 = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectSearch, _Component);

  function ObjectSearch() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "options", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "search", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(ObjectSearch, [{
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
                this.props.onSearchChange(this.search);
                _context.next = 5;
                return getEndpoint("/".concat(endpoint, "/").concat(utils.toKey(params)));

              case 5:
                response = _context.sent;
                this.options = response.results;

              case 7:
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
    key: "onChange",
    value: function onChange(value) {
      var foundOption = this.options.find(function (option) {
        return option.id === value.key;
      });
      this.injected.onChange(mobx.toJS(foundOption));
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.injected.id;
      return React__default.createElement(Antd.Select, _extends({
        allowClear: true,
        defaultActiveFirstOption: false,
        filterOption: false,
        id: id,
        labelInValue: true,
        onChange: this.onChange,
        onSearch: this.handleSearch,
        placeholder: "Select existing",
        showSearch: true
      }, this.selectProps), this.options.map(function (option) {
        return React__default.createElement(Antd.Select.Option, {
          key: option.id,
          value: option.id
        }, option.name);
      }));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return this.props.fieldConfig;
    }
  }, {
    key: "selectProps",
    get: function get() {
      // Handpicking specific props to avoid unintentional behaviors
      return lodash.pick(this.props.selectProps, ['suffixIcon', 'clearIcon', 'removeIcon']);
    }
  }]);

  return ObjectSearch;
}(React.Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "options", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "search", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2)) || _class$1) || _class$1) || _class$1);

var _dec$1, _class$2, _class2$1, _descriptor$1, _descriptor2$1, _temp$1;
var MIN_SEARCH_LENGTH = 3;
var ObjectSearchCreate$$1 = (_dec$1 = mobxReact.inject('getEndpoint'), _dec$1(_class$2 = autoBindMethods(_class$2 = mobxReact.observer(_class$2 = (_class2$1 = (_temp$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectSearchCreate$$1, _Component);

  function ObjectSearchCreate$$1() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectSearchCreate$$1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectSearchCreate$$1)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$1, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "search", _descriptor2$1, _assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(ObjectSearchCreate$$1, [{
    key: "handleSearch",
    value: function () {
      var _handleSearch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.search = value;

              case 1:
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
    key: "render",
    value: function render() {
      var _this$injected = this.injected,
          decoratorOptions = _this$injected.decoratorOptions,
          fieldConfig = _this$injected.fieldConfig,
          form = _this$injected.form,
          formManager = _this$injected.formManager,
          selectProps = _this$injected.selectProps;

      if (this.isAddingNew.isTrue) {
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(NestedFieldSet$$1, {
          fieldSet: this.fieldConfig.createFields,
          form: form,
          formManager: formManager,
          id: fieldConfig.field,
          label: this.fieldConfig.label,
          search: this.search
        }), React__default.createElement(Antd.Button, {
          size: "small",
          onClick: this.isAddingNew.setFalse
        }, React__default.createElement(Antd.Icon, {
          type: "left"
        }), " Back to search"));
      }

      return React__default.createElement(Antd.Form.Item, null, React__default.createElement(Antd.Input.Group, {
        className: "ant-input-group-search-create",
        compact: true
      }, form.getFieldDecorator(fieldConfig.field, decoratorOptions)(React__default.createElement(ObjectSearch, {
        fieldConfig: fieldConfig,
        formManager: formManager,
        onSearchChange: this.handleSearch,
        selectProps: selectProps
      })), React__default.createElement(Antd.Button, _extends({
        children: "Add New",
        className: "osc-add-new",
        disabled: this.search.length < MIN_SEARCH_LENGTH,
        icon: "plus",
        onClick: this.isAddingNew.setTrue
      }, this.buttonProps))));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return this.props.fieldConfig;
    }
  }, {
    key: "buttonProps",
    get: function get() {
      // Handpicking specific props to avoid unintentional behaviors
      return lodash.pick(this.props.buttonProps, ['children', 'icon']);
    }
  }]);

  return ObjectSearchCreate$$1;
}(React.Component), _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "search", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2$1)) || _class$2) || _class$2) || _class$2);

var _dec$2, _class$3, _class2$2;
var OptionSelect$$1 = (_dec$2 = mobxReact.inject('getOptions'), _dec$2(_class$3 = (_class2$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(OptionSelect$$1, _Component);

  function OptionSelect$$1() {
    _classCallCheck(this, OptionSelect$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionSelect$$1).apply(this, arguments));
  }

  _createClass(OptionSelect$$1, [{
    key: "render",
    value: function render() {
      return React__default.createElement(Antd.Select, _extends({
        allowClear: true,
        optionFilterProp: "children",
        showSearch: !!this.fieldConfig.showSearch
      }, this.props), this.options.map(function (option) {
        return React__default.createElement(Antd.Select.Option, {
          value: option.value,
          key: option.value
        }, option.name);
      }));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return this.props.fieldConfig;
    }
  }, {
    key: "options",
    get: function get() {
      return getOptions(this.fieldConfig, this.injected);
    }
  }]);

  return OptionSelect$$1;
}(React.Component), (_applyDecoratedDescriptor(_class2$2.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$2.prototype, "options"), _class2$2.prototype)), _class2$2)) || _class$3);

function formatRating(value) {
  return value ? React__default.createElement(Antd.Rate, {
    disabled: true,
    defaultValue: +value
  }) : utils.EMPTY_FIELD;
}

var Rate =
/*#__PURE__*/
function (_Component) {
  _inherits(Rate, _Component);

  function Rate() {
    _classCallCheck(this, Rate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rate).apply(this, arguments));
  }

  _createClass(Rate, [{
    key: "render",
    value: function render() {
      return React__default.createElement(Antd.Rate, _extends({}, this.props, {
        value: Number(this.props.value)
      }));
    }
  }]);

  return Rate;
}(React.Component);

var _dec$3, _class$4, _class2$3;
var OptionSelectDisplay$$1 = (_dec$3 = mobxReact.inject('getOptions'), _dec$3(_class$4 = autoBindMethods(_class$4 = mobxReact.observer(_class$4 = (_class2$3 =
/*#__PURE__*/
function (_Component) {
  _inherits(OptionSelectDisplay$$1, _Component);

  function OptionSelectDisplay$$1() {
    _classCallCheck(this, OptionSelectDisplay$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionSelectDisplay$$1).apply(this, arguments));
  }

  _createClass(OptionSelectDisplay$$1, [{
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
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return this.props.fieldConfig;
    }
  }, {
    key: "options",
    get: function get() {
      return getOptions(this.fieldConfig, this.injected);
    }
  }]);

  return OptionSelectDisplay$$1;
}(React.Component), (_applyDecoratedDescriptor(_class2$3.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$3.prototype, "options"), _class2$3.prototype)), _class2$3)) || _class$4) || _class$4) || _class$4);
function formatOptionSelect$$1(value, fieldConfig) {
  if (lodash.isArray(value)) {
    if (value.length > 1) {
      return "(".concat(value.length, " values)");
    }

    return React__default.createElement(OptionSelectDisplay$$1, {
      value: value[0],
      fieldConfig: fieldConfig
    });
  }

  return React__default.createElement(OptionSelectDisplay$$1, {
    value: value,
    fieldConfig: fieldConfig
  });
}

var _dec$4, _class$5, _class2$4;
var RadioGroup$$1 = (_dec$4 = mobxReact.inject('getOptions'), _dec$4(_class$5 = autoBindMethods(_class$5 = mobxReact.observer(_class$5 = (_class2$4 =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioGroup$$1, _Component);

  function RadioGroup$$1() {
    _classCallCheck(this, RadioGroup$$1);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioGroup$$1).apply(this, arguments));
  }

  _createClass(RadioGroup$$1, [{
    key: "render",
    value: function render() {
      return React__default.createElement(Antd.Radio.Group, this.props, this.options.map(function (option) {
        return React__default.createElement(Antd.Radio, {
          key: option.value,
          value: option.value
        }, option.name);
      }));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return this.props.fieldConfig;
    }
  }, {
    key: "options",
    get: function get() {
      return getOptions(this.fieldConfig, this.injected);
    }
  }]);

  return RadioGroup$$1;
}(React.Component), (_applyDecoratedDescriptor(_class2$4.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$4.prototype, "options"), _class2$4.prototype)), _class2$4)) || _class$5) || _class$5) || _class$5);

function stripFieldConfig(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value) {
    return func(value);
  };
}

var TYPES = {
  boolean: {
    render: stripFieldConfig(utils.mapBooleanToText)
  },
  date: {
    editComponent: Antd.DatePicker,
    fromForm: function fromForm(value) {
      return value && dateFns.format(value, 'YYYY-MM-DD');
    },
    render: stripFieldConfig(utils.formatDate),
    toForm: function toForm(data, field) {
      return lodash.get(data, field, null) && moment(data[field]);
    }
  },
  duration: {
    formValidationRules: {
      iso8601: {
        message: 'Must be a valid iso8601 duration',
        pattern: iso8601Duration.pattern
      }
    },
    nullify: true
  },
  email: {
    formValidationRules: {
      email: {
        message: 'Must be a valid email address',
        type: 'email'
      }
    }
  },
  money: {
    editProps: {
      addonBefore: '$',
      type: 'number'
    },
    formValidationRules: {
      gteZero: {
        message: 'Amount must be greater than or equal to 0',
        min: 0,
        transform: function transform(value) {
          return value ? Number(value) : undefined;
        },
        type: 'number'
      }
    },
    nullify: true,
    render: stripFieldConfig(utils.formatMoney),
    toForm: function toForm(data, field) {
      return lodash.get(data, field, '');
    }
  },
  number: {
    editComponent: Antd.Input,
    editProps: {
      type: 'number'
    },
    nullify: true,
    render: utils.formatCommaSeparatedNumber
  },
  objectSearchCreate: {
    editComponent: ObjectSearchCreate$$1,
    fieldConfigProp: true,
    nullify: true,
    render: stripFieldConfig(utils.getNameOrDefault),
    skipFieldDecorator: true
  },
  optionSelect: {
    editComponent: OptionSelect$$1,
    fieldConfigProp: true,
    nullify: true,
    render: formatOptionSelect$$1
  },
  percentage: {
    editProps: {
      addonAfter: '%',
      type: 'number'
    },
    formValidationRules: {
      percentage: {
        max: 100,
        message: 'Percentage must be an integer between 0 and 100',
        min: 0,
        transform: function transform(value) {
          return value ? Number(value) : undefined;
        },
        type: 'integer'
      }
    },
    fromForm: function fromForm(value) {
      return value && utils.getPercentValue(value);
    },
    render: stripFieldConfig(utils.formatPercentage),
    toForm: function toForm(data, field) {
      return utils.getPercentDisplay(lodash.get(data, field));
    }
  },
  radio: {
    editComponent: RadioGroup$$1,
    fieldConfigProp: true,
    nullify: true,
    render: formatOptionSelect$$1
  },
  rating: {
    editComponent: Rate,
    nullify: true,
    render: formatRating
  },
  string: {},
  text: {
    editComponent: Antd.Input.TextArea,
    editProps: {
      autosize: {
        minRows: 4
      }
    },
    render: stripFieldConfig(utils.parseAndPreserveNewlines)
  }
};

var typeDefaults = {
  editComponent: Antd.Input,
  fieldConfigProp: false,
  formValidationRules: {},
  fromForm: function fromForm(value) {
    return value;
  },
  nullify: false,
  toForm: function toForm(data, field) {
    return lodash.get(data, field, '');
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
    return 'percentage';
  }

  return 'string';
}

function isPartialFieldSetSimple(fieldSet) {
  return lodash.isArray(fieldSet);
}
function isFieldSetSimple(fieldSet) {
  return lodash.isArray(fieldSet);
}
function filterInsertIf(fieldConfig, model) {
  return fieldConfig.insertIf && !fieldConfig.insertIf(model);
}
function fillInFieldConfig(fieldConfig) {
  var type = inferType(fieldConfig),
      label = utils.varToLabel(getFieldSuffix(fieldConfig.field));
  var requiredValidationRule = fieldConfig.required ? {
    required: {
      message: 'Field required',
      required: true
    }
  } : undefined;
  return _objectSpread({
    // Universal defaults
    disabled: false,
    key: fieldConfig.field,
    label: label,
    populateFromSearch: false,
    populateNameFromSearch: false,
    readOnly: false,
    render: stripFieldConfig$1(utils.getOrDefault),
    required: false,
    showLabel: true,
    skipFieldDecorator: false,
    type: type,
    writeOnly: false
  }, typeDefaults, TYPES[type], fieldConfig, {
    // Merge nested object
    editProps: _objectSpread({}, fieldConfig.editProps, TYPES[type].editProps),
    // Merge nested object
    formValidationRules: _objectSpread({}, fieldConfig.formValidationRules, TYPES[type].formValidationRules, requiredValidationRule)
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
function getFieldSetFields(fieldSet) {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return fieldSet.fields;
}
function getUnsortedOptions(fieldConfig, injected) {
  var options = fieldConfig.options,
      optionType = fieldConfig.optionType;

  if (options) {
    return options;
  }

  if (fieldConfig.getOptions && optionType) {
    return fieldConfig.getOptions(optionType);
  }

  if (injected.getOptions && optionType) {
    return injected.getOptions(optionType);
  } // istanbul ignore next


  throw new Error('FieldConfig missing options, getOptions; getOptions not injected');
}
function getOptions(fieldConfig, injected) {
  var unsortedOptions = getUnsortedOptions(fieldConfig, injected);
  return fieldConfig.sorted ? lodash.sortBy(unsortedOptions, 'name') : unsortedOptions;
}

var CARD_COL_LABEL = 8;
var CARD_COL_VALUE = 16;

var Info = function Info(props) {
  return React__default.createElement(Antd.Row, _extends({}, props, {
    className: cx(props.className, 'info')
  }), props.children);
};

var Label = function Label(props) {
  return React__default.createElement(Antd.Col, {
    span: CARD_COL_LABEL,
    className: cx(props.className, 'col-label')
  }, props.children);
};

var Value = function Value(props) {
  return React__default.createElement(Antd.Col, {
    span: CARD_COL_VALUE,
    className: cx(props.className, 'col-value')
  }, props.children);
};

var CardField =
/*#__PURE__*/
function (_Component) {
  _inherits(CardField, _Component);

  function CardField() {
    _classCallCheck(this, CardField);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardField).apply(this, arguments));
  }

  _createClass(CardField, [{
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

      var value = render(fieldConfig.value || lodash.get(model, field), fieldConfig);

      if (writeOnly || filterInsertIf(fieldConfig, model)) {
        return null;
      }

      return React__default.createElement(Info, {
        key: field
      }, !showLabel ? value : React__default.createElement(React__default.Fragment, null, React__default.createElement(Label, null, label), React__default.createElement(Value, null, value)));
    }
  }]);

  return CardField;
}(React.Component);

var _class$6;

var FormField = autoBindMethods(_class$6 = mobxReact.observer(_class$6 =
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
          form = _this$props.form,
          fieldConfig = _this$props.fieldConfig,
          colProps = fieldConfig.colProps,
          formItemProps = fieldConfig.formItemProps,
          field = fieldConfig.field,
          skipFieldDecorator = fieldConfig.skipFieldDecorator,
          getFieldDecorator = form.getFieldDecorator;

      if (filterInsertIf(fieldConfig, form.getFieldsValue())) {
        return null;
      }

      var decoratorOptionsProp = skipFieldDecorator ? {
        decoratorOptions: this.decoratorOptions
      } : {},
          editComponent = React__default.createElement(fieldConfig.editComponent, _extends({}, this.editProps, decoratorOptionsProp)),
          wrappedComponent = skipFieldDecorator ? editComponent : getFieldDecorator(field, this.decoratorOptions)(editComponent),
          FormItemComponent = React__default.createElement(Antd.Form.Item, _extends({}, formItemProps, {
        label: this.label
      }), wrappedComponent);

      if (colProps) {
        return React__default.createElement(Antd.Col, _extends({}, colProps, {
          children: FormItemComponent
        }));
      }

      return FormItemComponent;
    }
  }, {
    key: "label",
    get: function get() {
      var fieldConfig = this.props.fieldConfig;
      return fieldConfig.showLabel ? fieldConfig.label : '';
    }
  }, {
    key: "initialValue",
    get: function get() {
      var _this$props2 = this.props,
          model = _this$props2.model,
          defaults = _this$props2.defaults,
          fieldConfig = _this$props2.fieldConfig;
      return fieldConfig.value || fieldConfig.toForm(model, fieldConfig.field) || fieldConfig.toForm(defaults, fieldConfig.field);
    }
  }, {
    key: "editProps",
    get: function get() {
      var _this$props3 = this.props,
          fieldConfig = _this$props3.fieldConfig,
          form = _this$props3.form,
          formManager = _this$props3.formManager,
          fieldConfigProp = fieldConfig.fieldConfigProp ? {
        fieldConfig: fieldConfig,
        formManager: formManager
      } : {};
      return _objectSpread({}, fieldConfig.editProps, fieldConfigProp, {
        form: form
      });
    }
  }, {
    key: "decoratorOptions",
    get: function get() {
      var fieldConfig = this.props.fieldConfig;
      return {
        initialValue: this.initialValue,
        rules: lodash.values(fieldConfig.formValidationRules)
      };
    }
  }]);

  return FormField;
}(React.Component)) || _class$6) || _class$6;

var _class$7, _class2$5;

var FormFieldSet = autoBindMethods(_class$7 = mobxReact.observer(_class$7 = (_class2$5 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormFieldSet, _Component);

  function FormFieldSet() {
    _classCallCheck(this, FormFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormFieldSet).apply(this, arguments));
  }

  _createClass(FormFieldSet, [{
    key: "render",
    value: function render() {
      var _this = this;

      var fieldConfigs = getFieldSetFields(this.fieldSet),
          formValues = this.props.form.getFieldsValue(),
          filteredFieldConfigs = fieldConfigs.filter(function (fieldConfig) {
        return !filterInsertIf(fieldConfig, formValues);
      }),
          legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend,
          rowProps = !isFieldSetSimple(this.fieldSet) && this.fieldSet.rowProps;

      if (!filteredFieldConfigs.length) {
        return null;
      }

      return React__default.createElement(React__default.Fragment, null, legend && React__default.createElement("h3", null, legend), React__default.createElement(Antd.Row, rowProps, filteredFieldConfigs.map(function (fieldConfig, idx) {
        return React__default.createElement(FormField, _extends({}, _this.props, {
          fieldConfig: fieldConfig,
          key: "field-config-".concat(fieldConfig.field, "-").concat(idx)
        }));
      })));
    }
  }, {
    key: "fieldSet",
    get: function get() {
      return fillInFieldSet(this.props.fieldSet);
    }
  }]);

  return FormFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$5.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$5.prototype, "fieldSet"), _class2$5.prototype)), _class2$5)) || _class$7) || _class$7;

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
        disabledComponent = utils.createDisabledContainer(Antd.Button);
    _this.guardedContainer = utils.createGuardedContainer({
      disabledComponent: disabledComponent,
      enabledComponent: Antd.Button,
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
        return React__default.createElement(Antd.Popconfirm, {
          title: "Are you sure?",
          onConfirm: this.props.onClick
        }, React__default.createElement(GuardedContainer, lodash.omit(this.props, omitProps)));
      }

      return React__default.createElement(GuardedContainer, lodash.omit(this.props, omitProps));
    }
  }]);

  return GuardedButton;
}(React.Component);

var _class$8, _class2$6;

var NestedFieldSet$$1 = autoBindMethods(_class$8 = mobxReact.observer(_class$8 = (_class2$6 =
/*#__PURE__*/
function (_Component) {
  _inherits(NestedFieldSet$$1, _Component);

  function NestedFieldSet$$1(props) {
    var _this;

    _classCallCheck(this, NestedFieldSet$$1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NestedFieldSet$$1).call(this, props));
    props.form.setFieldsValue(_defineProperty({}, props.id, {}));
    return _this;
  }

  _createClass(NestedFieldSet$$1, [{
    key: "render",
    value: function render() {
      return React__default.createElement(FormFieldSet, {
        fieldSet: this.fieldSet,
        form: this.props.form,
        formManager: this.props.formManager,
        model: this.model
      });
    }
  }, {
    key: "fieldSet",
    get: function get() {
      var _this$props = this.props,
          id = _this$props.id,
          fieldSet = _this$props.fieldSet;
      return getFieldSetFields(fillInFieldSet(fieldSet)).map(function (fieldConfig) {
        return _objectSpread({}, fieldConfig, {
          field: "".concat(id, ".").concat(fieldConfig.field)
        });
      });
    }
  }, {
    key: "model",
    get: function get() {
      /*
      This function implements the fieldConfig features
      populateFromSearch and populateNameFromSearch
      */
      var search = this.props.search,
          _splitName = utils.splitName(search),
          _splitName2 = _slicedToArray(_splitName, 2),
          firstName = _splitName2[0],
          lastName = _splitName2[1],
          defaults = {};

      if (!search) {
        return defaults;
      }

      this.fieldSet.map(function (fieldConfig) {
        var field = fieldConfig.field,
            populateFromSearch = fieldConfig.populateFromSearch,
            populateNameFromSearch = fieldConfig.populateNameFromSearch;

        if (populateFromSearch) {
          defaults[field] = search;
        }

        if (populateNameFromSearch && field.endsWith('first_name')) {
          defaults[field] = firstName;
        }

        if (populateNameFromSearch && field.endsWith('last_name')) {
          defaults[field] = lastName;
        }
      });
      return defaults;
    }
  }]);

  return NestedFieldSet$$1;
}(React.Component), (_applyDecoratedDescriptor(_class2$6.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$6.prototype, "fieldSet"), _class2$6.prototype), _applyDecoratedDescriptor(_class2$6.prototype, "model", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$6.prototype, "model"), _class2$6.prototype)), _class2$6)) || _class$8) || _class$8;

var _class$9, _class2$7;

var CardFieldSet = mobxReact.observer(_class$9 = (_class2$7 =
/*#__PURE__*/
function (_Component) {
  _inherits(CardFieldSet, _Component);

  function CardFieldSet() {
    _classCallCheck(this, CardFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardFieldSet).apply(this, arguments));
  }

  _createClass(CardFieldSet, [{
    key: "render",
    value: function render() {
      var model = this.props.model,
          idx = this.props.idx || 0,
          legend = !isFieldSetSimple(this.fieldSet) && this.fieldSet.legend,
          fieldConfigs = getFieldSetFields(this.fieldSet),
          filteredFieldConfigs = fieldConfigs.filter(function (fieldConfig) {
        return !filterInsertIf(fieldConfig, model);
      });

      if (!filteredFieldConfigs.length) {
        return null;
      }

      return React__default.createElement(React.Fragment, {
        key: idx
      }, idx > 0 && React__default.createElement(Antd.Divider, {
        key: "divider-".concat(idx)
      }), legend && React__default.createElement("h3", null, legend), getFieldSetFields(this.fieldSet).map(function (fieldConfig) {
        return React__default.createElement(CardField, {
          fieldConfig: fieldConfig,
          key: fieldConfig.field,
          model: model
        });
      }));
    }
  }, {
    key: "fieldSet",
    get: function get() {
      return fillInFieldSet(this.props.fieldSet);
    }
  }]);

  return CardFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$7.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$7.prototype, "fieldSet"), _class2$7.prototype)), _class2$7)) || _class$9;

var _class$a, _class2$8;

var Card = mobxReact.observer(_class$a = (_class2$8 =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          isLoading = _this$props.isLoading,
          model = _this$props.model;
      return React__default.createElement(Antd.Card, {
        title: title,
        extra: renderTopRight && renderTopRight(),
        loading: isLoading
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement(CardFieldSet, {
          fieldSet: fieldSet,
          idx: idx,
          key: idx,
          model: model
        });
      }), this.props.children);
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return Card;
}(React.Component), (_applyDecoratedDescriptor(_class2$8.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$8.prototype, "fieldSets"), _class2$8.prototype)), _class2$8)) || _class$a;

var _class$b;

var ArrayCard = mobxReact.observer(_class$b =
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
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          isLoading = _this$props.isLoading,
          model = _this$props.model,
          fieldSets = _this$props.fieldSets,
          classNameSuffix = _this$props.classNameSuffix;

      if (lodash.isEmpty(model)) {
        return null;
      }

      return React__default.createElement(Antd.Card, {
        title: title,
        extra: renderTopRight && renderTopRight(),
        loading: isLoading
      }, model.map(function (modelItem) {
        return React__default.createElement(Card, {
          classNameSuffix: classNameSuffix,
          fieldSets: fieldSets,
          key: modelItem.id,
          model: modelItem,
          title: ""
        });
      }));
    }
  }]);

  return ArrayCard;
}(React.Component)) || _class$b;

function getFieldErrors(errors) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var messages = {};
  Object.keys(errors).forEach(function (fieldName) {
    var fieldKey = [prefix, fieldName].filter(function (s) {
      return !!s;
    }).join('-');
    var fieldErrors = errors[fieldName]; // If an array, use only the first element

    if (lodash.isArray(fieldErrors)) {
      fieldErrors = fieldErrors[0];
    } // If an object, recurse


    if (lodash.isPlainObject(fieldErrors)) {
      lodash.extend(messages, getFieldErrors(fieldErrors, fieldKey));
    } // If a simple string, you have your error
    else {
        messages[fieldKey] = fieldErrors;
      }
  });
  return messages;
}

function backendValidation(fieldNames, response) {
  var fieldErrors = getFieldErrors(response),
      foundOnForm = {},
      errorMessages = []; // Try to assign error fields to form fields, falling back on generic array

  Object.keys(fieldErrors).forEach(function (errorField) {
    var message = fieldErrors[errorField]; // Check for an exact match

    if (fieldNames.includes(errorField)) {
      foundOnForm[errorField] = message;
      return;
    } // Check just the last attribute of the error


    if (errorField.includes('-')) {
      var errorFieldSuffix = errorField.split('-').pop();

      if (errorFieldSuffix && fieldNames.includes(errorFieldSuffix)) {
        foundOnForm[errorFieldSuffix] = message;
        return;
      }
    } // Check for a more fuzzy match of the entire string


    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = fieldNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var fieldName = _step.value;
        var fieldNameFlat = fieldName.toLowerCase().replace(/[^a-z]/gi, ''),
            errorFieldFlat = errorField.toLowerCase().replace(/[^a-z]/gi, '');

        if (errorFieldFlat === fieldNameFlat) {
          foundOnForm[fieldName] = message;
          return;
        }
      } // With no form field found, add to generic array

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    errorMessages.push({
      field: utils.varToLabel(errorField),
      message: message
    });
  });
  return {
    errorMessages: errorMessages,
    foundOnForm: foundOnForm
  };
}

var _class$c, _class2$9, _descriptor$2, _temp$2;
var toastError = {
  description: '',
  duration: null,
  message: 'Error submitting form'
};

var FormManager = autoBindMethods(_class$c = (_class2$9 = (_temp$2 =
/*#__PURE__*/
function () {
  function FormManager(form, fieldSets, args) {
    _classCallCheck(this, FormManager);

    _initializerDefineProperty(this, "saving", _descriptor$2, this);

    this.args = void 0;
    this.args = _objectSpread({
      fieldSets: fieldSets,
      form: form,
      model: {},
      onSave: lodash.noop,
      onSuccess: lodash.noop
    }, lodash.pickBy(args, function (value) {
      return value !== undefined;
    }));
  }

  _createClass(FormManager, [{
    key: "onSuccess",
    value: function onSuccess() {
      var onSuccess = this.args.onSuccess;
      Antd.notification.success({
        description: '',
        duration: 3,
        message: 'Success'
      });
      onSuccess();
    }
  }, {
    key: "setErrorsOnFormFields",
    value: function setErrorsOnFormFields(errors) {
      var _this = this;

      var form = this.args.form;
      form.setFields(lodash.mapValues(errors, function (error, field) {
        return {
          errors: [new Error(error)],
          value: _this.formValues[field]
        };
      }));
    }
  }, {
    key: "notifyUserAboutErrors",
    value: function notifyUserAboutErrors(errors) {
      errors.forEach(function (_ref) {
        var field = _ref.field,
            message = _ref.message;
        var description = "".concat(field, " - ").concat(message);
        Antd.notification.error(_objectSpread({}, toastError, {
          description: description
        }));
      });
    }
  }, {
    key: "handleBackendResponse",
    value: function handleBackendResponse(response) {
      if (!response || !response.data) {
        Antd.notification.error(toastError);
        return;
      }

      var _backendValidation = backendValidation(this.formFieldNames, response.data),
          foundOnForm = _backendValidation.foundOnForm,
          errorMessages = _backendValidation.errorMessages;

      this.setErrorsOnFormFields(foundOnForm);
      this.notifyUserAboutErrors(errorMessages);
    }
  }, {
    key: "validateThenSaveCallback",
    value: function () {
      var _validateThenSaveCallback = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(errors, _values) {
        var onSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onSave = this.args.onSave;
                this.saving = true;

                if (!errors) {
                  _context.next = 5;
                  break;
                }

                this.saving = false;
                return _context.abrupt("return");

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return onSave(this.formModel);

              case 8:
                this.onSuccess();
                this.args.form.resetFields();
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                this.handleBackendResponse(_context.t0.response);

              case 15:
                _context.prev = 15;
                this.saving = false;
                return _context.finish(15);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 12, 15, 18]]);
      }));

      function validateThenSaveCallback(_x, _x2) {
        return _validateThenSaveCallback.apply(this, arguments);
      }

      return validateThenSaveCallback;
    }()
  }, {
    key: "onSave",
    value: function () {
      var _onSave = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(event) {
        var form;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                form = this.args.form;
                event.preventDefault();
                this.saving = true;
                form.validateFields(this.validateThenSaveCallback);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSave(_x3) {
        return _onSave.apply(this, arguments);
      }

      return onSave;
    }()
  }, {
    key: "formModel",
    get: function get() {
      var _this$args = this.args,
          form = _this$args.form,
          fieldSets = _this$args.fieldSets,
          model = form.getFieldsValue();
      fieldSets.forEach(function (fieldSet) {
        getFieldSetFields(fieldSet).forEach(function (fieldConfig) {
          var formValue = lodash.get(model, fieldConfig.field),
              value = fieldConfig.fromForm(formValue);

          if (!value && fieldConfig.nullify) {
            lodash.set(model, fieldConfig.field, null);
          } else {
            lodash.set(model, fieldConfig.field, value);
          }
        });
      });

      if (this.args.model && this.args.model.id) {
        model.id = this.args.model.id;
      }

      return model;
    }
  }, {
    key: "formValues",
    get: function get() {
      return this.args.form.getFieldsValue();
    }
  }, {
    key: "formFieldNames",
    get: function get() {
      return Object.keys(flatten(this.formValues));
    }
  }]);

  return FormManager;
}(), _temp$2), (_descriptor$2 = _applyDecoratedDescriptor(_class2$9.prototype, "saving", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2$9)) || _class$c;

var _class$d, _class2$a, _class3, _temp$3, _class4;
var UnwrappedFormCard = autoBindMethods(_class$d = mobxReact.observer(_class$d = (_class2$a = (_temp$3 = _class3 =
/*#__PURE__*/
function (_Component) {
  _inherits(UnwrappedFormCard, _Component);

  function UnwrappedFormCard(props) {
    var _this;

    _classCallCheck(this, UnwrappedFormCard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnwrappedFormCard).call(this, props));
    _this.formManager = void 0;
    var _ref = props,
        model = _ref.model,
        onSave = _ref.onSave,
        onCancel = _ref.onCancel,
        form = _ref.form;
    _this.formManager = new FormManager(form, _this.fieldSets, {
      model: model,
      onSave: onSave,
      onSuccess: onCancel
    });
    return _this;
  }

  _createClass(UnwrappedFormCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          title = _this$props.title,
          onCancel = _this$props.onCancel,
          defaults = _this$props.defaults,
          model = _this$props.model,
          form = _this$props.form,
          renderTopRight = _this$props.renderTopRight;
      return React__default.createElement(Antd.Card, {
        loading: isLoading,
        title: title,
        extra: renderTopRight && renderTopRight()
      }, React__default.createElement(Antd.Form, {
        onSubmit: this.formManager.onSave,
        className: "notes-form"
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement(React.Fragment, {
          key: idx
        }, idx > 0 && React__default.createElement(Antd.Divider, {
          key: "divider-".concat(idx)
        }), React__default.createElement("div", null, React__default.createElement(FormFieldSet, {
          defaults: defaults,
          fieldSet: fieldSet,
          form: form,
          formManager: _this2.formManager,
          model: model
        })));
      }), this.props.children, React__default.createElement("div", {
        className: "button-toolbar"
      }, React__default.createElement(Antd.Button, {
        htmlType: "submit",
        loading: this.formManager.saving,
        size: "large",
        type: "primary"
      }, "Save"), React__default.createElement(Antd.Button, {
        disabled: this.formManager.saving,
        onClick: onCancel,
        size: "large"
      }, "Cancel"))));
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return UnwrappedFormCard;
}(React.Component), _class3.defaultProps = {
  onCancel: lodash.noop
}, _temp$3), (_applyDecoratedDescriptor(_class2$a.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$a.prototype, "fieldSets"), _class2$a.prototype)), _class2$a)) || _class$d) || _class$d;
var WrappedFormCard = Antd.Form.create()(UnwrappedFormCard);
var FormCard = autoBindMethods(_class4 = mobxReact.observer(_class4 =
/*#__PURE__*/
function (_Component2) {
  _inherits(FormCard, _Component2);

  function FormCard() {
    _classCallCheck(this, FormCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormCard).apply(this, arguments));
  }

  _createClass(FormCard, [{
    key: "render",
    value: function render() {
      return React__default.createElement(WrappedFormCard, this.props);
    }
  }]);

  return FormCard;
}(React.Component)) || _class4) || _class4;

var _class$e, _class2$b, _descriptor$3, _descriptor2$2, _class3$1, _temp$4;

var EditableCard = autoBindMethods(_class$e = mobxReact.observer(_class$e = (_class2$b = (_temp$4 = _class3$1 =
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

    _initializerDefineProperty(_this, "isDeleting", _descriptor$3, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "isEditing", _descriptor2$2, _assertThisInitialized(_assertThisInitialized(_this)));

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
                _this$propsWithDefaul = this.propsWithDefaults, model = _this$propsWithDefaul.model, onDelete = _this$propsWithDefaul.onDelete, onSuccess = _this$propsWithDefaul.onSuccess; // istanbul ignore next

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
      return React__default.createElement(ButtonToolbar, null, this.deleteButton, this.editButton);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isEditing.isTrue) {
        return React__default.createElement(FormCard, _extends({}, this.props, {
          onCancel: this.isEditing.setFalse,
          onSave: this.handleSave,
          renderTopRight: this.buttons
        }));
      }

      return React__default.createElement(Card, _extends({}, this.props, {
        renderTopRight: this.buttons
      }));
    }
  }, {
    key: "propsWithDefaults",
    get: function get() {
      return this.props;
    }
  }, {
    key: "deleteButton",
    get: function get() {
      var _this$propsWithDefaul3 = this.propsWithDefaults,
          isGuarded = _this$propsWithDefaul3.isGuarded,
          title = _this$propsWithDefaul3.title,
          onDelete = _this$propsWithDefaul3.onDelete,
          isLoading = _this$propsWithDefaul3.isLoading,
          classNameSuffix = this.propsWithDefaults.classNameSuffix || lodash.kebabCase(title);

      if (!onDelete) {
        return;
      }

      return React__default.createElement(GuardedButton, {
        className: "btn-delete btn-delete-".concat(classNameSuffix),
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
    get: function get() {
      var _this$propsWithDefaul4 = this.propsWithDefaults,
          isLoading = _this$propsWithDefaul4.isLoading,
          title = _this$propsWithDefaul4.title,
          isGuarded = _this$propsWithDefaul4.isGuarded,
          classNameSuffix = this.propsWithDefaults.classNameSuffix || lodash.kebabCase(title);
      return React__default.createElement(GuardedButton, {
        className: "btn-edit btn-edit-".concat(classNameSuffix),
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
}(React.Component), _class3$1.defaultProps = {
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
}, _temp$4), (_descriptor$3 = _applyDecoratedDescriptor(_class2$b.prototype, "isDeleting", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class2$b.prototype, "isEditing", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$b)) || _class$e) || _class$e;

var _class$f, _class2$c, _descriptor$4, _temp$5;

var EditableArrayCard = autoBindMethods(_class$f = mobxReact.observer(_class$f = (_class2$c = (_temp$5 =
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

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$4, _assertThisInitialized(_assertThisInitialized(_this)));

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
          title = _this$props2.title,
          isLoading = _this$props2.isLoading,
          isGuarded = _this$props2.isGuarded,
          classNameSuffix = this.props.classNameSuffix || lodash.kebabCase(title);
      return React__default.createElement(GuardedButton, {
        className: "btn-new btn-new-".concat(classNameSuffix),
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
          defaults = _this$props3.defaults,
          fieldSets = _this$props3.fieldSets,
          isLoading = _this$props3.isLoading,
          model = _this$props3.model,
          onDelete = _this$props3.onDelete,
          onSave = _this$props3.onSave,
          onSuccess = _this$props3.onSuccess,
          title = _this$props3.title;
      return React__default.createElement(Antd.Card, {
        title: title,
        extra: this.renderAddNew(),
        loading: isLoading
      }, this.isAddingNew.isTrue && React__default.createElement(FormCard, {
        defaults: defaults,
        fieldSets: fieldSets,
        onCancel: this.isAddingNew.setFalse,
        onSave: this.handleSaveNew,
        title: "New ".concat(title)
      }), lodash.isEmpty(model) && !this.isAddingNew.isTrue && React__default.createElement("p", {
        className: "empty-message"
      }, "No records"), model.map(function (modelItem) {
        return React__default.createElement(EditableCard, {
          classNameSuffix: lodash.kebabCase(title),
          fieldSets: fieldSets,
          key: modelItem.id,
          model: modelItem,
          onDelete: onDelete,
          onSave: onSave,
          onSuccess: onSuccess,
          title: ""
        });
      }));
    }
  }]);

  return EditableArrayCard;
}(React.Component), _temp$5), (_descriptor$4 = _applyDecoratedDescriptor(_class2$c.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$c)) || _class$f) || _class$f;

var _class$g, _class2$d, _temp$6;

var BaseFormDrawer = autoBindMethods(_class$g = mobxReact.observer(_class$g = (_class2$d = (_temp$6 =
/*#__PURE__*/
function (_Component) {
  _inherits(BaseFormDrawer, _Component);

  _createClass(BaseFormDrawer, [{
    key: "fieldSets",
    get: function get() {
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
      var _this2 = this;

      var _this$props = this.props,
          form = _this$props.form,
          isVisible = _this$props.isVisible,
          model = _this$props.model,
          title = _this$props.title,
          width = _this$props.width,
          defaults = _this$props.defaults;
      return React__default.createElement(Antd.Drawer, {
        className: "mfa-form-drawer",
        closable: true,
        destroyOnClose: true,
        maskClosable: false,
        onClose: isVisible.setFalse,
        placement: "right",
        title: title,
        visible: isVisible.isTrue,
        width: width
      }, React__default.createElement(Antd.Form, {
        layout: "vertical",
        onSubmit: this.formManager.onSave
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement("div", {
          key: idx
        }, React__default.createElement(FormFieldSet, {
          defaults: defaults,
          fieldSet: fieldSet,
          form: form,
          formManager: _this2.formManager,
          model: model
        }));
      }), React__default.createElement(Antd.Divider, null), React__default.createElement(ButtonToolbar, {
        align: "right"
      }, React__default.createElement(Antd.Button, {
        disabled: this.formManager.saving,
        onClick: isVisible.setFalse,
        size: "large"
      }, "Cancel"), React__default.createElement(Antd.Button, {
        loading: this.formManager.saving,
        type: "primary",
        htmlType: "submit",
        size: "large"
      }, "Submit"))));
    }
  }]);

  return BaseFormDrawer;
}(React.Component), _temp$6), (_applyDecoratedDescriptor(_class2$d.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$d.prototype, "fieldSets"), _class2$d.prototype)), _class2$d)) || _class$g) || _class$g;

var FormDrawer$$1 = Antd.Form.create()(BaseFormDrawer);

var _class$h, _class2$e, _class3$2, _temp$7;

var FormModal = autoBindMethods(_class$h = mobxReact.observer(_class$h = (_class2$e = (_temp$7 = _class3$2 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormModal, _Component);

  _createClass(FormModal, [{
    key: "propsWithDefaults",
    get: function get() {
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
        onCancel = props.onCancel;
    _this.formManager = new FormManager(props.form, _this.fieldSets, {
      model: model,
      onSave: onSave,
      onSuccess: onCancel
    });
    return _this;
  }

  _createClass(FormModal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          onCancel = _this$props.onCancel,
          defaults = _this$props.defaults,
          model = _this$props.model,
          form = _this$props.form,
          saveText = this.propsWithDefaults.saveText;
      return React__default.createElement(Antd.Modal, {
        confirmLoading: this.formManager.saving,
        okText: this.formManager.saving ? 'Saving...' : saveText,
        onCancel: onCancel,
        onOk: this.formManager.onSave,
        title: title,
        visible: true
      }, React__default.createElement(Antd.Form, {
        onSubmit: this.formManager.onSave,
        className: "notes-form"
      }, this.props.childrenBefore, this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement("div", {
          key: idx
        }, React__default.createElement(FormFieldSet, {
          defaults: defaults,
          fieldSet: fieldSet,
          form: form,
          formManager: _this2.formManager,
          model: model
        }));
      }), this.props.children));
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return FormModal;
}(React.Component), _class3$2.defaultProps = {
  saveText: 'Save'
}, _temp$7), (_applyDecoratedDescriptor(_class2$e.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$e.prototype, "fieldSets"), _class2$e.prototype)), _class2$e)) || _class$h) || _class$h;

var WrappedFormModal = Antd.Form.create()(FormModal);

var _class$i, _class2$f, _class3$3, _temp$8;

var SummaryCard = autoBindMethods(_class$i = mobxReact.observer(_class$i = (_class2$f = (_temp$8 = _class3$3 =
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
      var value = fieldConfig.value || lodash.result(model, fieldConfig.field),
          className = "summary-".concat(lodash.kebabCase(fieldConfig.field));
      return React__default.createElement(Antd.List.Item, {
        key: fieldConfig.field,
        className: className,
        extra: null
      }, React__default.createElement("h4", null, fieldConfig.label), React__default.createElement("p", null, fieldConfig.render(value, fieldConfig)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          title = _this$props.title,
          column = _this$props.column,
          isLoading = _this$props.isLoading,
          renderTopRight = _this$props.renderTopRight,
          className = _this$props.className;
      return React__default.createElement(Antd.Card, {
        className: cx('summary-card', className),
        extra: renderTopRight && renderTopRight(),
        loading: isLoading,
        title: title
      }, this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement(Antd.List, {
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
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return SummaryCard;
}(React.Component), _class3$3.defaultProps = {
  column: 4
}, _temp$8), (_applyDecoratedDescriptor(_class2$f.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$f.prototype, "fieldSets"), _class2$f.prototype)), _class2$f)) || _class$i) || _class$i;

// Lower-level building blocks and helper components

exports.ButtonToolbar = ButtonToolbar;
exports.CardField = CardField;
exports.FormField = FormField;
exports.FormFieldSet = FormFieldSet;
exports.GuardedButton = GuardedButton;
exports.Info = Info;
exports.Label = Label;
exports.Value = Value;
exports.CARD_COL_LABEL = CARD_COL_LABEL;
exports.CARD_COL_VALUE = CARD_COL_VALUE;
exports.NestedFieldSet = NestedFieldSet$$1;
exports.ArrayCard = ArrayCard;
exports.Card = Card;
exports.EditableArrayCard = EditableArrayCard;
exports.EditableCard = EditableCard;
exports.FormCard = FormCard;
exports.FormDrawer = FormDrawer$$1;
exports.FormModal = WrappedFormModal;
exports.SummaryCard = SummaryCard;
exports.ObjectSearchCreate = ObjectSearchCreate$$1;
exports.OptionSelect = OptionSelect$$1;
exports.OptionSelectDisplay = OptionSelectDisplay$$1;
exports.formatOptionSelect = formatOptionSelect$$1;
exports.RadioGroup = RadioGroup$$1;
exports.Rate = Rate;
exports.formatRating = formatRating;
exports.FormManager = FormManager;
exports.isPartialFieldSetSimple = isPartialFieldSetSimple;
exports.isFieldSetSimple = isFieldSetSimple;
exports.filterInsertIf = filterInsertIf;
exports.fillInFieldConfig = fillInFieldConfig;
exports.fillInFieldSet = fillInFieldSet;
exports.fillInFieldSets = fillInFieldSets;
exports.getFieldSetFields = getFieldSetFields;
exports.getUnsortedOptions = getUnsortedOptions;
exports.getOptions = getOptions;
