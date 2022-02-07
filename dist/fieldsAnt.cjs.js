'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var mobxReact = require('mobx-react');
var autoBindMethods = _interopDefault(require('class-autobind-decorator'));
var cx = _interopDefault(require('classnames'));
var antd = require('antd');
var mobx = require('mobx');
var lodash = require('lodash');
var SmartBool = _interopDefault(require('@mighty-justice/smart-bool'));
var utils = require('@mighty-justice/utils');
var moment = require('moment');
var moment__default = _interopDefault(moment);
var dateFns = require('date-fns');
var iso8601Duration = require('iso8601-duration');
var flattenObject = _interopDefault(require('flat'));
var httpStatus = _interopDefault(require('http-status-codes'));

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  Object.keys(descriptor).forEach(function (key) {
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
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var DEFAULT_DEBOUNCE_WAIT = 300;
var REGEXP_SSN = /^[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}$/;
var REGEXP_EIN = /^\d{2}[-\s]?\d{7}$/;
var ID_ATTR = 'id';
var DEFAULT_STATE_OPTION_TYPE = 'us_states';
var CLASS_PREFIX = 'fields-ant';
var ANT_FULL_COL_WIDTH = 24;
var TOAST_DURATION = 10;
var LAYOUT_TYPES = {
  HORIZONTAL: 'horizontal',
  INLINE: 'inline',
  VERTICAL: 'vertical'
};

var _class;
var CLASS_NAME = "".concat(CLASS_PREFIX, "-button-toolbar");

var ButtonToolbar = autoBindMethods(_class = mobxReact.observer(_class = /*#__PURE__*/function (_Component) {
  _inherits(ButtonToolbar, _Component);

  function ButtonToolbar() {
    _classCallCheck(this, ButtonToolbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonToolbar).apply(this, arguments));
  }

  _createClass(ButtonToolbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          noSpacing = _this$props.noSpacing,
          align = _this$props.align,
          fixed = _this$props.fixed,
          passDownProps = _objectWithoutProperties(_this$props, ["noSpacing", "align", "fixed"]),
          className = cx(align && "".concat(CLASS_NAME, "-align-").concat(align), CLASS_NAME, this.props.className, _defineProperty({}, "".concat(CLASS_NAME, "-no-spacing"), noSpacing), _defineProperty({}, "".concat(CLASS_NAME, "-position-fixed"), fixed));

      return /*#__PURE__*/React__default.createElement(antd.Form.Item, _extends({}, passDownProps, {
        className: className
      }), this.props.children);
    }
  }]);

  return ButtonToolbar;
}(React.Component)) || _class) || _class;

// istanbul ignore next
function asyncNoop() {
  return _asyncNoop.apply(this, arguments);
}

function _asyncNoop() {
  _asyncNoop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return");

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _asyncNoop.apply(this, arguments);
}

var formPropsDefaults = {
  cancelText: 'Cancel',
  onSave: asyncNoop,
  saveText: 'Save'
};
var cardPropsDefaults = {
  bordered: true
};
var sharedComponentPropsDefaults = {
  layout: 'vertical',
  colon: false
};

var _class$1, _class2, _temp;
var FORM_ITEM_CLASS_NAME = "".concat(CLASS_PREFIX, "-form-item");

var FormItem = autoBindMethods(_class$1 = mobxReact.observer(_class$1 = (_temp = _class2 = /*#__PURE__*/function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem() {
    _classCallCheck(this, FormItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormItem).apply(this, arguments));
  }

  _createClass(FormItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fieldConfig = _this$props.fieldConfig,
          layout = _this$props.layout,
          colon = _this$props.colon,
          colProps = fieldConfig.colProps,
          formItemProps = fieldConfig.formItemProps,
          className = cx(FORM_ITEM_CLASS_NAME, fieldConfig.className, formItemProps && formItemProps.className, formatClassNames(FORM_ITEM_CLASS_NAME, colon, layout));
      return /*#__PURE__*/React__default.createElement(antd.Col, colProps, /*#__PURE__*/React__default.createElement(antd.Form.Item, _extends({}, this.formItemProps, formItemProps, {
        className: className,
        label: renderLabel(fieldConfig)
      }), this.props.children));
    }
  }, {
    key: "initialValue",
    get: function get() {
      var _this$props2 = this.props,
          formManager = _this$props2.formManager,
          fieldConfig = _this$props2.fieldConfig;
      return formManager.getDefaultValue(fieldConfig);
    }
  }, {
    key: "rules",
    get: function get() {
      var fieldConfig = this.props.fieldConfig; // Here we take the { [key: string]: formValidationRules } object
      // found in fieldConfig.formValidationRules and return a valid list
      // of rules for rc-form

      return [].concat(_toConsumableArray(Object.values(fieldConfig.formValidationRules)), [// Empty validator to ensure backend errors are cleared when field is edited
      {
        validator: noopValidator
      }]);
    }
  }, {
    key: "formItemProps",
    get: function get() {
      var _this$props3 = this.props,
          fieldConfig = _this$props3.fieldConfig,
          formModel = _this$props3.formModel,
          field = fieldConfig.field,
          name = fieldConfig.name,
          formItemRenderExtra = fieldConfig.formItemRenderExtra,
          extraValue = lodash.get(formModel, field),
          props = {
        initialValue: this.initialValue,
        name: name,
        preserve: false,
        rules: this.rules
      };

      if (extraValue && formItemRenderExtra) {
        return _objectSpread2({}, props, {
          extra: formItemRenderExtra(extraValue)
        });
      }

      return props;
    }
  }]);

  return FormItem;
}(React.Component), _class2.defaultProps = sharedComponentPropsDefaults, _temp)) || _class$1) || _class$1;

var _class$2;
function isTypeAddress(fieldConfig) {
  return fieldConfig.type === 'address';
}
var CLASS_NAME$1 = "".concat(FORM_ITEM_CLASS_NAME, "-input-address");

var Address = autoBindMethods(_class$2 = mobxReact.observer(_class$2 = /*#__PURE__*/function (_Component) {
  _inherits(Address, _Component);

  function Address() {
    _classCallCheck(this, Address);

    return _possibleConstructorReturn(this, _getPrototypeOf(Address).apply(this, arguments));
  }

  _createClass(Address, [{
    key: "render",
    value: function render() {
      var _this$injected = this.injected,
          fieldConfig = _this$injected.fieldConfig,
          formManager = _this$injected.formManager,
          formModel = _this$injected.formModel,
          colProps = fieldConfig.colProps,
          formItemProps = fieldConfig.formItemProps,
          className = cx(FORM_ITEM_CLASS_NAME, CLASS_NAME$1, fieldConfig.className, formItemProps && formItemProps.className);
      return /*#__PURE__*/React__default.createElement(antd.Col, colProps, /*#__PURE__*/React__default.createElement(antd.Form.Item, {
        className: className
      }, /*#__PURE__*/React__default.createElement(NestedFieldSet, {
        fieldSet: this.fieldSet,
        formManager: formManager,
        formModel: formModel,
        id: fieldConfig.field,
        label: renderLabel(fieldConfig)
      })));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "fieldSet",
    get: function get() {
      var _this$injected$fieldC = this.injected.fieldConfig,
          colProps = _this$injected$fieldC.colProps,
          required = _this$injected$fieldC.required,
          stateProps = _this$injected$fieldC.stateProps,
          disabled = _this$injected$fieldC.disabled,
          defaultStateProps = {
        optionType: DEFAULT_STATE_OPTION_TYPE
      },
          passedStateProps = _objectSpread2({}, defaultStateProps, {}, stateProps);

      var fieldSet = [{
        field: 'address1',
        label: 'Address 1',
        type: 'string',
        required: required
      }, {
        field: 'address2',
        label: 'Address 2',
        type: 'string'
      }, {
        field: 'city',
        required: required
      }, _objectSpread2({
        field: 'state',
        required: required,
        showSearch: true,
        type: 'optionSelect'
      }, passedStateProps), {
        field: 'zip_code',
        required: required
      }].map(function (fieldConfig) {
        return _objectSpread2({}, fieldConfig, {
          disabled: disabled
        });
      });
      return fieldSet.map(function (addressConfig) {
        return _objectSpread2({}, addressConfig, {
          colProps: colProps
        });
      });
    }
  }]);

  return Address;
}(React.Component)) || _class$2) || _class$2;

var IconContext = /*#__PURE__*/React.createContext({});

function _defineProperty$1(obj, key, value) {
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

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return Number(n) * 100 + "%";
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var hueStep = 2; // 色相阶梯

var saturationStep = 0.16; // 饱和度阶梯，浅色部分

var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

var lightColorCount = 5; // 浅色数量，主色上

var darkColorCount = 4; // 深色数量，主色下
// 暗色主题颜色映射关系表

var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}]; // Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`

function toHsv(_ref) {
  var r = _ref.r,
      g = _ref.g,
      b = _ref.b;
  var hsv = rgbToHsv(r, g, b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
} // Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`


function toHex(_ref2) {
  var r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;
  return "#".concat(rgbToHex(r, g, b, false));
} // Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.


function mix(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}

function getHue(hsv, i, light) {
  var hue; // 根据色相不同，色相转向不同

  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

function getSaturation(hsv, i, light) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  var saturation;

  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  } // 边界值修正


  if (saturation > 1) {
    saturation = 1;
  } // 第一格的 s 限制在 0.06-0.1 之间


  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  if (saturation < 0.06) {
    saturation = 0.06;
  }

  return Number(saturation.toFixed(2));
}

function getValue(hsv, i, light) {
  var value;

  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 1) {
    value = 1;
  }

  return Number(value.toFixed(2));
}

function generate(color) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var patterns = [];
  var pColor = inputToRGB(color);

  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex(inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    }));
    patterns.push(colorString);
  }

  patterns.push(toHex(pColor));

  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);

    var _colorString = toHex(inputToRGB({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue(_hsv, _i)
    }));

    patterns.push(_colorString);
  } // dark theme patterns


  if (opts.theme === 'dark') {
    return darkColorMap.map(function (_ref3) {
      var index = _ref3.index,
          opacity = _ref3.opacity;
      var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || '#141414'), inputToRGB(patterns[index]), opacity * 100));
      return darkColorString;
    });
  }

  return patterns;
}

var presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1890FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function (key) {
  presetPalettes[key] = generate(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

  presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414'
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});

/* eslint-disable no-console */
var warned = {};
function warning(valid, message) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    console.error("Warning: ".concat(message));
  }
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
/* eslint-enable */

function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

var MARK_KEY = "rc-util-key";

function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }

  var head = document.querySelector('head');
  return head || document.body;
}

function injectCSS(css) {
  var _option$csp;

  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!canUseDom()) {
    return null;
  }

  var styleNode = document.createElement('style');

  if ((_option$csp = option.csp) === null || _option$csp === void 0 ? void 0 : _option$csp.nonce) {
    var _option$csp2;

    styleNode.nonce = (_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce;
  }

  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;

  if (option.prepend && container.prepend) {
    // Use `prepend` first
    container.prepend(styleNode);
  } else if (option.prepend && firstChild) {
    // Fallback to `insertBefore` like IE not support `prepend`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }

  return styleNode;
}
var containerCache = new Map();
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var container = getContainer(option); // Get real parent

  if (!containerCache.has(container)) {
    var placeholderStyle = injectCSS('', option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }

  var existNode = Array.from(containerCache.get(container).children).find(function (node) {
    return node.tagName === 'STYLE' && node[MARK_KEY] === key;
  });

  if (existNode) {
    var _option$csp3, _option$csp4;

    if (((_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce) && existNode.nonce !== ((_option$csp4 = option.csp) === null || _option$csp4 === void 0 ? void 0 : _option$csp4.nonce)) {
      var _option$csp5;

      existNode.nonce = (_option$csp5 = option.csp) === null || _option$csp5 === void 0 ? void 0 : _option$csp5.nonce;
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  var newNode = injectCSS(css, option);
  newNode[MARK_KEY] = key;
  return newNode;
}

function warning$1(valid, message) {
  warningOnce(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return _typeof(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (_typeof(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];

    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;

      default:
        acc[key] = val;
    }

    return acc;
  }, {});
}
function generate$1(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/React__default.createElement(node.tag, _objectSpread2$1({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate$1(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }

  return /*#__PURE__*/React__default.createElement(node.tag, _objectSpread2$1(_objectSpread2$1({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate$1(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
} // These props make sure that the SVG behaviours like general text.
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles() {
  var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;

  var _useContext = React.useContext(IconContext),
      csp = _useContext.csp;

  React.useEffect(function () {
    updateCSS(styleStr, '@ant-design-icons', {
      prepend: true,
      csp: csp
    });
  }, []);
};

var _excluded = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};

function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
      secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}

function getTwoToneColors() {
  return _objectSpread2$1({}, twoToneColorPalette);
}

var IconBase = function IconBase(props) {
  var icon = props.icon,
      className = props.className,
      onClick = props.onClick,
      style = props.style,
      primaryColor = props.primaryColor,
      secondaryColor = props.secondaryColor,
      restProps = _objectWithoutProperties$1(props, _excluded);

  var colors = twoToneColorPalette;

  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }

  useInsertStyles();
  warning$1(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

  if (!isIconDefinition(icon)) {
    return null;
  }

  var target = icon;

  if (target && typeof target.icon === 'function') {
    target = _objectSpread2$1(_objectSpread2$1({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }

  return generate$1(target.icon, "svg-".concat(target.name), _objectSpread2$1({
    className: className,
    onClick: onClick,
    style: style,
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  }, restProps));
};

IconBase.displayName = 'IconReact';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;

function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return IconBase.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = IconBase.getTwoToneColors();

  if (!colors.calculated) {
    return colors.primaryColor;
  }

  return [colors.primaryColor, colors.secondaryColor];
}

var _excluded$1 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
// should move it to antd main repo?

setTwoToneColor('#1890ff');
var Icon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _classNames;

  var className = props.className,
      icon = props.icon,
      spin = props.spin,
      rotate = props.rotate,
      tabIndex = props.tabIndex,
      onClick = props.onClick,
      twoToneColor = props.twoToneColor,
      restProps = _objectWithoutProperties$1(props, _excluded$1);

  var _React$useContext = React.useContext(IconContext),
      _React$useContext$pre = _React$useContext.prefixCls,
      prefixCls = _React$useContext$pre === void 0 ? 'anticon' : _React$useContext$pre;

  var classString = cx(prefixCls, (_classNames = {}, _defineProperty$1(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty$1(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === 'loading'), _classNames), className);
  var iconTabIndex = tabIndex;

  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;

  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return /*#__PURE__*/React.createElement("span", _objectSpread2$1(_objectSpread2$1({
    role: "img",
    "aria-label": icon.name
  }, restProps), {}, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), /*#__PURE__*/React.createElement(IconBase, {
    icon: icon,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

// This icon file is generated automatically.
var DeleteOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" } }] }, "name": "delete", "theme": "outlined" };

var DeleteOutlined$1 = function DeleteOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: DeleteOutlined
  }));
};

DeleteOutlined$1.displayName = 'DeleteOutlined';
var DeleteOutlined$2 = /*#__PURE__*/React.forwardRef(DeleteOutlined$1);

// This icon file is generated automatically.
var EditOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" } }] }, "name": "edit", "theme": "outlined" };

var EditOutlined$1 = function EditOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: EditOutlined
  }));
};

EditOutlined$1.displayName = 'EditOutlined';
var EditOutlined$2 = /*#__PURE__*/React.forwardRef(EditOutlined$1);

// This icon file is generated automatically.
var LeftOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };

var LeftOutlined$1 = function LeftOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: LeftOutlined
  }));
};

LeftOutlined$1.displayName = 'LeftOutlined';
var LeftOutlined$2 = /*#__PURE__*/React.forwardRef(LeftOutlined$1);

// This icon file is generated automatically.
var LoadingOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };

var LoadingOutlined$1 = function LoadingOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: LoadingOutlined
  }));
};

LoadingOutlined$1.displayName = 'LoadingOutlined';
var LoadingOutlined$2 = /*#__PURE__*/React.forwardRef(LoadingOutlined$1);

// This icon file is generated automatically.
var PlusOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "defs", "attrs": {}, "children": [{ "tag": "style", "attrs": {} }] }, { "tag": "path", "attrs": { "d": "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } }, { "tag": "path", "attrs": { "d": "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" } }] }, "name": "plus", "theme": "outlined" };

var PlusOutlined$1 = function PlusOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: PlusOutlined
  }));
};

PlusOutlined$1.displayName = 'PlusOutlined';
var PlusOutlined$2 = /*#__PURE__*/React.forwardRef(PlusOutlined$1);

// This icon file is generated automatically.
var QuestionCircleOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" } }] }, "name": "question-circle", "theme": "outlined" };

var QuestionCircleOutlined$1 = function QuestionCircleOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: QuestionCircleOutlined
  }));
};

QuestionCircleOutlined$1.displayName = 'QuestionCircleOutlined';
var QuestionCircleOutlined$2 = /*#__PURE__*/React.forwardRef(QuestionCircleOutlined$1);

// This icon file is generated automatically.
var SearchOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, "name": "search", "theme": "outlined" };

var SearchOutlined$1 = function SearchOutlined$1(props, ref) {
  return /*#__PURE__*/React.createElement(Icon, _objectSpread2$1(_objectSpread2$1({}, props), {}, {
    ref: ref,
    icon: SearchOutlined
  }));
};

SearchOutlined$1.displayName = 'SearchOutlined';
var SearchOutlined$2 = /*#__PURE__*/React.forwardRef(SearchOutlined$1);

var _dec, _class$3, _class2$1, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp$1;
var CLASS_NAME$2 = "".concat(CLASS_PREFIX, "-input-object-search");
var OPTION_KEYS = {
  ADD: "".concat(CLASS_NAME$2, "-add"),
  EMPTY: "".concat(CLASS_NAME$2, "-empty"),
  NO_SEARCH: "".concat(CLASS_NAME$2, "-no-search"),
  OPTION: "".concat(CLASS_NAME$2, "-option")
};
var ObjectSearch = (_dec = mobxReact.inject('getEndpoint'), _dec(_class$3 = autoBindMethods(_class$3 = mobxReact.observer(_class$3 = (_class2$1 = (_temp$1 = _class3 = /*#__PURE__*/function (_Component) {
  _inherits(ObjectSearch, _Component);

  function ObjectSearch(props) {
    var _this;

    _classCallCheck(this, ObjectSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObjectSearch).call(this, props));

    _initializerDefineProperty(_this, "options", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isLoading", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "search", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "previousEndpoint", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "previousSearchFilters", _descriptor5, _assertThisInitialized(_this));

    _this.debouncedHandleSearch = void 0;
    _this.debouncedHandleSearch = lodash.debounce(_this.handleSearch, props.debounceWait);

    _this.updateValueCaches();

    return _this;
  }

  _createClass(ObjectSearch, [{
    key: "updateValueCaches",
    value: function updateValueCaches() {
      this.previousEndpoint = this.fieldConfig.endpoint;
      this.previousSearchFilters = utils.toKey(this.fieldConfig.searchFilters || {});
    }
  }, {
    key: "handleSearch",
    value: function () {
      var _handleSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        var _this$injected, getEndpoint, searchOnEmpty, _this$fieldConfig, endpoint, searchFilters, params, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$injected = this.injected, getEndpoint = _this$injected.getEndpoint, searchOnEmpty = _this$injected.searchOnEmpty, _this$fieldConfig = this.fieldConfig, endpoint = _this$fieldConfig.endpoint, searchFilters = _this$fieldConfig.searchFilters, params = _objectSpread2({
                  search: value
                }, searchFilters);
                this.search = value;

                if (!(!searchOnEmpty && !this.hasSearch)) {
                  _context.next = 5;
                  break;
                }

                this.options = [];
                return _context.abrupt("return");

              case 5:
                this.isLoading.setTrue();
                this.updateValueCaches();
                _context.prev = 7;
                _context.next = 10;
                return getEndpoint("".concat(endpoint).concat(utils.toKey(params)));

              case 10:
                response = _context.sent;
                this.options = lodash.get(response, 'results', []); // istanbul ignore next

                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                // tslint:disable no-console
                // istanbul ignore next
                console.error(_context.t0); // tslint:enable no-console

              case 17:
                _context.prev = 17;
                this.isLoading.setFalse();
                return _context.finish(17);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 14, 17, 20]]);
      }));

      function handleSearch(_x) {
        return _handleSearch.apply(this, arguments);
      }

      return handleSearch;
    }()
  }, {
    key: "renderAddOption",
    value: function renderAddOption() {
      var addNewContent = this.props.addNewContent;
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        className: OPTION_KEYS.ADD,
        key: OPTION_KEYS.ADD,
        value: OPTION_KEYS.ADD
      }, /*#__PURE__*/React__default.createElement("div", null, addNewContent || /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusOutlined$2, null), " ", /*#__PURE__*/React__default.createElement("b", null, this.search))));
    }
  }, {
    key: "renderNoResultsOption",
    value: function renderNoResultsOption() {
      var selectProps = this.props.selectProps;
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        className: OPTION_KEYS.EMPTY,
        disabled: true,
        key: OPTION_KEYS.EMPTY,
        value: OPTION_KEYS.EMPTY
      }, /*#__PURE__*/React__default.createElement("div", null, lodash.get(selectProps, 'notFoundContent') || 'No results'));
    }
  }, {
    key: "renderNoSearchOption",
    value: function renderNoSearchOption() {
      var noSearchContent = this.props.noSearchContent;
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        className: OPTION_KEYS.NO_SEARCH,
        disabled: true,
        key: OPTION_KEYS.NO_SEARCH,
        value: OPTION_KEYS.NO_SEARCH
      }, this.isLoading.isTrue ? /*#__PURE__*/React__default.createElement("div", null, this.loadingIcon, " Loading...") : /*#__PURE__*/React__default.createElement("div", null, noSearchContent || 'Type to search or filter'));
    }
  }, {
    key: "renderOption",
    value: function renderOption(option) {
      var _this$fieldConfig2 = this.fieldConfig,
          renderOption = _this$fieldConfig2.renderOption,
          renderSelected = _this$fieldConfig2.renderSelected,
          isOptionDisabled = this.props.isOptionDisabled;
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        className: OPTION_KEYS.OPTION,
        disabled: isOptionDisabled ? isOptionDisabled(option) : false,
        key: option.id,
        title: renderSelected(option),
        value: option.id
      }, renderOption(option));
    }
  }, {
    key: "onChange",
    value: function onChange(selectedOption) {
      var _this$injected2 = this.injected,
          onChange = _this$injected2.onChange,
          onAddNew = _this$injected2.onAddNew; // Clear

      if (!selectedOption) {
        onChange(null);
        return;
      } // Add new


      if (onAddNew && selectedOption.key === OPTION_KEYS.ADD) {
        onAddNew(this.search);
        return;
      } // Select from search


      if (this.isMultiSelect) {
        var selectedOptionIds = selectedOption.map(function (_selectedOption) {
          return _selectedOption.key;
        }),
            optionsToSearch = lodash.uniqBy([].concat(_toConsumableArray(this.injected.value), _toConsumableArray(this.options)), 'id'),
            foundOptions = optionsToSearch.filter(function (option) {
          return selectedOptionIds.includes(option.id);
        });
        onChange(mobx.toJS(foundOptions));
      } else {
        var foundOption = this.options.find(function (option) {
          return option.id === selectedOption.key;
        });
        onChange(mobx.toJS(foundOption));
      }
    } // istanbul ignore next

  }, {
    key: "onBlur",
    value: function onBlur() {
      this.search = '';
    } // istanbul ignore next

  }, {
    key: "onFocus",
    value: function onFocus() {
      if (this.isPristine || this.hasNewProps) {
        // Trigger empty search
        this.handleSearch(this.search);
      }
    }
  }, {
    key: "renderDropdownWrapper",
    value: function renderDropdownWrapper(menu) {
      var className = this.props.selectProps.className;
      return /*#__PURE__*/React__default.createElement("div", {
        className: className
      }, menu);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$injected3 = this.injected,
          id = _this$injected3.id,
          onAddNew = _this$injected3.onAddNew,
          searchOnEmpty = _this$injected3.searchOnEmpty,
          disabled = _this$injected3.disabled,
          isLoading = this.isLoading.isTrue,
          canSearch = this.hasSearch || !!searchOnEmpty,
          showNoResultsOption = canSearch && !isLoading && !this.hasOptions,
          showAddOption = !!(this.hasSearch && onAddNew),
          showNoSearch = !this.hasSearch,
          _this$fieldConfig3 = this.fieldConfig,
          label = _this$fieldConfig3.label,
          showLabel = _this$fieldConfig3.showLabel,
          placeholderLabel = showLabel && label ? " ".concat(label) : '',
          placeholder = "Search".concat(placeholderLabel, "...");
      return /*#__PURE__*/React__default.createElement(antd.Select, _extends({
        allowClear: !isLoading,
        defaultActiveFirstOption: false,
        disabled: disabled,
        dropdownRender: this.renderDropdownWrapper,
        filterOption: false,
        id: id,
        labelInValue: true,
        loading: isLoading,
        notFoundContent: null,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onSearch: this.debouncedHandleSearch,
        optionLabelProp: "title",
        placeholder: placeholder,
        showSearch: true,
        suffixIcon: isLoading ? this.loadingIcon : this.searchIcon
      }, this.valueProp, this.props.selectProps), showNoSearch && this.renderNoSearchOption(), showAddOption && this.renderAddOption(), this.options.map(this.renderOption), showNoResultsOption && this.renderNoResultsOption());
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
    key: "hasSearch",
    get: function get() {
      return this.search !== '';
    }
  }, {
    key: "hasOptions",
    get: function get() {
      return !!this.options.length;
    }
  }, {
    key: "hasNewEndpoint",
    get: function get() {
      return this.previousEndpoint !== this.fieldConfig.endpoint;
    }
  }, {
    key: "hasNewSearchFilters",
    get: function get() {
      return this.previousSearchFilters !== utils.toKey(this.fieldConfig.searchFilters || {});
    }
  }, {
    key: "hasNewProps",
    get: function get() {
      return this.hasNewEndpoint || this.hasNewSearchFilters;
    }
  }, {
    key: "isPristine",
    get: function get() {
      return !this.hasOptions && !this.hasSearch;
    }
  }, {
    key: "isMultiSelect",
    get: function get() {
      var mode = this.props.selectProps.mode;
      return mode && ['multiple', 'tags'].includes(mode);
    }
  }, {
    key: "loadingIcon",
    get: function get() {
      return this.props.loadingIcon || /*#__PURE__*/React__default.createElement(LoadingOutlined$2, null);
    }
  }, {
    key: "searchIcon",
    get: function get() {
      return this.props.searchIcon || /*#__PURE__*/React__default.createElement(SearchOutlined$2, null);
    }
  }, {
    key: "valueProp",
    get: function get() {
      var value = this.injected.value,
          renderSelected = this.fieldConfig.renderSelected;

      if (this.isMultiSelect) {
        if (!value) {
          return {
            value: undefined
          };
        }

        return {
          value: value.map(function (_value) {
            return {
              key: _value.id,
              label: renderSelected(_value),
              value: _value.id
            };
          })
        };
      }

      var valueId = lodash.get(value, 'id');

      if (!valueId) {
        return {
          value: undefined
        };
      }

      return {
        value: {
          key: valueId,
          label: renderSelected(value),
          value: valueId
        }
      };
    }
  }]);

  return ObjectSearch;
}(React.Component), _class3.defaultProps = {
  debounceWait: DEFAULT_DEBOUNCE_WAIT,
  selectProps: {}
}, _temp$1), (_descriptor = _applyDecoratedDescriptor(_class2$1.prototype, "options", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2$1.prototype, "isLoading", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2$1.prototype, "search", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2$1.prototype, "previousEndpoint", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2$1.prototype, "previousSearchFilters", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2$1)) || _class$3) || _class$3) || _class$3);

var _class$4, _class2$2, _descriptor$1, _descriptor2$1, _temp$2;
function isTypeObjectSearchCreate(fieldConfig) {
  return fieldConfig.type === 'objectSearchCreate';
}
var CLASS_NAME$3 = "".concat(CLASS_PREFIX, "-input-object-search-create");
var CLASS_NAME_BTN_BACK = "".concat(CLASS_NAME$3, "-btn-back");
var CLASS_NAME_CREATING = "".concat(CLASS_NAME$3, "-creating");

var ObjectSearchCreate = autoBindMethods(_class$4 = mobxReact.observer(_class$4 = (_class2$2 = (_temp$2 = /*#__PURE__*/function (_Component) {
  _inherits(ObjectSearchCreate, _Component);

  function ObjectSearchCreate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectSearchCreate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectSearchCreate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$1, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "search", _descriptor2$1, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ObjectSearchCreate, [{
    key: "onSwitchToAddNew",
    value: function () {
      var _onSwitchToAddNew = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(search) {
        var _this$injected, onAddNewToggle, formManager, fieldConfig;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$injected = this.injected, onAddNewToggle = _this$injected.onAddNewToggle, formManager = _this$injected.formManager, fieldConfig = _this$injected.fieldConfig;
                this.search = search;
                formManager.form.setFields([// Clear the existing value of the main field,
                {
                  name: fieldConfig.name,
                  value: {}
                }].concat(_toConsumableArray(this.createFields.map(function (createField) {
                  return {
                    name: [].concat(_toConsumableArray(fieldConfig.name), _toConsumableArray(createField.name)),
                    value: formManager.getDefaultValue(createField)
                  };
                }))));
                this.isAddingNew.setTrue();

                if (onAddNewToggle) {
                  onAddNewToggle(true);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSwitchToAddNew(_x) {
        return _onSwitchToAddNew.apply(this, arguments);
      }

      return onSwitchToAddNew;
    }()
  }, {
    key: "onSwitchBackToSearch",
    value: function () {
      var _onSwitchBackToSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$injected2, onAddNewToggle, formManager, fieldConfig;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$injected2 = this.injected, onAddNewToggle = _this$injected2.onAddNewToggle, formManager = _this$injected2.formManager, fieldConfig = _this$injected2.fieldConfig;
                formManager.form.setFields([].concat(_toConsumableArray(this.createFields.map(function (createField) {
                  return {
                    name: [].concat(_toConsumableArray(fieldConfig.name), _toConsumableArray(createField.name)),
                    value: undefined
                  };
                })), [// and set the main field back to it's default value
                {
                  name: fieldConfig.name,
                  value: formManager.getDefaultValue(fieldConfig)
                }]));
                this.isAddingNew.setFalse();

                if (onAddNewToggle) {
                  onAddNewToggle(false);
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSwitchBackToSearch() {
        return _onSwitchBackToSearch.apply(this, arguments);
      }

      return onSwitchBackToSearch;
    }()
  }, {
    key: "renderAddNew",
    value: function renderAddNew() {
      var _this$injected3 = this.injected,
          fieldConfig = _this$injected3.fieldConfig,
          formManager = _this$injected3.formManager;
      return /*#__PURE__*/React__default.createElement(antd.Col, null, /*#__PURE__*/React__default.createElement(antd.Form.Item, null, /*#__PURE__*/React__default.createElement(NestedFieldSet, {
        fieldSet: this.fieldConfig.createFields,
        formManager: formManager,
        formModel: formManager.formModel,
        id: fieldConfig.field,
        label: renderLabel(this.fieldConfig),
        search: this.search
      }), /*#__PURE__*/React__default.createElement(antd.Button, {
        className: CLASS_NAME_BTN_BACK,
        onClick: this.onSwitchBackToSearch,
        size: "small"
      }, /*#__PURE__*/React__default.createElement(LeftOutlined$2, null), " Back to search")));
    }
  }, {
    key: "renderSearch",
    value: function renderSearch() {
      var _this$injected4 = this.injected,
          fieldConfig = _this$injected4.fieldConfig,
          formManager = _this$injected4.formManager,
          formModel = _this$injected4.formModel,
          onChange = _this$injected4.onChange,
          disabled = _this$injected4.disabled,
          _this$props = this.props,
          addNewContent = _this$props.addNewContent,
          debounceWait = _this$props.debounceWait,
          isOptionDisabled = _this$props.isOptionDisabled,
          loadingIcon = _this$props.loadingIcon,
          noSearchContent = _this$props.noSearchContent,
          searchIcon = _this$props.searchIcon,
          searchOnEmpty = _this$props.searchOnEmpty,
          selectProps = _this$props.selectProps,
          overrideDisabled = {
        disabled: disabled
      };
      return /*#__PURE__*/React__default.createElement(FormItem, {
        fieldConfig: fieldConfig,
        formManager: formManager,
        formModel: formModel
      }, /*#__PURE__*/React__default.createElement(ObjectSearch, _extends({}, overrideDisabled, {
        addNewContent: addNewContent,
        debounceWait: debounceWait,
        fieldConfig: fieldConfig,
        id: fieldConfig.field,
        isOptionDisabled: isOptionDisabled,
        loadingIcon: loadingIcon,
        noSearchContent: noSearchContent,
        onAddNew: this.onSwitchToAddNew,
        onChange: onChange,
        searchIcon: searchIcon,
        searchOnEmpty: searchOnEmpty,
        selectProps: selectProps
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var className = cx(CLASS_NAME$3, _defineProperty({}, CLASS_NAME_CREATING, this.isAddingNew.isTrue), this.props.className);
      return /*#__PURE__*/React__default.createElement("div", {
        className: className
      }, this.isAddingNew.isTrue ? this.renderAddNew() : this.renderSearch(), this.props.children);
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
    key: "createFields",
    get: function get() {
      return getFieldSetFields(this.fieldConfig.createFields).map(function (createField) {
        return fillInFieldConfig(createField);
      });
    }
  }]);

  return ObjectSearchCreate;
}(React.Component), _temp$2), (_descriptor$1 = _applyDecoratedDescriptor(_class2$2.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$1 = _applyDecoratedDescriptor(_class2$2.prototype, "search", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2$2)) || _class$4) || _class$4;

var _class$5;

var WithTooltip = autoBindMethods(_class$5 = mobxReact.observer(_class$5 = /*#__PURE__*/function (_Component) {
  _inherits(WithTooltip, _Component);

  function WithTooltip() {
    _classCallCheck(this, WithTooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(WithTooltip).apply(this, arguments));
  }

  _createClass(WithTooltip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tooltip = _this$props.tooltip,
          children = _this$props.children;

      if (!tooltip) {
        return children;
      }

      return /*#__PURE__*/React__default.createElement("span", null, children, "\xA0", /*#__PURE__*/React__default.createElement(antd.Tooltip, {
        title: tooltip
      }, /*#__PURE__*/React__default.createElement(QuestionCircleOutlined$2, null)));
    }
  }]);

  return WithTooltip;
}(React.Component)) || _class$5) || _class$5;

var _class$6, _temp$3;
var inputConfig = {
  day: {
    placeholder: 'DD',
    style: {
      width: '29%',
      marginRight: '3%'
    }
  },
  month: {
    placeholder: 'MM',
    style: {
      width: '29%',
      marginRight: '3%'
    }
  },
  year: {
    placeholder: 'YYYY',
    style: {
      width: '36%'
    }
  }
},
    INPUT_ORDER = ['month', 'day', 'year'];

var Date$1 = autoBindMethods(_class$6 = mobxReact.observer(_class$6 = (_temp$3 = /*#__PURE__*/function (_Component) {
  _inherits(Date, _Component);

  function Date() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Date);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Date)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.inputRefs = {};
    return _this;
  }

  _createClass(Date, [{
    key: "getRefSetter",
    value: function getRefSetter(field) {
      var _this2 = this;

      return function (ref) {
        return _this2.inputRefs[field] = ref;
      };
    }
  }, {
    key: "getValueField",
    value: function getValueField(field) {
      return this.valueObject[field] || '';
    }
  }, {
    key: "onChange",
    value: function onChange(field, inputValue) {
      var regexNumbers = /[^0-9]+/,
          trimmedValue = inputValue.trim(),
          cleanedValue = regexNumbers.test(trimmedValue) ? 'invalid' : trimmedValue,
          filledInValue = field === 'year' ? utils.inferCentury(cleanedValue) : cleanedValue ? cleanedValue.padStart(2, '0') : '',
          valueObject = _objectSpread2({}, this.valueObject, _defineProperty({}, field, filledInValue)),
          year = valueObject.year,
          day = valueObject.day,
          month = valueObject.month,
          value = year || month || day ? [year, month, day].join('-') : '';

      this.injected.onChange(value); // Auto-increment to next input if input length 2 and in one of the first 2 boxes

      var inputNum = INPUT_ORDER.findIndex(function (s) {
        return s === field;
      });

      if (inputNum < 2 && cleanedValue.length === 2) {
        var goTo = INPUT_ORDER[inputNum + 1],
            ref = this.inputRefs[goTo];
        ref.focus();
      }
    }
  }, {
    key: "renderFieldInput",
    value: function renderFieldInput(field) {
      var _this3 = this;

      var id = this.injected.id,
          _inputConfig$field = inputConfig[field],
          style = _inputConfig$field.style,
          placeholder = _inputConfig$field.placeholder,
          defaultValue = this.getValueField(field),
          onChange = function onChange(event) {
        return _this3.onChange(field, event.target.value);
      },
          key = [id, field].join('.');

      return /*#__PURE__*/React__default.createElement("span", {
        key: key,
        style: _objectSpread2({
          display: 'inline-block'
        }, style)
      }, /*#__PURE__*/React__default.createElement(antd.Input, _extends({
        defaultValue: defaultValue,
        id: key,
        onChange: onChange,
        placeholder: placeholder,
        ref: this.getRefSetter(field)
      }, this.inputProps)));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(antd.Input.Group, {
        compact: true
      }, INPUT_ORDER.map(this.renderFieldInput));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }, {
    key: "inputProps",
    get: function get() {
      return lodash.omit(this.props, ['id', 'onChange', 'value']);
    }
  }, {
    key: "valueObject",
    get: function get() {
      var value = this.injected.value,
          _value$split = value.split('-'),
          _value$split2 = _slicedToArray(_value$split, 3),
          year = _value$split2[0],
          month = _value$split2[1],
          day = _value$split2[2];

      return {
        year: year,
        month: month,
        day: day
      };
    }
  }]);

  return Date;
}(React.Component), _temp$3)) || _class$6) || _class$6;

var _dec$1, _class$7, _class2$3, _class3$1, _temp$4;
// 8 is the most number of options you can show with no scroll
var SHOW_OPTION_SEARCH_IF_OVER = 8;
var ObjectSelect = (_dec$1 = mobxReact.inject('getOptions'), _dec$1(_class$7 = autoBindMethods(_class$7 = mobxReact.observer(_class$7 = (_class2$3 = (_temp$4 = _class3$1 = /*#__PURE__*/function (_Component) {
  _inherits(ObjectSelect, _Component);

  function ObjectSelect() {
    _classCallCheck(this, ObjectSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(ObjectSelect).apply(this, arguments));
  }

  _createClass(ObjectSelect, [{
    key: "renderOption",
    value: function renderOption(option) {
      var _this$injected = this.injected,
          renderSelected = _this$injected.renderSelected,
          renderOption = _this$injected.renderOption,
          keyBy = _this$injected.keyBy,
          key = lodash.get(option, keyBy);
      return /*#__PURE__*/React__default.createElement(antd.Select.Option, {
        disabled: option.disabled,
        key: key,
        title: renderSelected(option),
        value: key
      }, renderOption(option));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$injected2 = this.injected,
          keyBy = _this$injected2.keyBy,
          value = _this$injected2.value,
          selectValue = lodash.isObject(value) ? lodash.get(value, keyBy) : value;
      return /*#__PURE__*/React__default.createElement(antd.Select, _extends({
        allowClear: true,
        optionFilterProp: "children",
        showSearch: this.showSearch
      }, this.selectProps, {
        value: selectValue
      }), this.options.map(this.renderOption));
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
  }, {
    key: "showSearch",
    get: function get() {
      // the showSearch fieldConfig option will override this
      if (lodash.isBoolean(this.fieldConfig.showSearch)) {
        return this.fieldConfig.showSearch;
      }

      return this.options.length > SHOW_OPTION_SEARCH_IF_OVER;
    }
  }, {
    key: "selectProps",
    get: function get() {
      var _this$injected3 = this.injected,
          _fieldConfig = _this$injected3.fieldConfig,
          _formManager = _this$injected3.formManager,
          _formModel = _this$injected3.formModel,
          _getOptions = _this$injected3.getOptions,
          _keyBy = _this$injected3.keyBy,
          _renderOption = _this$injected3.renderOption,
          _renderSelected = _this$injected3.renderSelected,
          selectProps = _objectWithoutProperties(_this$injected3, ["fieldConfig", "formManager", "formModel", "getOptions", "keyBy", "renderOption", "renderSelected"]);

      return _objectSpread2({}, selectProps);
    }
  }]);

  return ObjectSelect;
}(React.Component), _class3$1.defaultProps = {
  keyBy: 'id',
  renderOption: utils.getNameOrDefault,
  renderSelected: utils.getNameOrDefault
}, _temp$4), (_applyDecoratedDescriptor(_class2$3.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$3.prototype, "options"), _class2$3.prototype)), _class2$3)) || _class$7) || _class$7) || _class$7);

var _class$8;

var OptionSelect = autoBindMethods(_class$8 = mobxReact.observer(_class$8 = /*#__PURE__*/function (_Component) {
  _inherits(OptionSelect, _Component);

  function OptionSelect() {
    _classCallCheck(this, OptionSelect);

    return _possibleConstructorReturn(this, _getPrototypeOf(OptionSelect).apply(this, arguments));
  }

  _createClass(OptionSelect, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(ObjectSelect, _extends({}, this.props, {
        keyBy: "value"
      }));
    }
  }]);

  return OptionSelect;
}(React.Component)) || _class$8) || _class$8;

var _dec$2, _class$9, _class2$4;
var RadioGroup = (_dec$2 = mobxReact.inject('getOptions'), _dec$2(_class$9 = autoBindMethods(_class$9 = mobxReact.observer(_class$9 = (_class2$4 = /*#__PURE__*/function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioGroup).apply(this, arguments));
  }

  _createClass(RadioGroup, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(antd.Radio.Group, this.props, this.options.map(function (option) {
        return /*#__PURE__*/React__default.createElement(antd.Radio, {
          disabled: option.disabled,
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

  return RadioGroup;
}(React.Component), (_applyDecoratedDescriptor(_class2$4.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$4.prototype, "options"), _class2$4.prototype)), _class2$4)) || _class$9) || _class$9) || _class$9);

var _class$a;
function formatRating(value) {
  return value ? /*#__PURE__*/React__default.createElement(antd.Rate, {
    disabled: true,
    defaultValue: +value
  }) : utils.EMPTY_FIELD;
}

var Rate = autoBindMethods(_class$a = mobxReact.observer(_class$a = /*#__PURE__*/function (_Component) {
  _inherits(Rate, _Component);

  function Rate() {
    _classCallCheck(this, Rate);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rate).apply(this, arguments));
  }

  _createClass(Rate, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(antd.Rate, _extends({}, this.props, {
        value: Number(this.injected.value)
      }));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }]);

  return Rate;
}(React.Component)) || _class$a) || _class$a;

var _dec$3, _class$b, _class2$5;
var OptionSelectDisplay = (_dec$3 = mobxReact.inject('getOptions'), _dec$3(_class$b = autoBindMethods(_class$b = mobxReact.observer(_class$b = (_class2$5 = /*#__PURE__*/function (_Component) {
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
        return utils.EMPTY_FIELD;
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

  return OptionSelectDisplay;
}(React.Component), (_applyDecoratedDescriptor(_class2$5.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$5.prototype, "options"), _class2$5.prototype)), _class2$5)) || _class$b) || _class$b) || _class$b);
function formatOptionSelect(value, fieldConfig) {
  if (lodash.isArray(value)) {
    if (value.length > 1) {
      return "(".concat(value.length, " values)");
    }

    return /*#__PURE__*/React__default.createElement(OptionSelectDisplay, {
      value: value[0],
      fieldConfig: fieldConfig
    });
  }

  return /*#__PURE__*/React__default.createElement(OptionSelectDisplay, {
    value: value,
    fieldConfig: fieldConfig
  });
}

function getDateFormatList() {
  var months = ['MM', 'M'],
      days = ['DD', 'D'],
      years = ['YY', 'YYYY'],
      delineators = ['/', '.', '', ' ', '-'],
      dateFormatList = [];
  months.forEach(function (month) {
    days.forEach(function (day) {
      years.forEach(function (year) {
        delineators.forEach(function (delineator) {
          dateFormatList.push([month, day, year].join(delineator));
        });
      });
    });
  });
  return dateFormatList;
}

var _class$c;

/*
Most components are automatically wrapped with a lot of boiler-plate form code
in FormItem.tsx. Components that want more control over this can pass
skipFieldDecorator and then use FormItem themselves. For hidden inputs, we want
almost no wrapping at all so the component doesn't render anything on the page.
To do this, we use skipFieldDecorator to opt out of boiler-plate then
fieldConfigProp to get some advanced props ( like fieldConfig ) so that we can
do some of what FormItem does for ourselves below:
*/
var Hidden = autoBindMethods(_class$c = mobxReact.observer(_class$c = /*#__PURE__*/function (_Component) {
  _inherits(Hidden, _Component);

  function Hidden() {
    _classCallCheck(this, Hidden);

    return _possibleConstructorReturn(this, _getPrototypeOf(Hidden).apply(this, arguments));
  }

  _createClass(Hidden, [{
    key: "render",
    value: function render() {
      var _this$injected = this.injected,
          formManager = _this$injected.formManager,
          fieldConfig = _this$injected.fieldConfig,
          name = _this$injected.fieldConfig.name,
          initialValue = formManager.getDefaultValue(fieldConfig),
          HANDLED_PROPS = ['formManager', 'formModel', 'fieldConfig'],
          inputProps = _objectSpread2({}, lodash.omit(this.props, HANDLED_PROPS), {
        type: 'hidden'
      });

      return /*#__PURE__*/React__default.createElement(antd.Form.Item, {
        name: name,
        initialValue: initialValue
      }, /*#__PURE__*/React__default.createElement(antd.Input, inputProps));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }]);

  return Hidden;
}(React.Component)) || _class$c) || _class$c;

var _class$d;

var Checkbox = autoBindMethods(_class$d = mobxReact.observer(_class$d = /*#__PURE__*/function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var _this$injected = this.injected,
          description = _this$injected.description,
          disabled = _this$injected.disabled,
          disabledText = _this$injected.disabledText,
          value = _this$injected.value,
          PROPS_TO_OMIT = ['description', 'value'],
          checkboxProps = _objectSpread2({}, lodash.omit(this.props, PROPS_TO_OMIT), {
        checked: !!value
      });

      return /*#__PURE__*/React__default.createElement(antd.Tooltip, {
        title: disabled ? disabledText : ''
      }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(antd.Checkbox, checkboxProps, description || '')));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }]);

  return Checkbox;
}(React.Component)) || _class$d) || _class$d;

var _class$e, _class2$6, _descriptor$2, _temp$5;

var TrimWhitespaceInput = autoBindMethods(_class$e = mobxReact.observer(_class$e = (_class2$6 = (_temp$5 = /*#__PURE__*/function (_Component) {
  _inherits(TrimWhitespaceInput, _Component);

  function TrimWhitespaceInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TrimWhitespaceInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TrimWhitespaceInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor$2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(TrimWhitespaceInput, [{
    key: "onChange",
    value: function onChange(e) {
      this.value = e.target.value.trim();
      this.injected.onChange(this.value);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(antd.Input, _extends({
        value: this.value
      }, this.props, {
        onChange: this.onChange
      }));
    }
  }, {
    key: "injected",
    get: function get() {
      return this.props;
    }
  }]);

  return TrimWhitespaceInput;
}(React.Component), _temp$5), (_descriptor$2 = _applyDecoratedDescriptor(_class2$6.prototype, "value", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2$6)) || _class$e) || _class$e;

function passRenderOnlyValue(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value, _fieldConfig, _model) {
    return func(value);
  };
}

function passRenderOnlyValueAndFieldConfig(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value, fieldConfig, _model) {
    return func(value, fieldConfig);
  };
}

function passToFormOnlyValue(func) {
  // tslint:disable-next-line no-unnecessary-callback-wrapper
  return function (value, _fieldConfig) {
    return func(value);
  };
}

function booleanToForm(value) {
  return lodash.isBoolean(value) ? value.toString() : value;
}

function booleanFromForm(value) {
  for (var _i = 0, _arr = [true, false]; _i < _arr.length; _i++) {
    var bool = _arr[_i];

    if (value === bool || value === bool.toString()) {
      return bool;
    }
  }

  return value;
}

var dateFormatList = getDateFormatList();
var TYPES = {
  address: {
    editComponent: Address,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(utils.formatAddressMultiline),
    skipFieldDecorator: true
  },
  "boolean": {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    fromForm: booleanFromForm,
    nullify: true,
    options: [{
      value: 'false',
      name: 'No'
    }, {
      value: 'true',
      name: 'Yes'
    }],
    render: passRenderOnlyValue(utils.mapBooleanToText),
    toForm: passToFormOnlyValue(booleanToForm)
  },
  checkbox: {
    editComponent: Checkbox,
    fromForm: function fromForm(value) {
      return !!value;
    },
    render: passRenderOnlyValue(utils.mapBooleanToText)
  },
  date: {
    editComponent: Date$1,
    formValidationRules: {
      isValidDate: {
        validator: function validator(_, value) {
          return utils.isValidDate(value) ? Promise.resolve() : Promise.reject();
        },
        message: 'Must be a valid date'
      }
    },
    nullify: true,
    render: passRenderOnlyValue(utils.formatDate)
  },
  datepicker: {
    editComponent: antd.DatePicker,
    editProps: {
      format: dateFormatList
    },
    fromForm: function fromForm(value) {
      return value ? dateFns.format(value, 'YYYY-MM-DD') : '';
    },
    nullify: true,
    render: passRenderOnlyValue(utils.formatDate),
    toForm: function toForm(value) {
      return (value || null) && moment__default(value);
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
  ein: {
    editComponent: antd.Input,
    formValidationRules: {
      ssn: {
        message: 'Must be a valid employer ID number',
        pattern: REGEXP_EIN
      }
    },
    render: passRenderOnlyValue(utils.formatEmployerIdNumber)
  },
  email: {
    editComponent: TrimWhitespaceInput,
    formValidationRules: {
      email: {
        message: 'Must be a valid email address',
        type: 'email'
      }
    }
  },
  hidden: {
    editComponent: Hidden,
    fieldConfigProp: true,
    showLabel: false,
    skipFieldDecorator: true,
    writeOnly: true
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
    render: passRenderOnlyValue(utils.formatMoney)
  },
  number: {
    editComponent: antd.Input,
    editProps: {
      type: 'number'
    },
    nullify: true,
    render: utils.formatCommaSeparatedNumber
  },
  objectSearch: {
    editComponent: ObjectSearch,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(utils.getNameOrDefault),
    renderOption: passRenderOnlyValue(utils.getNameOrDefault),
    renderSelected: passRenderOnlyValue(utils.getNameOrDefault)
  },
  objectSearchCreate: {
    editComponent: ObjectSearchCreate,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(utils.getNameOrDefault),
    renderOption: passRenderOnlyValue(utils.getNameOrDefault),
    renderSelected: passRenderOnlyValue(utils.getNameOrDefault),
    skipFieldDecorator: true
  },
  objectSelect: {
    editComponent: ObjectSelect,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(utils.getNameOrDefault)
  },
  optionSelect: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValueAndFieldConfig(formatOptionSelect)
  },
  password: {
    editComponent: antd.Input.Password,
    render: function render(value) {
      return value ? '********' : utils.EMPTY_FIELD;
    }
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
          return value ? Math.floor(Number(value)) : undefined;
        },
        type: 'integer'
      }
    },
    fromForm: function fromForm(value) {
      return value && utils.getPercentValue(value);
    },
    render: passRenderOnlyValue(utils.formatPercentage),
    toForm: passToFormOnlyValue(utils.getPercentDisplay)
  },
  phone: {
    editComponent: antd.Input,
    render: passRenderOnlyValue(utils.formatPhoneNumber)
  },
  radio: {
    editComponent: RadioGroup,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValueAndFieldConfig(formatOptionSelect)
  },
  rating: {
    editComponent: Rate,
    nullify: true,
    render: formatRating
  },
  ssn: {
    editComponent: antd.Input,
    formValidationRules: {
      ssn: {
        message: 'Must be a valid social security number',
        pattern: REGEXP_SSN
      }
    },
    render: passRenderOnlyValue(utils.formatSocialSecurityNumber)
  },
  string: {},
  text: {
    editComponent: antd.Input.TextArea,
    editProps: {
      autoSize: {
        minRows: 4
      }
    },
    render: passRenderOnlyValue(utils.parseAndPreserveNewlines)
  },
  url: {
    editComponent: TrimWhitespaceInput,
    render: passRenderOnlyValue(utils.formatWebsite)
  }
};

function falseyToString(value) {
  return value || '';
}
var typeDefaults = {
  editComponent: antd.Input,
  fieldConfigProp: false,
  formValidationRules: {},
  fromForm: falseyToString,
  nullify: false,
  toForm: falseyToString
};

function stripFieldConfig(func) {
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

  if (field.includes('amount')) {
    return 'money';
  }

  if (field.includes('body')) {
    return 'text';
  }

  if (field.includes('note')) {
    return 'text';
  }

  if (field.includes('percent')) {
    return 'percentage';
  }

  if (field.includes('summary')) {
    return 'text';
  }

  if (field.endsWith('_on')) {
    return 'date';
  }

  if (field.endsWith('_at')) {
    return 'date';
  }

  if (field.startsWith('is_')) {
    return 'boolean';
  } // Putting this ahead of loop so phone_number => phone, and not number


  if (field.includes('phone')) {
    return 'phone';
  } // date => date etc.


  for (var type in TYPES) {
    if (field === type) {
      return type;
    }
  } // start_date => date etc.


  for (var _type in TYPES) {
    if (field.includes(_type)) {
      return _type;
    }
  }

  return 'string';
}

function fillInFieldConfig(fieldConfig) {
  var type = inferType(fieldConfig),
      label = fieldConfig.label || utils.varToLabel(getFieldSuffix(fieldConfig.field));
  var requiredValidationRule = fieldConfig.required ? {
    required: {
      message: "'".concat(label, "' is required"),
      required: true
    }
  } : undefined; // istanbul ignore next

  if (!TYPES[type]) {
    // istanbul ignore next
    throw new Error("Type '".concat(type, "' not in fields-ant TYPES"));
  }

  return _objectSpread2({
    // Universal defaults
    disabled: false,
    key: fieldConfig.field,
    label: label,
    name: fieldConfig.field.split('.'),
    populateFromSearch: false,
    populateNameFromSearch: false,
    readOnly: false,
    render: stripFieldConfig(utils.getOrDefault),
    required: false,
    showLabel: true,
    skipFieldDecorator: false,
    type: type,
    writeOnly: false
  }, typeDefaults, {}, TYPES[type], {}, fieldConfig, {
    // Merge nested object
    editProps: _objectSpread2({}, fieldConfig.editProps, {}, TYPES[type].editProps),
    // Merge nested object
    formValidationRules: _objectSpread2({}, TYPES[type].formValidationRules, {}, fieldConfig.formValidationRules, {}, requiredValidationRule)
  });
}
function fillInFieldSet(fieldSet) {
  // Fills in the defaults from common so we can keep configurations light
  return mapFieldSetFields(fieldSet, fillInFieldConfig);
}
function fillInFieldSets(fieldSets) {
  return fieldSets.map(fillInFieldSet);
}

// filterFieldConfig => True means don't show
function filterFieldConfig(fieldConfig, filterConditions) {
  var model = filterConditions.model,
      readOnly = filterConditions.readOnly,
      writeOnly = filterConditions.writeOnly,
      filterInsertIf = !!fieldConfig.insertIf && !fieldConfig.insertIf(model),
      filterReadOnly = lodash.isBoolean(readOnly) && readOnly === fieldConfig.readOnly,
      filterWriteOnly = lodash.isBoolean(writeOnly) && writeOnly === fieldConfig.writeOnly;
  return [filterInsertIf, filterReadOnly, filterWriteOnly].some(function (value) {
    return value;
  });
}
function filterFieldConfigs(fieldConfigs, filterConditions) {
  return fieldConfigs.filter(function (fieldConfig) {
    return !filterFieldConfig(fieldConfig, filterConditions);
  });
}
function filterFieldSet(fieldSet, filterConditions) {
  var fieldConfigs = getFieldSetFields(fieldSet).filter(function (fieldConfig) {
    return !filterFieldConfig(fieldConfig, filterConditions);
  });
  return setFieldSetFields(fieldSet, fieldConfigs);
}
function filterFieldSets(fieldSets, filterConditions) {
  return fieldSets.map(function (fieldSet) {
    return filterFieldSet(fieldSet, filterConditions);
  }).filter(function (fieldSet) {
    return !!getFieldSetFields(fieldSet).length;
  });
}

var isBuffer = function isBuffer(obj) {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

var keyIdentity = function keyIdentity(key) {
  return key;
}; // This is an alteration of flat's flattenObject function that includes has the ability to handle Moment objects.
// In this case, a removeDate key set to true in opts will make sure that Moment objects are not flattened like other objects.


var flatten = function flatten(target) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var delimiter = opts.delimiter || '.',
      transformKey = opts.transformKey || keyIdentity,
      output = {};

  function step(object, prev, currentDepth) {
    currentDepth = currentDepth || 1;
    Object.keys(object).forEach(function (key) {
      var value = object[key],
          isarray = opts.safe && Array.isArray(value),
          type = Object.prototype.toString.call(value),
          isbuffer = isBuffer(value),
          isDate = opts.removeDate ? moment.isMoment(value) : false,
          isobject = type === '[object Object]' || type === '[object Array]',
          newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);

      if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < opts.maxDepth) && !isDate) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target);
  return output;
};

function isPartialFieldSetSimple(fieldSet) {
  return lodash.isArray(fieldSet);
}
function isFieldSetSimple(fieldSet) {
  return lodash.isArray(fieldSet);
}
function mapFieldSetFields(fieldSet, mapper) {
  if (isPartialFieldSetSimple(fieldSet)) {
    return fieldSet.map(mapper);
  }

  return _objectSpread2({}, fieldSet, {
    fields: fieldSet.fields.map(mapper)
  });
}
function setFieldSetFields(fieldSet, fields) {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return _objectSpread2({}, fieldSet, {
    fields: fields
  });
}
function getFieldSetFields(fieldSet) {
  if (isFieldSetSimple(fieldSet)) {
    return fieldSet;
  }

  return fieldSet.fields;
}
function getFieldSetsFields(fieldSets) {
  return lodash.flatten(fieldSets.map(getFieldSetFields));
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


  if (!optionType) {
    throw new Error("optionType missing in config for ".concat(fieldConfig.field));
  } // istanbul ignore next


  if (!injected.getOptions) {
    throw new Error("getOptions not injected for ".concat(fieldConfig.field));
  } // istanbul ignore next


  throw new Error('Unknown error in getUnsortedOptions');
}
function getOptions(fieldConfig, injected) {
  var unsortedOptions = getUnsortedOptions(fieldConfig, injected);
  return fieldConfig.sorted ? lodash.sortBy(unsortedOptions, 'name') : unsortedOptions;
}
function renderValue(fieldConfigPartial, model) {
  var fieldConfig = fillInFieldConfig(fieldConfigPartial),
      field = fieldConfig.field,
      render = fieldConfig.render,
      value = lodash.has(fieldConfig, 'value') ? fieldConfig.value : lodash.get(model, field);
  return render(value, fieldConfig, model || {});
}
function renderLabel(fieldConfig) {
  var label = fieldConfig.label,
      showLabel = fieldConfig.showLabel,
      tooltip = fieldConfig.tooltip;

  if (!showLabel) {
    return '';
  }

  if (tooltip) {
    return /*#__PURE__*/React__default.createElement(WithTooltip, {
      tooltip: tooltip
    }, label);
  }

  return label;
}
function fieldSetsToColumns(fieldSets) {
  var tableModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return getFieldSetsFields(fillInFieldSets(fieldSets)).filter(function (fieldConfig) {
    return !filterFieldConfig(fieldConfig, {
      model: tableModel,
      writeOnly: true
    });
  }).map(function (fieldConfig) {
    return _objectSpread2({
      dataIndex: fieldConfig.field.split('.'),
      render: function render(value, model) {
        return fieldConfig.render(value, fieldConfig, model);
      },
      title: renderLabel(fieldConfig)
    }, fieldConfig.tableColumnProps, {
      key: fieldConfig.field
    });
  });
}

function nullifyValue(fieldConfig, data) {
  var field = fieldConfig.field,
      nullify = fieldConfig.nullify,
      formValue = lodash.get(data, field),
      shouldNullify = nullify && !formValue && formValue !== false,
      nullifiedValue = shouldNullify ? null : formValue,
      isAddingNew = lodash.isObject(formValue) && !lodash.has(formValue, ID_ATTR); // When using the add new feature of objectSearchCreate, we should
  // make sure to nullify the appropriate fields in the new model

  if (isTypeObjectSearchCreate(fieldConfig) && isAddingNew) {
    return modelFromFieldConfigs(getFieldSetFields(fieldConfig.createFields).map(fillInFieldConfig), formValue);
  } // When saving an address, nullify if no attributes


  if (nullify && isTypeAddress(fieldConfig) && !lodash.some(formValue)) {
    return null;
  }

  return nullifiedValue;
}

function modelFromFieldConfigs(fieldConfigs, data) {
  /*
    This function takes in a model with ALL form values, including those that should be hidden like
    readOnly fieldConfigs and those hidden by insertIf. We build a new model from scratch, only
    including those that should be there. We also nullify falsey values that require it here, and
    include the id from the model even if there is no fieldConfig for it.
    */
  var returnValues = {};
  fieldConfigs.filter(function (fieldConfig) {
    return !filterFieldConfig(fieldConfig, {
      model: data,
      readOnly: true
    });
  }).forEach(function (fieldConfig) {
    var field = fieldConfig.field,
        value = nullifyValue(fieldConfig, data);
    lodash.set(returnValues, field, value);
  }); // We always include ids of models on submit

  var id = lodash.get(data, ID_ATTR);

  if (id) {
    lodash.set(returnValues, ID_ATTR, id);
  }

  return returnValues;
}
function noopValidator(_x, _x2) {
  return _noopValidator.apply(this, arguments);
}

function _noopValidator() {
  _noopValidator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_rule, _value) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _noopValidator.apply(this, arguments);
}

function getBtnClassName(action, classNameSuffix, title) {
  var prefix = "btn-".concat(action);
  return cx(prefix, lodash.isString(title) && "".concat(prefix, "-").concat(lodash.kebabCase(title)), _defineProperty({}, "".concat(prefix, "-").concat(classNameSuffix), !!classNameSuffix));
}
function formatClassNames(className) {
  var colon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LAYOUT_TYPES.VERTICAL;
  var hasColon = colon && layout !== LAYOUT_TYPES.VERTICAL;
  return cx("".concat(className, "-").concat(layout), "".concat(className).concat(hasColon ? '' : '-no', "-colon"));
}
var unflattenObject = function unflattenObject(object) {
  var flattenedObject = flatten(object, {
    removeDate: true
  });
  return Object.entries(flattenedObject).reduce(function (objOut, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return lodash.set(objOut, key, value);
  }, {});
};

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
    }

    if (lodash.isBoolean(fieldErrors)) {
      fieldErrors = utils.mapBooleanToText(fieldErrors);
    }

    if (lodash.isPlainObject(fieldErrors)) {
      // If an object, recurse
      lodash.extend(messages, getFieldErrors(fieldErrors, fieldKey));
    } else {
      // If a simple string, you have your error
      messages[fieldKey] = fieldErrors;
    }
  });
  return messages;
}

function assignErrorFieldsToFormFields(fieldNames, fieldErrors) {
  var foundOnForm = {},
      errorMessages = []; // Try to assign error fields to form fields, falling back on generic array

  Object.keys(fieldErrors).forEach(function (errorField) {
    var message = fieldErrors[errorField],
        label = errorField === 'non_field_errors' ? '' : utils.varToLabel(errorField); // Check for an exact match

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
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    errorMessages.push({
      field: label,
      message: message
    });
  });
  return {
    errorMessages: errorMessages,
    foundOnForm: foundOnForm
  };
}

function backendValidation(fieldNames, response) {
  if (lodash.isArray(response)) {
    return {
      errorMessages: [{
        field: '',
        message: response[0]
      }],
      foundOnForm: {}
    };
  }

  if (lodash.isPlainObject(response)) {
    var fieldErrors = getFieldErrors(response);
    return assignErrorFieldsToFormFields(fieldNames, fieldErrors);
  }

  if (lodash.isString(response)) {
    return {
      errorMessages: [{
        field: '',
        message: response
      }],
      foundOnForm: {}
    };
  }

  return {
    errorMessages: [{
      field: '',
      message: toastError['message']
    }],
    foundOnForm: {}
  };
}

var _class$f, _class2$7, _descriptor$3, _descriptor2$2, _descriptor3$1, _temp$6;
var ERROR_WITH_DESCRIPTION = [httpStatus.BAD_REQUEST, httpStatus.FORBIDDEN];
var toastError = {
  description: '',
  duration: TOAST_DURATION,
  message: 'Error submitting form'
};

var FormManager = autoBindMethods(_class$f = (_class2$7 = (_temp$6 = /*#__PURE__*/function () {
  // This is managed by FormManager in this.onFinish
  // These are derived from calls to this.onFieldsChange by Ant Form
  function FormManager(formWrappedInstance, fieldSets, args) {
    _classCallCheck(this, FormManager);

    _initializerDefineProperty(this, "isSaving", _descriptor$3, this);

    _initializerDefineProperty(this, "hasErrors", _descriptor2$2, this);

    _initializerDefineProperty(this, "formLastUpdated", _descriptor3$1, this);

    this.args = void 0;
    this.formWrappedInstance = void 0;
    this.formWrappedInstance = formWrappedInstance;
    this.args = _objectSpread2({
      defaults: {},
      fieldSets: fieldSets,
      model: {},
      onSave: lodash.noop,
      onSuccess: lodash.noop,
      processErrors: function processErrors(errors) {
        return errors;
      },
      resetOnSuccess: true,
      successText: 'Success'
    }, lodash.pickBy(args, function (value) {
      return value !== undefined;
    }));
  }

  _createClass(FormManager, [{
    key: "getDefaultValue",
    value: function getDefaultValue(fieldConfig) {
      var _this$args = this.args,
          model = _this$args.model,
          defaults = _this$args.defaults,
          modelToValue = function modelToValue(from) {
        return lodash.get(from, fieldConfig.field);
      },
          modelToForm = function modelToForm(from) {
        return fieldConfig.toForm(modelToValue(from), fieldConfig);
      };

      if (lodash.has(fieldConfig, 'value')) {
        return fieldConfig.toForm(fieldConfig.value, fieldConfig);
      }

      if (lodash.has(model, fieldConfig.field)) {
        return modelToForm(model);
      }

      if (lodash.has(defaults, fieldConfig.field)) {
        return modelToForm(defaults);
      }

      return modelToForm(_objectSpread2({}, model, {}, defaults));
    }
  }, {
    key: "getFormValue",
    value: function getFormValue(fieldConfig, formValues) {
      var formValue = lodash.get(formValues, fieldConfig.field),
          convertedValue = fieldConfig.fromForm(formValue, fieldConfig);

      return convertedValue;
    }
  }, {
    key: "onFieldsChange",
    value: function onFieldsChange(_changedValues, values) {
      this.hasErrors = values.some(function (_ref) {
        var errors = _ref.errors;
        return errors === null || errors === void 0 ? void 0 : errors.length;
      });
      this.formLastUpdated = +new Date();
    }
  }, {
    key: "onSuccess",
    value: function onSuccess() {
      var _this$args2 = this.args,
          onSuccess = _this$args2.onSuccess,
          successText = _this$args2.successText;

      if (successText) {
        antd.notification.success({
          description: '',
          duration: TOAST_DURATION,
          message: successText
        });
      }

      onSuccess();
    }
  }, {
    key: "setErrorsOnFormFields",
    value: function setErrorsOnFormFields(errors) {
      var formValues = this.formValues,
          fieldData = Object.entries(errors).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            field = _ref3[0],
            error = _ref3[1];

        return {
          errors: [error],
          name: field.split('.'),
          value: lodash.get(formValues, field)
        };
      });
      this.hasErrors = !!Object.entries(errors).length;
      this.form.setFields(fieldData);
    }
  }, {
    key: "notifyUserAboutErrors",
    value: function notifyUserAboutErrors(errors) {
      errors.forEach(function (_ref4) {
        var field = _ref4.field,
            message = _ref4.message;
        var description = [field, message].filter(function (s) {
          return !!s;
        }).join(' - ');
        antd.notification.error(_objectSpread2({}, toastError, {
          description: description
        }));
      });
    }
  }, {
    key: "handleRequestError",
    value: function handleRequestError(error) {
      /*
      Here we take the raw axios error and try to extract as much information from it as we can
      and use it to inform the user. If we're lucky, we have a nicely formatted JSON bad request
      response. If so, we will try to assign those validation errors to fields, and if that fails
      we will display them in toast notifications.
      */
      var status = lodash.get(error, 'response.status');

      var backendErrors = {
        foundOnForm: {},
        errorMessages: []
      };

      function logError() {
        // tslint:disable-next-line no-console
        console.error('Error submitting form:', {
          error: error
        });
      } // A response with no status cannot be reasoned with
      // istanbul ignore next


      if (!status) {
        backendErrors.errorMessages.push({
          field: '',
          message: ''
        });
        logError();
      } // Errors like 500 and 403 Forbidden should be as descriptive as possible


      if (status && !ERROR_WITH_DESCRIPTION.includes(status)) {
        var statusMessage = httpStatus.getStatusText(status);
        backendErrors.errorMessages.push({
          field: status.toString(),
          message: statusMessage
        });
        logError();
      } // Bad request errors are mapped to fields when possible


      if (status && ERROR_WITH_DESCRIPTION.includes(status)) {
        var _backendValidation = backendValidation(this.formFieldNames, error.response.data),
            foundOnForm = _backendValidation.foundOnForm,
            errorMessages = _backendValidation.errorMessages;

        backendErrors.errorMessages = [].concat(_toConsumableArray(backendErrors.errorMessages), _toConsumableArray(errorMessages));
        backendErrors.foundOnForm = _objectSpread2({}, backendErrors.foundOnForm, {}, foundOnForm);
      } // This gives the user an opportunity to override, rewrite, or add errors


      backendErrors = this.args.processErrors(backendErrors);
      this.setErrorsOnFormFields(backendErrors.foundOnForm);
      this.notifyUserAboutErrors(backendErrors.errorMessages);
    }
  }, {
    key: "onFinish",
    value: function () {
      var _onFinish = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var onSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onSave = this.args.onSave;
                this.isSaving = true;
                _context.prev = 2;
                _context.next = 5;
                return onSave(this.submitModel);

              case 5:
                this.onSuccess();

                if (this.args.resetOnSuccess) {
                  this.form.resetFields();
                }

                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                this.handleRequestError(_context.t0);

              case 12:
                _context.prev = 12;
                this.isSaving = false;
                return _context.finish(12);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9, 12, 15]]);
      }));

      function onFinish() {
        return _onFinish.apply(this, arguments);
      }

      return onFinish;
    }()
  }, {
    key: "form",
    get: function get() {
      // The form prop continuously changes identity, so we can't just save it locally
      return this.formWrappedInstance.props.form;
    }
  }, {
    key: "isFormDisabled",
    get: function get() {
      // The disabled prop can be changed any time, so we can't just save it locally
      return this.isSaving || !!this.formWrappedInstance.props.disabled;
    }
  }, {
    key: "fieldSets",
    get: function get() {
      // The fieldSets prop can be changed any time, so try to get them dynamically if you can
      var fieldSetsProp = this.formWrappedInstance.props.fieldSets;
      return fieldSetsProp ? fillInFieldSets(fieldSetsProp) : this.args.fieldSets;
    }
  }, {
    key: "fieldConfigs",
    get: function get() {
      return getFieldSetsFields(this.fieldSets);
    }
  }, {
    key: "isSubmitButtonDisabled",
    get: function get() {
      return this.hasErrors || this.isFormDisabled;
    }
  }, {
    key: "isCancelButtonDisabled",
    get: function get() {
      return this.isFormDisabled;
    }
  }, {
    key: "formValues",
    get: function get() {
      // WARNING: Pure unprocessed rc-form response
      // formValues < formModel < submitModel
      return this.form.getFieldsValue();
    }
  }, {
    key: "formModel",
    get: function get() {
      var _this = this;

      /*
      formValues < formModel < submitModel
       Get the current value of all fields according to rc-form,
      or so that we have the model before the first render,
      compile it from all the default values.
       WARNING: This will include many values you don't see on the page.
      Use submitModel to get the fully processed form state.
      */
      // The pointless ternary below ensures that formModel observes formLastUpdated changes,
      // which is updated any time a field is edited.
      // istanbul ignore next
      var formModel = this.formLastUpdated ? {} : {},
          formValues = unflattenObject(this.formValues);
      this.fieldConfigs.forEach(function (fieldConfig) {
        var isInForm = lodash.has(formValues, fieldConfig.field),
            value = isInForm ? _this.getFormValue(fieldConfig, formValues) : fieldConfig.fromForm(_this.getDefaultValue(fieldConfig), fieldConfig);
        lodash.set(formModel, fieldConfig.field, value);
      }); // We always include ids of models on submit

      var id = lodash.get(this.args.model, ID_ATTR);

      if (id) {
        lodash.set(formModel, ID_ATTR, id);
      }

      return formModel;
    }
  }, {
    key: "submitModel",
    get: function get() {
      /*
      formValues < formModel < submitModel
       This is the finalized form model. We only use it in critical situations like onFinish
      because many of the places we use formModel are used to build submitModel.
       For example: We can't call all insertIf functions to build submitModel if those functions
      are called with submitModel. So we use formModel unless we need perfection.
      */
      return modelFromFieldConfigs(this.fieldConfigs, this.formModel);
    }
  }, {
    key: "formFieldNames",
    get: function get() {
      return Object.keys(flattenObject(this.formValues));
    }
  }]);

  return FormManager;
}(), _temp$6), (_descriptor$3 = _applyDecoratedDescriptor(_class2$7.prototype, "isSaving", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class2$7.prototype, "hasErrors", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$1 = _applyDecoratedDescriptor(_class2$7.prototype, "formLastUpdated", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return +new Date();
  }
})), _class2$7)) || _class$f;

var _class$g, _class2$8, _class3$2;

var Info = autoBindMethods(_class$g = mobxReact.observer(_class$g = /*#__PURE__*/function (_Component) {
  _inherits(Info, _Component);

  function Info() {
    _classCallCheck(this, Info);

    return _possibleConstructorReturn(this, _getPrototypeOf(Info).apply(this, arguments));
  }

  _createClass(Info, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fieldConfig = _this$props.fieldConfig,
          format = _this$props.format,
          layout = format === null || format === void 0 ? void 0 : format.layout,
          rowClassName = cx(fieldConfig.className, "".concat(CLASS_PREFIX, "-info-row-").concat(layout));
      return /*#__PURE__*/React__default.createElement(antd.Col, _extends({}, this.props.fieldConfig.colProps, {
        className: "".concat(CLASS_PREFIX, "-info")
      }), /*#__PURE__*/React__default.createElement(antd.Row, {
        className: rowClassName
      }, this.props.children));
    }
  }]);

  return Info;
}(React.Component)) || _class$g) || _class$g;

var Label = autoBindMethods(_class2$8 = mobxReact.observer(_class2$8 = /*#__PURE__*/function (_Component2) {
  _inherits(Label, _Component2);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, _getPrototypeOf(Label).apply(this, arguments));
  }

  _createClass(Label, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          format = _this$props2.format,
          colon = format === null || format === void 0 ? void 0 : format.colon,
          layout = format === null || format === void 0 ? void 0 : format.layout,
          infoLabelClassName = "".concat(CLASS_PREFIX, "-info-label"),
          labelClassName = cx(className, infoLabelClassName, formatClassNames(infoLabelClassName, colon, layout));
      return /*#__PURE__*/React__default.createElement("div", {
        className: labelClassName
      }, /*#__PURE__*/React__default.createElement("label", null, this.props.children));
    }
  }]);

  return Label;
}(React.Component)) || _class2$8) || _class2$8;

var Value = autoBindMethods(_class3$2 = mobxReact.observer(_class3$2 = /*#__PURE__*/function (_Component3) {
  _inherits(Value, _Component3);

  function Value() {
    _classCallCheck(this, Value);

    return _possibleConstructorReturn(this, _getPrototypeOf(Value).apply(this, arguments));
  }

  _createClass(Value, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement("div", {
        className: cx(this.props.className, "".concat(CLASS_PREFIX, "-info-value"))
      }, this.props.children);
    }
  }]);

  return Value;
}(React.Component)) || _class3$2) || _class3$2;

var _class$h, _class2$9, _class3$3, _temp$7;

var CardField = autoBindMethods(_class$h = mobxReact.observer(_class$h = (_class2$9 = (_temp$7 = _class3$3 = /*#__PURE__*/function (_Component) {
  _inherits(CardField, _Component);

  function CardField() {
    _classCallCheck(this, CardField);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardField).apply(this, arguments));
  }

  _createClass(CardField, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          passDownProps = _objectWithoutProperties(_this$props, ["model"]),
          fieldConfig = this.fieldConfig;

      if (filterFieldConfig(fieldConfig, {
        model: model,
        writeOnly: true
      })) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(Info, {
        fieldConfig: fieldConfig,
        format: passDownProps
      }, fieldConfig.showLabel && /*#__PURE__*/React__default.createElement(Label, {
        format: passDownProps
      }, renderLabel(fieldConfig)), /*#__PURE__*/React__default.createElement(Value, null, renderValue(fieldConfig, model)));
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return fillInFieldConfig(this.props.fieldConfig);
    }
  }]);

  return CardField;
}(React.Component), _class3$3.defaultProps = _objectSpread2({}, sharedComponentPropsDefaults), _temp$7), (_applyDecoratedDescriptor(_class2$9.prototype, "fieldConfig", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$9.prototype, "fieldConfig"), _class2$9.prototype)), _class2$9)) || _class$h) || _class$h;

var _class$i, _class2$a;

var FormField = autoBindMethods(_class$i = mobxReact.observer(_class$i = (_class2$a = /*#__PURE__*/function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormField).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: "render",
    value: function render() {
      if (!this.shouldRender) {
        return null;
      }

      var _this$props = this.props,
          formManager = _this$props.formManager,
          formModel = _this$props.formModel,
          passDownProps = _objectWithoutProperties(_this$props, ["formManager", "formModel"]),
          _this$fieldConfig = this.fieldConfig,
          skipFieldDecorator = _this$fieldConfig.skipFieldDecorator,
          EditComponent = _this$fieldConfig.editComponent;

      if (skipFieldDecorator) {
        return /*#__PURE__*/React__default.createElement(EditComponent, this.editProps);
      }

      return /*#__PURE__*/React__default.createElement(FormItem, _extends({}, passDownProps, {
        fieldConfig: this.fieldConfig,
        formManager: formManager,
        formModel: formModel
      }), /*#__PURE__*/React__default.createElement(EditComponent, this.editProps));
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return fillInFieldConfig(this.props.fieldConfig);
    }
  }, {
    key: "editProps",
    get: function get() {
      var _this$props2 = this.props,
          formManager = _this$props2.formManager,
          formModel = _this$props2.formModel,
          fieldConfig = this.fieldConfig,
          fieldConfigProp = fieldConfig.fieldConfigProp ? {
        fieldConfig: fieldConfig,
        formManager: formManager,
        formModel: formModel
      } : {},
          disabled = fieldConfig.disabled || formManager.isFormDisabled;
      return _objectSpread2({
        disabled: disabled,
        id: fieldConfig.field
      }, fieldConfig.editProps, {}, fieldConfigProp);
    }
  }, {
    key: "shouldRender",
    get: function get() {
      var formModel = this.props.formModel;
      return !filterFieldConfig(this.fieldConfig, {
        model: formModel,
        readOnly: true
      });
    }
  }]);

  return FormField;
}(React.Component), (_applyDecoratedDescriptor(_class2$a.prototype, "fieldConfig", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$a.prototype, "fieldConfig"), _class2$a.prototype)), _class2$a)) || _class$i) || _class$i;

var _class$j;

var Legend = autoBindMethods(_class$j = mobxReact.observer(_class$j = /*#__PURE__*/function (_Component) {
  _inherits(Legend, _Component);

  function Legend() {
    _classCallCheck(this, Legend);

    return _possibleConstructorReturn(this, _getPrototypeOf(Legend).apply(this, arguments));
  }

  _createClass(Legend, [{
    key: "render",
    value: function render() {
      var fieldSet = this.props.fieldSet;

      if (isPartialFieldSetSimple(fieldSet)) {
        return null;
      }

      var legend = fieldSet.legend,
          tooltip = fieldSet.tooltip;

      if (!legend) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(antd.Col, {
        span: ANT_FULL_COL_WIDTH
      }, /*#__PURE__*/React__default.createElement("h3", null, /*#__PURE__*/React__default.createElement(WithTooltip, {
        tooltip: tooltip
      }, legend)));
    }
  }]);

  return Legend;
}(React.Component)) || _class$j) || _class$j;

var _class$k, _class2$b, _temp$8;
var CLASS_NAME$4 = "".concat(CLASS_PREFIX, "-field-set");

var FieldSet = autoBindMethods(_class$k = mobxReact.observer(_class$k = (_temp$8 = _class2$b = /*#__PURE__*/function (_Component) {
  _inherits(FieldSet, _Component);

  function FieldSet() {
    _classCallCheck(this, FieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(FieldSet).apply(this, arguments));
  }

  _createClass(FieldSet, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          fieldSet = _this$props.fieldSet,
          layout = _this$props.layout,
          rowProps = !isPartialFieldSetSimple(fieldSet) && fieldSet.rowProps;
      return /*#__PURE__*/React__default.createElement("div", {
        className: cx(CLASS_NAME$4, className)
      }, /*#__PURE__*/React__default.createElement(antd.Row, _extends({}, rowProps, {
        className: "".concat(CLASS_NAME$4, "-row-").concat(layout)
      }), /*#__PURE__*/React__default.createElement(Legend, {
        fieldSet: fieldSet
      }), this.props.children));
    }
  }]);

  return FieldSet;
}(React.Component), _class2$b.defaultProps = _objectSpread2({}, sharedComponentPropsDefaults), _temp$8)) || _class$k) || _class$k;

var _class$l, _class2$c;

var FormFieldSet = autoBindMethods(_class$l = mobxReact.observer(_class$l = (_class2$c = /*#__PURE__*/function (_Component) {
  _inherits(FormFieldSet, _Component);

  function FormFieldSet() {
    _classCallCheck(this, FormFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormFieldSet).apply(this, arguments));
  }

  _createClass(FormFieldSet, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          formModel = _this$props.formModel,
          fieldSet = _this$props.fieldSet,
          formManager = _this$props.formManager,
          passDownProps = _objectWithoutProperties(_this$props, ["formModel", "fieldSet", "formManager"]),
          fieldConfigs = getFieldSetFields(this.fieldSet),
          filteredFieldConfigs = filterFieldConfigs(fieldConfigs, {
        model: formModel,
        readOnly: true
      });

      if (!filteredFieldConfigs.length) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(FieldSet, _extends({
        fieldSet: fieldSet
      }, passDownProps), filteredFieldConfigs.map(function (fieldConfig) {
        return /*#__PURE__*/React__default.createElement(FormField, _extends({
          fieldConfig: fieldConfig,
          formManager: formManager,
          formModel: formModel,
          key: fieldConfig.field
        }, passDownProps));
      }));
    }
  }, {
    key: "fieldSet",
    get: function get() {
      return fillInFieldSet(this.props.fieldSet);
    }
  }]);

  return FormFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$c.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$c.prototype, "fieldSet"), _class2$c.prototype)), _class2$c)) || _class$l) || _class$l;

var _class$m, _temp$9;

var GuardedButton = autoBindMethods(_class$m = mobxReact.observer(_class$m = (_temp$9 = /*#__PURE__*/function (_Component) {
  _inherits(GuardedButton, _Component);

  function GuardedButton(props) {
    var _this;

    _classCallCheck(this, GuardedButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GuardedButton).call(this, props));
    _this.guardedContainer = void 0;
    var isGuarded = _this.props.isGuarded,
        disabledComponent = utils.createDisabledContainer(antd.Button);
    _this.guardedContainer = utils.createGuardedContainer({
      disabledComponent: disabledComponent,
      enabledComponent: antd.Button,
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
        return /*#__PURE__*/React__default.createElement(antd.Popconfirm, {
          title: "Are you sure?",
          onConfirm: this.props.onClick
        }, /*#__PURE__*/React__default.createElement(GuardedContainer, lodash.omit(this.props, omitProps)));
      }

      return /*#__PURE__*/React__default.createElement(GuardedContainer, lodash.omit(this.props, omitProps));
    }
  }]);

  return GuardedButton;
}(React.Component), _temp$9)) || _class$m) || _class$m;

var _class$n, _class2$d;

var NestedFieldSet = autoBindMethods(_class$n = mobxReact.observer(_class$n = (_class2$d = /*#__PURE__*/function (_Component) {
  _inherits(NestedFieldSet, _Component);

  function NestedFieldSet() {
    _classCallCheck(this, NestedFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(NestedFieldSet).apply(this, arguments));
  }

  _createClass(NestedFieldSet, [{
    key: "fieldValueMapper",
    value: function fieldValueMapper(fieldConfig) {
      var id = this.props.id,
          field = "".concat(id, ".").concat(fieldConfig.field);
      return _objectSpread2({}, fieldConfig, {
        field: field,
        name: field.split('.')
      }, this.getDefaultValue(fieldConfig));
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue(fieldConfig) {
      /*
      This function implements the fieldConfig features
      populateFromSearch and populateNameFromSearch
      */
      var search = this.props.search,
          _splitName = utils.splitName(search),
          _splitName2 = _slicedToArray(_splitName, 2),
          firstName = _splitName2[0],
          lastName = _splitName2[1];

      if (!search) {
        return {};
      }

      var field = fieldConfig.field,
          populateFromSearch = fieldConfig.populateFromSearch,
          populateNameFromSearch = fieldConfig.populateNameFromSearch;

      if (populateFromSearch) {
        return {
          value: search
        };
      }

      if (populateNameFromSearch && field.endsWith('first_name')) {
        return {
          value: firstName
        };
      }

      if (populateNameFromSearch && field.endsWith('last_name')) {
        return {
          value: lastName
        };
      } // Keep add new form from populating with model data


      return {
        value: ''
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(FormFieldSet, {
        fieldSet: this.fieldSet,
        formManager: this.props.formManager,
        formModel: this.props.formModel
      });
    }
  }, {
    key: "fieldSet",
    get: function get() {
      var fieldSet = this.props.fieldSet;
      return mapFieldSetFields(fillInFieldSet(fieldSet), this.fieldValueMapper);
    }
  }]);

  return NestedFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$d.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$d.prototype, "fieldSet"), _class2$d.prototype)), _class2$d)) || _class$n) || _class$n;

var _class$o, _class2$e;

var CardFieldSet = autoBindMethods(_class$o = mobxReact.observer(_class$o = (_class2$e = /*#__PURE__*/function (_Component) {
  _inherits(CardFieldSet, _Component);

  function CardFieldSet() {
    _classCallCheck(this, CardFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(CardFieldSet).apply(this, arguments));
  }

  _createClass(CardFieldSet, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          model = _this$props.model,
          fieldSet = _this$props.fieldSet,
          passDownProps = _objectWithoutProperties(_this$props, ["model", "fieldSet"]),
          fieldConfigs = getFieldSetFields(this.fieldSet),
          filteredFieldConfigs = filterFieldConfigs(fieldConfigs, {
        model: model,
        writeOnly: true
      });

      if (!filteredFieldConfigs.length) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(FieldSet, _extends({
        fieldSet: fieldSet
      }, passDownProps), filteredFieldConfigs.map(function (fieldConfig) {
        return /*#__PURE__*/React__default.createElement(CardField, _extends({}, passDownProps, {
          fieldConfig: fieldConfig,
          key: fieldConfig.field,
          model: model
        }));
      }));
    }
  }, {
    key: "fieldSet",
    get: function get() {
      return fillInFieldSet(this.props.fieldSet);
    }
  }]);

  return CardFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$e.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$e.prototype, "fieldSet"), _class2$e.prototype)), _class2$e)) || _class$o) || _class$o;

var _class$p, _class2$f, _class3$4, _temp$a;
var CLASS_NAME$5 = "".concat(CLASS_PREFIX, "-card");

var Card = autoBindMethods(_class$p = mobxReact.observer(_class$p = (_class2$f = (_temp$a = _class3$4 = /*#__PURE__*/function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          bordered = _this$props.bordered,
          className = _this$props.className,
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          isLoading = _this$props.isLoading,
          model = _this$props.model,
          passDownProps = _objectWithoutProperties(_this$props, ["bordered", "className", "title", "renderTopRight", "isLoading", "model"]),
          filteredFieldSets = filterFieldSets(this.fieldSets, {
        model: model,
        writeOnly: true
      });

      return /*#__PURE__*/React__default.createElement(antd.Card, {
        bordered: bordered,
        className: cx(CLASS_NAME$5, className),
        extra: renderTopRight && renderTopRight(),
        loading: isLoading,
        title: title
      }, filteredFieldSets.map(function (fieldSet, idx) {
        return /*#__PURE__*/React__default.createElement(CardFieldSet, _extends({}, passDownProps, {
          fieldSet: fieldSet,
          key: idx,
          model: model
        }));
      }), this.props.children);
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return Card;
}(React.Component), _class3$4.defaultProps = _objectSpread2({}, cardPropsDefaults), _temp$a), (_applyDecoratedDescriptor(_class2$f.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$f.prototype, "fieldSets"), _class2$f.prototype)), _class2$f)) || _class$p) || _class$p;

var _class$q;

var ArrayCard = autoBindMethods(_class$q = mobxReact.observer(_class$q = /*#__PURE__*/function (_Component) {
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
          classNameSuffix = _this$props.classNameSuffix,
          passDownProps = _objectWithoutProperties(_this$props, ["title", "renderTopRight", "isLoading", "model", "fieldSets", "classNameSuffix"]);

      return /*#__PURE__*/React__default.createElement(antd.Card, {
        title: title,
        extra: renderTopRight && renderTopRight(),
        loading: isLoading
      }, lodash.isEmpty(model) && /*#__PURE__*/React__default.createElement("p", {
        className: "empty-message"
      }, "No records"), model.map(function (modelItem) {
        return /*#__PURE__*/React__default.createElement(Card, _extends({}, passDownProps, {
          classNameSuffix: classNameSuffix,
          fieldSets: fieldSets,
          key: modelItem.id,
          model: modelItem,
          title: ""
        }));
      }));
    }
  }]);

  return ArrayCard;
}(React.Component)) || _class$q) || _class$q;

var _class$r, _class2$g, _temp$b;

var CLASS_NAME$6 = "".concat(CLASS_PREFIX, "-form"),
    DEFAULT_PROPS = _objectSpread2({}, formPropsDefaults, {}, sharedComponentPropsDefaults, {
  showControls: true
});

var UnwrappedForm = autoBindMethods(_class$r = mobxReact.observer(_class$r = (_class2$g = (_temp$b = /*#__PURE__*/function (_Component) {
  _inherits(UnwrappedForm, _Component);

  function UnwrappedForm(props) {
    var _this;

    _classCallCheck(this, UnwrappedForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnwrappedForm).call(this, props));
    _this.formManager = void 0;
    var defaults = props.defaults,
        model = props.model,
        onSave = props.onSave,
        processErrors = props.processErrors,
        resetOnSuccess = props.resetOnSuccess,
        setRefFormManager = props.setRefFormManager,
        successText = props.successText;
    _this.formManager = new FormManager(_assertThisInitialized(_this), _this.fieldSets, {
      defaults: defaults,
      model: model,
      onSave: onSave,
      onSuccess: _this.onSuccess,
      processErrors: processErrors,
      resetOnSuccess: resetOnSuccess,
      successText: successText
    });

    if (setRefFormManager) {
      setRefFormManager(_this.formManager);
    }

    return _this;
  }

  _createClass(UnwrappedForm, [{
    key: "onSuccess",
    value: function () {
      var _onSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var onSuccess;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onSuccess = this.props.onSuccess;

                if (!onSuccess) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return onSuccess();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSuccess() {
        return _onSuccess.apply(this, arguments);
      }

      return onSuccess;
    }()
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this$props = this.props,
          blockSubmit = _this$props.blockSubmit,
          cancelText = _this$props.cancelText,
          onCancel = _this$props.onCancel,
          saveText = _this$props.saveText,
          _this$formManager = this.formManager,
          isSaving = _this$formManager.isSaving,
          isSubmitButtonDisabled = _this$formManager.isSubmitButtonDisabled,
          submitProps = {
        children: isSaving ? 'Saving...' : saveText,
        disabled: isSubmitButtonDisabled,
        htmlType: 'submit',
        loading: isSaving,
        size: 'large',
        type: 'primary'
      };

      if (blockSubmit) {
        return /*#__PURE__*/React__default.createElement(antd.Button, _extends({
          block: true
        }, submitProps));
      }

      return /*#__PURE__*/React__default.createElement(ButtonToolbar, {
        align: "right",
        noSpacing: true
      }, onCancel && /*#__PURE__*/React__default.createElement(antd.Button, {
        disabled: this.formManager.isCancelButtonDisabled,
        onClick: onCancel,
        size: "large"
      }, cancelText), /*#__PURE__*/React__default.createElement(antd.Button, submitProps));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          showControls = _this$props2.showControls,
          title = _this$props2.title,
          layout = _this$props2.layout,
          colon = _this$props2.colon,
          form = _this$props2.form,
          formModel = this.formManager.formModel,
          filteredFieldSets = filterFieldSets(this.fieldSets, {
        model: formModel
      }),
          className = cx(CLASS_NAME$6, this.props.className, formatClassNames(CLASS_NAME$6, colon, layout)),
          passDownProps = {
        layout: layout,
        colon: colon
      };
      return /*#__PURE__*/React__default.createElement(antd.Form, {
        className: className,
        colon: colon,
        form: form,
        layout: layout,
        onFieldsChange: this.formManager.onFieldsChange,
        onFinish: this.formManager.onFinish
      }, title && /*#__PURE__*/React__default.createElement("h2", null, title), filteredFieldSets.map(function (fieldSet, idx) {
        return /*#__PURE__*/React__default.createElement(FormFieldSet, _extends({
          fieldSet: fieldSet,
          formManager: _this2.formManager,
          formModel: formModel,
          key: idx
        }, passDownProps));
      }), this.props.children, showControls && this.renderControls());
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return UnwrappedForm;
}(React.Component), _temp$b), (_applyDecoratedDescriptor(_class2$g.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$g.prototype, "fieldSets"), _class2$g.prototype)), _class2$g)) || _class$r) || _class$r;

function Form(props) {
  var _AntForm$useForm = antd.Form.useForm(),
      _AntForm$useForm2 = _slicedToArray(_AntForm$useForm, 1),
      form = _AntForm$useForm2[0];

  return /*#__PURE__*/React__default.createElement(UnwrappedForm, _extends({}, props, {
    form: form
  }));
}

Form.defaultProps = DEFAULT_PROPS;

var _class$s, _class2$h, _temp$c;
var FormCard = autoBindMethods(_class$s = mobxReact.observer(_class$s = (_temp$c = _class2$h = /*#__PURE__*/function (_Component) {
  _inherits(FormCard, _Component);

  function FormCard() {
    _classCallCheck(this, FormCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormCard).apply(this, arguments));
  }

  _createClass(FormCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          bordered = _this$props.bordered,
          className = _this$props.className,
          isLoading = _this$props.isLoading,
          cardClassName = cx("".concat(CLASS_PREFIX, "-card"), className),
          _this$props2 = this.props,
          title = _this$props2.title,
          renderTopRight = _this$props2.renderTopRight,
          passDownProps = _objectWithoutProperties(_this$props2, ["title", "renderTopRight"]);

      return /*#__PURE__*/React__default.createElement(antd.Card, {
        bordered: bordered,
        className: cardClassName,
        loading: isLoading,
        title: title,
        extra: renderTopRight && renderTopRight()
      }, /*#__PURE__*/React__default.createElement(Form, passDownProps));
    }
  }]);

  return FormCard;
}(React.Component), _class2$h.defaultProps = _objectSpread2({}, formPropsDefaults, {}, cardPropsDefaults), _temp$c)) || _class$s) || _class$s;

var _class$t, _class2$i, _descriptor$4, _descriptor2$3, _class3$5, _temp$d;

var EditableCard = autoBindMethods(_class$t = mobxReact.observer(_class$t = (_class2$i = (_temp$d = _class3$5 = /*#__PURE__*/function (_Component) {
  _inherits(EditableCard, _Component);

  function EditableCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isDeleting", _descriptor$4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isEditing", _descriptor2$3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EditableCard, [{
    key: "handleDelete",
    value: function () {
      var _handleDelete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$props, model, onDelete, onSuccess;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, model = _this$props.model, onDelete = _this$props.onDelete, onSuccess = _this$props.onSuccess; // istanbul ignore next

                if (onDelete) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                this.isDeleting.set(true);
                _context.prev = 4;
                _context.next = 7;
                return onDelete(model);

              case 7:
                if (!onSuccess) {
                  _context.next = 10;
                  break;
                }

                _context.next = 10;
                return onSuccess();

              case 10:
                _context.prev = 10;
                this.isDeleting.set(false);
                return _context.finish(10);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4,, 10, 13]]);
      }));

      function handleDelete() {
        return _handleDelete.apply(this, arguments);
      }

      return handleDelete;
    }()
  }, {
    key: "handleSave",
    value: function () {
      var _handleSave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(model) {
        var _this$props2, onSuccess, onSave;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = this.props, onSuccess = _this$props2.onSuccess, onSave = _this$props2.onSave;
                _context2.next = 3;
                return onSave(model);

              case 3:
                if (!onSuccess) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 6;
                return onSuccess();

              case 6:
                this.isEditing.setFalse();

              case 7:
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
      return /*#__PURE__*/React__default.createElement(ButtonToolbar, {
        noSpacing: true
      }, this.deleteButton, this.editButton);
    }
  }, {
    key: "render",
    value: function render() {
      var ModalComponent = this.props.ModalComponent;

      if (this.isEditing.isTrue && !ModalComponent) {
        return /*#__PURE__*/React__default.createElement(FormCard, _extends({}, this.props, {
          onCancel: this.isEditing.setFalse,
          onSave: this.handleSave,
          renderTopRight: this.buttons
        }));
      }

      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, ModalComponent && /*#__PURE__*/React__default.createElement(ModalComponent, _extends({}, this.props, {
        isVisible: this.isEditing,
        onSave: this.handleSave
      })), /*#__PURE__*/React__default.createElement(Card, _extends({}, this.props, {
        renderTopRight: this.buttons
      })));
    }
  }, {
    key: "deleteButton",
    get: function get() {
      var _this$props3 = this.props,
          isGuarded = _this$props3.isGuarded,
          classNameSuffix = _this$props3.classNameSuffix,
          onDelete = _this$props3.onDelete,
          isLoading = _this$props3.isLoading,
          title = _this$props3.title,
          className = getBtnClassName('delete', classNameSuffix, title);

      if (!onDelete) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(GuardedButton, {
        className: className,
        confirm: true,
        disabled: isLoading || this.isDeleting.isTrue,
        icon: /*#__PURE__*/React__default.createElement(DeleteOutlined$2, null),
        isGuarded: isGuarded,
        onClick: this.handleDelete,
        size: "small",
        type: "danger"
      }, "Delete");
    }
  }, {
    key: "editButton",
    get: function get() {
      var _this$props4 = this.props,
          isLoading = _this$props4.isLoading,
          isGuarded = _this$props4.isGuarded,
          classNameSuffix = _this$props4.classNameSuffix,
          title = _this$props4.title,
          className = getBtnClassName('edit', classNameSuffix, title);
      return /*#__PURE__*/React__default.createElement(GuardedButton, {
        className: className,
        disabled: isLoading || this.isEditing.isTrue || this.isDeleting.isTrue,
        icon: /*#__PURE__*/React__default.createElement(EditOutlined$2, null),
        isGuarded: isGuarded,
        onClick: this.isEditing.setTrue,
        size: "small",
        type: "primary"
      }, "Edit");
    }
  }]);

  return EditableCard;
}(React.Component), _class3$5.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$d), (_descriptor$4 = _applyDecoratedDescriptor(_class2$i.prototype, "isDeleting", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$3 = _applyDecoratedDescriptor(_class2$i.prototype, "isEditing", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$i)) || _class$t) || _class$t;

var _class$u, _class2$j, _descriptor$5, _class3$6, _temp$e;

var EditableArrayCard = autoBindMethods(_class$u = mobxReact.observer(_class$u = (_class2$j = (_temp$e = _class3$6 = /*#__PURE__*/function (_Component) {
  _inherits(EditableArrayCard, _Component);

  function EditableArrayCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditableArrayCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditableArrayCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EditableArrayCard, [{
    key: "handleSaveNew",
    value: function () {
      var _handleSaveNew = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model) {
        var _this$props, onCreate, onSuccess;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, onCreate = _this$props.onCreate, onSuccess = _this$props.onSuccess;
                _context.next = 3;
                return onCreate(model);

              case 3:
                if (!onSuccess) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return onSuccess();

              case 6:
                this.isAddingNew.setFalse();

              case 7:
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
          isLoading = _this$props2.isLoading,
          isGuarded = _this$props2.isGuarded,
          classNameSuffix = _this$props2.classNameSuffix,
          title = _this$props2.title,
          className = getBtnClassName('new', classNameSuffix, title);
      return /*#__PURE__*/React__default.createElement(GuardedButton, {
        className: className,
        disabled: isLoading || this.isAddingNew.isTrue,
        icon: /*#__PURE__*/React__default.createElement(PlusOutlined$2, null),
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
          classNameSuffix = _this$props3.classNameSuffix,
          defaults = _this$props3.defaults,
          fieldSets = _this$props3.fieldSets,
          isLoading = _this$props3.isLoading,
          model = _this$props3.model,
          onDelete = _this$props3.onDelete,
          onSave = _this$props3.onSave,
          onSuccess = _this$props3.onSuccess,
          title = _this$props3.title,
          passDownProps = _objectWithoutProperties(_this$props3, ["classNameSuffix", "defaults", "fieldSets", "isLoading", "model", "onDelete", "onSave", "onSuccess", "title"]);

      return /*#__PURE__*/React__default.createElement(antd.Card, {
        title: title,
        extra: this.renderAddNew(),
        loading: isLoading
      }, this.isAddingNew.isTrue && /*#__PURE__*/React__default.createElement(FormCard, {
        defaults: defaults,
        fieldSets: fieldSets,
        onCancel: this.isAddingNew.setFalse,
        onSave: this.handleSaveNew,
        title: "New ".concat(title)
      }), lodash.isEmpty(model) && !this.isAddingNew.isTrue && /*#__PURE__*/React__default.createElement("p", {
        className: "empty-message"
      }, "No records"), model.map(function (modelItem) {
        return /*#__PURE__*/React__default.createElement(EditableCard, _extends({}, passDownProps, {
          classNameSuffix: classNameSuffix,
          fieldSets: fieldSets,
          key: modelItem.id,
          model: modelItem,
          onDelete: onDelete,
          onSave: onSave,
          onSuccess: onSuccess,
          title: ""
        }));
      }));
    }
  }]);

  return EditableArrayCard;
}(React.Component), _class3$6.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$e), (_descriptor$5 = _applyDecoratedDescriptor(_class2$j.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$j)) || _class$u) || _class$u;

var _class$v, _class2$k, _temp$f;
var CLASS_NAME$7 = "".concat(CLASS_PREFIX, "-form-drawer");

var FormDrawer = autoBindMethods(_class$v = mobxReact.observer(_class$v = (_temp$f = _class2$k = /*#__PURE__*/function (_Component) {
  _inherits(FormDrawer, _Component);

  function FormDrawer() {
    _classCallCheck(this, FormDrawer);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormDrawer).apply(this, arguments));
  }

  _createClass(FormDrawer, [{
    key: "onCancel",
    value: function onCancel() {
      var _this$props = this.props,
          onCancel = _this$props.onCancel,
          isVisible = _this$props.isVisible;

      if (onCancel) {
        onCancel();
      }

      if (isVisible && !onCancel) {
        isVisible.setFalse();
      }
    }
  }, {
    key: "onSuccess",
    value: function () {
      var _onSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$props2, onSuccess, isVisible;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, onSuccess = _this$props2.onSuccess, isVisible = _this$props2.isVisible;

                if (!onSuccess) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return onSuccess();

              case 4:
                if (isVisible && !onSuccess) {
                  isVisible.setFalse();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSuccess() {
        return _onSuccess.apply(this, arguments);
      }

      return onSuccess;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          title = _this$props3.title,
          width = _this$props3.width,
          className = cx(CLASS_NAME$7, this.props.className);

      if (!this.isVisible) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(antd.Drawer, {
        className: className,
        closable: true,
        destroyOnClose: true,
        maskClosable: false,
        onClose: this.onCancel,
        placement: "right",
        title: title,
        visible: true,
        width: width || '600px'
      }, this.props.childrenBefore, /*#__PURE__*/React__default.createElement(Form, _extends({}, this.formProps, {
        onCancel: this.onCancel,
        onSuccess: this.onSuccess
      })));
    }
  }, {
    key: "isVisible",
    get: function get() {
      var isVisible = this.props.isVisible;
      return isVisible ? isVisible.isTrue : true;
    }
  }, {
    key: "formProps",
    get: function get() {
      var _this$props4 = this.props,
          _title = _this$props4.title,
          _isVisible = _this$props4.isVisible,
          _childrenBefore = _this$props4.childrenBefore,
          formProps = _objectWithoutProperties(_this$props4, ["title", "isVisible", "childrenBefore"]);

      return formProps;
    }
  }]);

  return FormDrawer;
}(React.Component), _class2$k.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$f)) || _class$v) || _class$v;

var _class$w, _class2$l, _descriptor$6, _class3$7, _temp$g;
var CLASS_NAME$8 = "".concat(CLASS_PREFIX, "-form-modal");

var FormModal = autoBindMethods(_class$w = mobxReact.observer(_class$w = (_class2$l = (_temp$g = _class3$7 = /*#__PURE__*/function (_Component) {
  _inherits(FormModal, _Component);

  function FormModal(props) {
    var _this;

    _classCallCheck(this, FormModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormModal).call(this, props));

    _initializerDefineProperty(_this, "formManager", _descriptor$6, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(FormModal, [{
    key: "onCancel",
    value: function onCancel() {
      var _this$props = this.props,
          onCancel = _this$props.onCancel,
          isVisible = _this$props.isVisible;

      if (onCancel) {
        onCancel();
      }

      if (isVisible && !onCancel) {
        isVisible.setFalse();
      }
    }
  }, {
    key: "onSuccess",
    value: function () {
      var _onSuccess = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$props2, onSuccess, isVisible;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, onSuccess = _this$props2.onSuccess, isVisible = _this$props2.isVisible;

                if (!onSuccess) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return onSuccess();

              case 4:
                if (isVisible && !onSuccess) {
                  isVisible.setFalse();
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSuccess() {
        return _onSuccess.apply(this, arguments);
      }

      return onSuccess;
    }()
  }, {
    key: "setRefFormManager",
    value: function setRefFormManager(formManager) {
      var setRefFormManager = this.props.setRefFormManager;
      this.formManager = formManager;

      if (setRefFormManager) {
        setRefFormManager(formManager);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          title = _this$props3.title,
          width = _this$props3.width;

      if (!this.isVisible) {
        return null;
      }

      return /*#__PURE__*/React__default.createElement(antd.Modal, _extends({
        onCancel: this.onCancel,
        title: title,
        visible: true,
        width: width
      }, this.modalProps), this.props.childrenBefore, /*#__PURE__*/React__default.createElement(Form, _extends({}, this.formProps, {
        onCancel: this.onCancel,
        onSuccess: this.onSuccess,
        setRefFormManager: this.setRefFormManager,
        showControls: false
      })));
    }
  }, {
    key: "isVisible",
    get: function get() {
      var isVisible = this.props.isVisible;
      return isVisible ? isVisible.isTrue : true;
    }
  }, {
    key: "formProps",
    get: function get() {
      var _this$props4 = this.props,
          _title = _this$props4.title,
          _isVisible = _this$props4.isVisible,
          _childrenBefore = _this$props4.childrenBefore,
          formProps = _objectWithoutProperties(_this$props4, ["title", "isVisible", "childrenBefore"]);

      return formProps;
    }
  }, {
    key: "modalProps",
    get: function get() {
      var _this$props5 = this.props,
          cancelText = _this$props5.cancelText,
          saveText = _this$props5.saveText,
          className = cx(CLASS_NAME$8, this.props.className);

      if (!this.formManager) {
        return {
          cancelButtonProps: {
            disabled: true
          },
          cancelText: cancelText,
          className: className,
          confirmLoading: true,
          okButtonProps: {
            disabled: true
          },
          okText: saveText,
          onOk: lodash.noop
        };
      }

      var _this$formManager = this.formManager,
          isCancelButtonDisabled = _this$formManager.isCancelButtonDisabled,
          isSubmitButtonDisabled = _this$formManager.isSubmitButtonDisabled,
          onFinish = _this$formManager.onFinish,
          isSaving = _this$formManager.isSaving;
      return {
        cancelButtonProps: {
          disabled: isCancelButtonDisabled
        },
        cancelText: cancelText,
        className: className,
        confirmLoading: isSaving,
        okButtonProps: {
          disabled: isSubmitButtonDisabled,
          htmlType: 'submit'
        },
        okText: isSaving ? 'Saving...' : saveText,
        onOk: onFinish
      };
    }
  }]);

  return FormModal;
}(React.Component), _class3$7.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$g), (_descriptor$6 = _applyDecoratedDescriptor(_class2$l.prototype, "formManager", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$l)) || _class$w) || _class$w;

var _class$x, _class2$m, _class3$8, _temp$h;
var CLASS_NAME$9 = "".concat(CLASS_PREFIX, "-summary-card");

var SummaryCard = autoBindMethods(_class$x = mobxReact.observer(_class$x = (_class2$m = (_temp$h = _class3$8 = /*#__PURE__*/function (_Component) {
  _inherits(SummaryCard, _Component);

  function SummaryCard() {
    _classCallCheck(this, SummaryCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(SummaryCard).apply(this, arguments));
  }

  _createClass(SummaryCard, [{
    key: "renderItem",
    value: function renderItem(fieldConfig) {
      var model = this.props.model,
          className = "summary-".concat(lodash.kebabCase(fieldConfig.field));
      return /*#__PURE__*/React__default.createElement(antd.List.Item, {
        key: fieldConfig.field,
        className: className,
        extra: null
      }, /*#__PURE__*/React__default.createElement("h4", null, fieldConfig.label), /*#__PURE__*/React__default.createElement("p", null, renderValue(fieldConfig, model)));
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
      return /*#__PURE__*/React__default.createElement(antd.Card, {
        className: cx(CLASS_NAME$9, className),
        extra: renderTopRight && renderTopRight(),
        loading: isLoading,
        title: title
      }, this.fieldSets.map(function (fieldSet, idx) {
        return /*#__PURE__*/React__default.createElement(antd.List, {
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
}(React.Component), _class3$8.defaultProps = {
  column: 4
}, _temp$h), (_applyDecoratedDescriptor(_class2$m.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$m.prototype, "fieldSets"), _class2$m.prototype)), _class2$m)) || _class$x) || _class$x;

var _class$y, _class2$n;
var CLASS_NAME$a = "".concat(CLASS_PREFIX, "-table");

var Table = autoBindMethods(_class$y = mobxReact.observer(_class$y = (_class2$n = /*#__PURE__*/function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, _getPrototypeOf(Table).apply(this, arguments));
  }

  _createClass(Table, [{
    key: "getTitle",
    value: function getTitle() {
      return this.props.title;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          title = _this$props.title,
          className = _this$props.className,
          passDownProps = _objectWithoutProperties(_this$props, ["isLoading", "title", "className"]);

      return /*#__PURE__*/React__default.createElement(antd.Table, _extends({}, passDownProps, {
        className: cx(CLASS_NAME$a, className),
        columns: this.columns,
        dataSource: this.dataSource,
        loading: isLoading,
        pagination: _objectSpread2({
          hideOnSinglePage: true
        }, this.props.pagination),
        title: title ? this.getTitle : undefined
      }));
    }
  }, {
    key: "columns",
    get: function get() {
      return fieldSetsToColumns(this.props.fieldSets, this.dataSource);
    }
  }, {
    key: "dataSource",
    get: function get() {
      return this.props.model.map(function (item, idx) {
        return _objectSpread2({
          key: item.id || idx.toString()
        }, item);
      });
    }
  }]);

  return Table;
}(React.Component), (_applyDecoratedDescriptor(_class2$n.prototype, "columns", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$n.prototype, "columns"), _class2$n.prototype), _applyDecoratedDescriptor(_class2$n.prototype, "dataSource", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$n.prototype, "dataSource"), _class2$n.prototype)), _class2$n)) || _class$y) || _class$y;

exports.ANT_FULL_COL_WIDTH = ANT_FULL_COL_WIDTH;
exports.ArrayCard = ArrayCard;
exports.ButtonToolbar = ButtonToolbar;
exports.CLASS_PREFIX = CLASS_PREFIX;
exports.Card = Card;
exports.CardField = CardField;
exports.DEFAULT_DEBOUNCE_WAIT = DEFAULT_DEBOUNCE_WAIT;
exports.DEFAULT_STATE_OPTION_TYPE = DEFAULT_STATE_OPTION_TYPE;
exports.Date = Date$1;
exports.EditableArrayCard = EditableArrayCard;
exports.EditableCard = EditableCard;
exports.FieldSet = FieldSet;
exports.Form = Form;
exports.FormCard = FormCard;
exports.FormDrawer = FormDrawer;
exports.FormField = FormField;
exports.FormFieldSet = FormFieldSet;
exports.FormItem = FormItem;
exports.FormManager = FormManager;
exports.FormModal = FormModal;
exports.GuardedButton = GuardedButton;
exports.Hidden = Hidden;
exports.ID_ATTR = ID_ATTR;
exports.Info = Info;
exports.LAYOUT_TYPES = LAYOUT_TYPES;
exports.Label = Label;
exports.NestedFieldSet = NestedFieldSet;
exports.ObjectSearch = ObjectSearch;
exports.ObjectSearchCreate = ObjectSearchCreate;
exports.OptionSelect = OptionSelect;
exports.OptionSelectDisplay = OptionSelectDisplay;
exports.REGEXP_EIN = REGEXP_EIN;
exports.REGEXP_SSN = REGEXP_SSN;
exports.RadioGroup = RadioGroup;
exports.Rate = Rate;
exports.SummaryCard = SummaryCard;
exports.TOAST_DURATION = TOAST_DURATION;
exports.TYPES = TYPES;
exports.Table = Table;
exports.Value = Value;
exports.backendValidation = backendValidation;
exports.booleanToForm = booleanToForm;
exports.cardPropsDefaults = cardPropsDefaults;
exports.falseyToString = falseyToString;
exports.fieldSetsToColumns = fieldSetsToColumns;
exports.fillInFieldConfig = fillInFieldConfig;
exports.fillInFieldSet = fillInFieldSet;
exports.fillInFieldSets = fillInFieldSets;
exports.filterFieldConfig = filterFieldConfig;
exports.filterFieldConfigs = filterFieldConfigs;
exports.filterFieldSet = filterFieldSet;
exports.filterFieldSets = filterFieldSets;
exports.formPropsDefaults = formPropsDefaults;
exports.formatClassNames = formatClassNames;
exports.formatOptionSelect = formatOptionSelect;
exports.formatRating = formatRating;
exports.getBtnClassName = getBtnClassName;
exports.getDateFormatList = getDateFormatList;
exports.getFieldSetFields = getFieldSetFields;
exports.getFieldSetsFields = getFieldSetsFields;
exports.getFieldSuffix = getFieldSuffix;
exports.getOptions = getOptions;
exports.getUnsortedOptions = getUnsortedOptions;
exports.isFieldSetSimple = isFieldSetSimple;
exports.isPartialFieldSetSimple = isPartialFieldSetSimple;
exports.mapFieldSetFields = mapFieldSetFields;
exports.modelFromFieldConfigs = modelFromFieldConfigs;
exports.noopValidator = noopValidator;
exports.renderLabel = renderLabel;
exports.renderValue = renderValue;
exports.setFieldSetFields = setFieldSetFields;
exports.sharedComponentPropsDefaults = sharedComponentPropsDefaults;
exports.unflattenObject = unflattenObject;
