'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var mobxReact = require('mobx-react');
var autoBindMethods = _interopDefault(require('class-autobind-decorator'));
var cx = _interopDefault(require('classnames'));
var Antd = require('antd');
var mobx = require('mobx');
var lodash = require('lodash');
var SmartBool = _interopDefault(require('@mighty-justice/smart-bool'));
var utils = require('@mighty-justice/utils');
var moment = _interopDefault(require('moment'));
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

      return /*#__PURE__*/React__default.createElement(Antd.Form.Item, _extends({}, passDownProps, {
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
    key: "fieldsValidatorToValidator",
    value: function fieldsValidatorToValidator(fieldsValidator, message) {
      var _this = this;

      // This returns a valid rc-form validator.
      // It would be enforced by typing, but their validation interface is basically just anys
      return function (_rule, _value, callback) {
        var _this$props = _this.props,
            formManager = _this$props.formManager,
            fieldConfig = _this$props.fieldConfig,
            model = formManager.formModel,
            value = lodash.get(model, fieldConfig.field),
            valid = fieldsValidator(value, fieldConfig, model);

        if (valid) {
          callback();
        } else {
          callback(message || 'Validation error');
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          formManager = _this$props2.formManager,
          fieldConfig = _this$props2.fieldConfig,
          layout = _this$props2.layout,
          colon = _this$props2.colon,
          colProps = fieldConfig.colProps,
          formItemProps = fieldConfig.formItemProps,
          field = fieldConfig.field,
          className = cx(FORM_ITEM_CLASS_NAME, fieldConfig.className, formItemProps && formItemProps.className, formatClassNames(FORM_ITEM_CLASS_NAME, colon, layout)),
          getFieldDecorator = formManager.form.getFieldDecorator;
      return /*#__PURE__*/React__default.createElement(Antd.Col, colProps, /*#__PURE__*/React__default.createElement(Antd.Form.Item, _extends({}, this.formItemProps, formItemProps, {
        className: className,
        label: renderLabel(fieldConfig)
      }), getFieldDecorator(field, this.decoratorOptions)(this.props.children)));
    }
  }, {
    key: "initialValue",
    get: function get() {
      var _this$props3 = this.props,
          formManager = _this$props3.formManager,
          fieldConfig = _this$props3.fieldConfig;
      return formManager.getDefaultValue(fieldConfig);
    }
  }, {
    key: "rules",
    get: function get() {
      var _this2 = this;

      // Here we take the { [key: string]: formValidationRules } object
      // found in fieldConfig.formValidationRules and return a valid list
      // of rules for rc-form
      return [// Empty validator to ensure backend errors are cleared when field is edited
      {
        validator: noopValidator
      }].concat(_toConsumableArray(lodash.values(this.props.fieldConfig.formValidationRules).map(function (validationRule) {
        // Our own proprietary ( much more sane and powerful ) validation attribute
        // is converted here to the rc-form style validator
        if (validationRule.fieldsValidator) {
          return _objectSpread2({
            validator: _this2.fieldsValidatorToValidator(validationRule.fieldsValidator, validationRule.message)
          }, lodash.omit(validationRule, 'fieldsValidator'));
        } // However, all default rc-form validators will still work as expected


        return validationRule;
      })));
    }
  }, {
    key: "decoratorOptions",
    get: function get() {
      return {
        initialValue: this.initialValue,
        rules: this.rules
      };
    }
  }, {
    key: "formItemProps",
    get: function get() {
      var _this$props4 = this.props,
          fieldConfig = _this$props4.fieldConfig,
          formModel = _this$props4.formModel,
          field = fieldConfig.field,
          formItemRenderExtra = fieldConfig.formItemRenderExtra,
          extraValue = lodash.get(formModel, field);

      if (extraValue && formItemRenderExtra) {
        return {
          extra: formItemRenderExtra(extraValue)
        };
      }

      return {};
    }
  }]);

  return FormItem;
}(React.Component), _class2.defaultProps = _objectSpread2({}, sharedComponentPropsDefaults), _temp)) || _class$1) || _class$1;

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
      return /*#__PURE__*/React__default.createElement(Antd.Col, colProps, /*#__PURE__*/React__default.createElement(Antd.Form.Item, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Select.Option, {
        className: OPTION_KEYS.ADD,
        key: OPTION_KEYS.ADD
      }, /*#__PURE__*/React__default.createElement("div", null, addNewContent || /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Antd.Icon, {
        type: "plus"
      }), " ", /*#__PURE__*/React__default.createElement("b", null, this.search))));
    }
  }, {
    key: "renderNoResultsOption",
    value: function renderNoResultsOption() {
      var selectProps = this.props.selectProps;
      return /*#__PURE__*/React__default.createElement(Antd.Select.Option, {
        className: OPTION_KEYS.EMPTY,
        disabled: true,
        key: OPTION_KEYS.EMPTY
      }, /*#__PURE__*/React__default.createElement("div", null, lodash.get(selectProps, 'notFoundContent') || 'No results'));
    }
  }, {
    key: "renderNoSearchOption",
    value: function renderNoSearchOption() {
      var noSearchContent = this.props.noSearchContent;
      return /*#__PURE__*/React__default.createElement(Antd.Select.Option, {
        className: OPTION_KEYS.NO_SEARCH,
        disabled: true,
        key: OPTION_KEYS.NO_SEARCH
      }, this.isLoading.isTrue ? /*#__PURE__*/React__default.createElement("div", null, this.loadingIcon, " Loading...") : /*#__PURE__*/React__default.createElement("div", null, noSearchContent || 'Type to search or filter'));
    }
  }, {
    key: "renderOption",
    value: function renderOption(option) {
      var _this$fieldConfig2 = this.fieldConfig,
          renderOption = _this$fieldConfig2.renderOption,
          renderSelected = _this$fieldConfig2.renderSelected,
          isOptionDisabled = this.props.isOptionDisabled;
      return /*#__PURE__*/React__default.createElement(Antd.Select.Option, {
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
      var className = this.selectProps.className;
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
      return /*#__PURE__*/React__default.createElement(Antd.Select, _extends({
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
      }, this.valueProp, this.selectProps), showNoSearch && this.renderNoSearchOption(), showAddOption && this.renderAddOption(), this.options.map(this.renderOption), showNoResultsOption && this.renderNoResultsOption());
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
      var mode = this.selectProps.mode;
      return mode && ['multiple', 'tags'].includes(mode);
    }
  }, {
    key: "loadingIcon",
    get: function get() {
      return this.props.loadingIcon || /*#__PURE__*/React__default.createElement(Antd.Icon, {
        type: "loading"
      });
    }
  }, {
    key: "searchIcon",
    get: function get() {
      return this.props.searchIcon || /*#__PURE__*/React__default.createElement(Antd.Icon, {
        type: "search"
      });
    }
  }, {
    key: "selectProps",
    get: function get() {
      // Omitting specific props to avoid unintentional behaviors
      return lodash.omit(this.props.selectProps, ['id', 'loading', 'onBlur', 'onChange', 'onFocus', 'onSearch', 'showSearch']);
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
              label: renderSelected(_value)
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
          label: renderSelected(value)
        }
      };
    }
  }]);

  return ObjectSearch;
}(React.Component), _class3.defaultProps = {
  debounceWait: DEFAULT_DEBOUNCE_WAIT
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
    key: "onAddNew",
    value: function () {
      var _onAddNew = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(search) {
        var _this2 = this;

        var _this$injected, onAddNewToggle, formManager, fieldConfig;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$injected = this.injected, onAddNewToggle = _this$injected.onAddNewToggle, formManager = _this$injected.formManager, fieldConfig = _this$injected.fieldConfig;
                this.search = search;
                formManager.form.setFieldsValue(_defineProperty({}, fieldConfig.field, {}), function () {
                  _this2.isAddingNew.setTrue();

                  if (onAddNewToggle) {
                    onAddNewToggle(true);
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onAddNew(_x) {
        return _onAddNew.apply(this, arguments);
      }

      return onAddNew;
    }()
  }, {
    key: "onSearch",
    value: function () {
      var _onSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this$injected2, onAddNewToggle, formManager, id, fieldConfig;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$injected2 = this.injected, onAddNewToggle = _this$injected2.onAddNewToggle, formManager = _this$injected2.formManager, id = _this$injected2.id, fieldConfig = _this$injected2.fieldConfig;
                formManager.form.setFieldsValue(_defineProperty({}, id, formManager.getDefaultValue(fieldConfig)));
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

      function onSearch() {
        return _onSearch.apply(this, arguments);
      }

      return onSearch;
    }()
  }, {
    key: "renderAddNew",
    value: function renderAddNew() {
      var _this$injected3 = this.injected,
          fieldConfig = _this$injected3.fieldConfig,
          formManager = _this$injected3.formManager;
      return /*#__PURE__*/React__default.createElement(Antd.Col, null, /*#__PURE__*/React__default.createElement(Antd.Form.Item, null, /*#__PURE__*/React__default.createElement(NestedFieldSet, {
        fieldSet: this.fieldConfig.createFields,
        formManager: formManager,
        formModel: formManager.formModel,
        id: fieldConfig.field,
        label: renderLabel(this.fieldConfig),
        search: this.search
      }), /*#__PURE__*/React__default.createElement(Antd.Button, {
        className: CLASS_NAME_BTN_BACK,
        onClick: this.onSearch,
        size: "small"
      }, /*#__PURE__*/React__default.createElement(Antd.Icon, {
        type: "left"
      }), " Back to search")));
    }
  }, {
    key: "renderSearch",
    value: function renderSearch() {
      var _this$injected4 = this.injected,
          fieldConfig = _this$injected4.fieldConfig,
          formManager = _this$injected4.formManager,
          formModel = _this$injected4.formModel;
      return /*#__PURE__*/React__default.createElement(FormItem, {
        fieldConfig: fieldConfig,
        formManager: formManager,
        formModel: formModel
      }, /*#__PURE__*/React__default.createElement(ObjectSearch, _extends({
        onAddNew: this.onAddNew
      }, this.objectSearchProps)));
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
    key: "objectSearchProps",
    get: function get() {
      return lodash.pick(this.props, ['addNewContent', 'debounceWait', 'disabled', 'fieldConfig', 'isOptionDisabled', 'loadingIcon', 'noSearchContent', 'searchIcon', 'searchOnEmpty', 'selectProps']);
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

      return /*#__PURE__*/React__default.createElement("span", null, children, "\xA0", /*#__PURE__*/React__default.createElement(Antd.Tooltip, {
        title: tooltip
      }, /*#__PURE__*/React__default.createElement(Antd.Icon, {
        type: "question-circle-o"
      })));
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

var Date = autoBindMethods(_class$6 = mobxReact.observer(_class$6 = (_temp$3 = /*#__PURE__*/function (_Component) {
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
      }, /*#__PURE__*/React__default.createElement(Antd.Input, _extends({
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
      return /*#__PURE__*/React__default.createElement(Antd.Input.Group, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Select.Option, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Select, _extends({
        allowClear: true,
        optionFilterProp: "children",
        showSearch: this.showSearch
      }, this.props, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Radio.Group, this.props, this.options.map(function (option) {
        return /*#__PURE__*/React__default.createElement(Antd.Radio, {
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
  return value ? /*#__PURE__*/React__default.createElement(Antd.Rate, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Rate, _extends({}, this.props, {
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
          field = _this$injected.fieldConfig.field,
          initialValue = formManager.getDefaultValue(fieldConfig),
          getFieldDecorator = formManager.form.getFieldDecorator,
          HANDLED_PROPS = ['formManager', 'formModel', 'fieldConfig'],
          inputProps = _objectSpread2({}, lodash.omit(this.props, HANDLED_PROPS), {
        type: 'hidden'
      });

      return getFieldDecorator(field, {
        initialValue: initialValue
      })( /*#__PURE__*/React__default.createElement(Antd.Input, inputProps));
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

      return /*#__PURE__*/React__default.createElement(Antd.Tooltip, {
        title: disabled ? disabledText : ''
      }, /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(Antd.Checkbox, checkboxProps, description || '')));
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
      return /*#__PURE__*/React__default.createElement(Antd.Input, _extends({
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
    editComponent: Date,
    formValidationRules: {
      isValidDate: {
        fieldsValidator: utils.isValidDate,
        message: 'Must be a valid date'
      }
    },
    nullify: true,
    render: passRenderOnlyValue(utils.formatDate)
  },
  datepicker: {
    editComponent: Antd.DatePicker,
    editProps: {
      format: dateFormatList
    },
    fromForm: function fromForm(value) {
      return value ? dateFns.format(value, 'YYYY-MM-DD') : '';
    },
    nullify: true,
    render: passRenderOnlyValue(utils.formatDate),
    toForm: function toForm(value) {
      return (value || null) && moment(value);
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
    editComponent: Antd.Input,
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
    editComponent: Antd.Input,
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
    editComponent: Antd.Input.Password,
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
    editComponent: Antd.Input,
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
    editComponent: Antd.Input,
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
    editComponent: Antd.Input.TextArea,
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
  editComponent: Antd.Input,
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
      message: "Required - Please input a valid ".concat(label || 'value'),
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
    formValidationRules: _objectSpread2({}, fieldConfig.formValidationRules, {}, TYPES[type].formValidationRules, {}, requiredValidationRule)
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
      filterInsertIf = !!(fieldConfig.insertIf && !fieldConfig.insertIf(model)),
      filterReadOnly = !!(lodash.isBoolean(readOnly) && readOnly === fieldConfig.readOnly),
      filterWriteOnly = !!(lodash.isBoolean(writeOnly) && writeOnly === fieldConfig.writeOnly);
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
      dataIndex: fieldConfig.field,
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
function noopValidator(_rule, _value, callback) {
  // Useful for clearing manually-set backend validation errors
  callback();
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

var _class$f, _class2$7, _descriptor$3, _temp$6;
var ERROR_WITH_DESCRIPTION = [httpStatus.BAD_REQUEST, httpStatus.FORBIDDEN];
var toastError = {
  description: '',
  duration: TOAST_DURATION,
  message: 'Error submitting form'
};

var FormManager = autoBindMethods(_class$f = (_class2$7 = (_temp$6 = /*#__PURE__*/function () {
  function FormManager(formWrappedInstance, fieldSets, args) {
    _classCallCheck(this, FormManager);

    _initializerDefineProperty(this, "isSaving", _descriptor$3, this);

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
    key: "onSuccess",
    value: function onSuccess() {
      var _this$args2 = this.args,
          onSuccess = _this$args2.onSuccess,
          successText = _this$args2.successText;

      if (successText) {
        Antd.notification.success({
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
      var formValues = this.formValues;
      this.form.setFields(lodash.mapValues(errors, function (error, field) {
        return {
          errors: [new Error(error)],
          value: lodash.get(formValues, field)
        };
      }));
    }
  }, {
    key: "notifyUserAboutErrors",
    value: function notifyUserAboutErrors(errors) {
      errors.forEach(function (_ref) {
        var field = _ref.field,
            message = _ref.message;
        var description = [field, message].filter(function (s) {
          return !!s;
        }).join(' - ');
        Antd.notification.error(_objectSpread2({}, toastError, {
          description: description
        }));
      });
    }
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      var fieldsError = flattenObject(this.form.getFieldsError());
      return Object.keys(fieldsError).some(function (field) {
        return fieldsError[field];
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
    key: "validateThenSaveCallback",
    value: function () {
      var _validateThenSaveCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(errors, _values) {
        var onSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /*
                rc-form validateFields cannot be awaited and takes a callback as input,
                so we have to split the bulk of onSave out into this function to make
                sure we don't try to submit an un-validated form.
                */
                onSave = this.args.onSave;
                this.isSaving = true;

                if (!errors) {
                  _context.next = 5;
                  break;
                }

                this.isSaving = false;
                return _context.abrupt("return");

              case 5:
                _context.prev = 5;
                _context.next = 8;
                return onSave(this.submitModel);

              case 8:
                this.onSuccess();

                if (this.args.resetOnSuccess) {
                  this.form.resetFields();
                }

                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);
                this.handleRequestError(_context.t0);

              case 15:
                _context.prev = 15;
                this.isSaving = false;
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
      var _onSave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();
                this.isSaving = true;
                this.form.validateFields(this.validateThenSaveCallback);

              case 3:
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
      return this.hasErrors() || this.isFormDisabled;
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
      var formModel = {},
          formValues = this.formValues;
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
       This is the finalized form model. We only use it in critical situations like onSubmit
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
      var format = this.props.format,
          layout = format === null || format === void 0 ? void 0 : format.layout,
          rowClassName = "".concat(CLASS_PREFIX, "-info-row-").concat(layout);
      return /*#__PURE__*/React__default.createElement(Antd.Col, _extends({}, this.props.fieldConfig.colProps, {
        className: "".concat(CLASS_PREFIX, "-info")
      }), /*#__PURE__*/React__default.createElement(Antd.Row, {
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
      var _this$props = this.props,
          className = _this$props.className,
          format = _this$props.format,
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
        disabled: disabled
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

      return /*#__PURE__*/React__default.createElement(Antd.Col, {
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
      }, /*#__PURE__*/React__default.createElement(Antd.Row, _extends({}, rowProps, {
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
        return /*#__PURE__*/React__default.createElement(Antd.Popconfirm, {
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
      var id = this.props.id;
      return _objectSpread2({}, fieldConfig, {
        field: "".concat(id, ".").concat(fieldConfig.field)
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

var _class$p, _class2$f;
var CLASS_NAME$5 = "".concat(CLASS_PREFIX, "-card");

var Card = autoBindMethods(_class$p = mobxReact.observer(_class$p = (_class2$f = /*#__PURE__*/function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          isLoading = _this$props.isLoading,
          model = _this$props.model,
          passDownProps = _objectWithoutProperties(_this$props, ["className", "title", "renderTopRight", "isLoading", "model"]),
          filteredFieldSets = filterFieldSets(this.fieldSets, {
        model: model,
        writeOnly: true
      });

      return /*#__PURE__*/React__default.createElement(Antd.Card, {
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
}(React.Component), (_applyDecoratedDescriptor(_class2$f.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$f.prototype, "fieldSets"), _class2$f.prototype)), _class2$f)) || _class$p) || _class$p;

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

      return /*#__PURE__*/React__default.createElement(Antd.Card, {
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

var _class$r, _class2$g, _temp$a, _class4, _class5, _temp2;
var CLASS_NAME$6 = "".concat(CLASS_PREFIX, "-form");
var UnwrappedForm = autoBindMethods(_class$r = mobxReact.observer(_class$r = (_class2$g = (_temp$a = /*#__PURE__*/function (_Component) {
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
        return /*#__PURE__*/React__default.createElement(Antd.Button, _extends({
          block: true
        }, submitProps));
      }

      return /*#__PURE__*/React__default.createElement(ButtonToolbar, {
        align: "right",
        noSpacing: true
      }, onCancel && /*#__PURE__*/React__default.createElement(Antd.Button, {
        disabled: this.formManager.isCancelButtonDisabled,
        onClick: onCancel,
        size: "large"
      }, cancelText), /*#__PURE__*/React__default.createElement(Antd.Button, submitProps));
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
          formModel = this.formManager.formModel,
          filteredFieldSets = filterFieldSets(this.fieldSets, {
        model: formModel
      }),
          className = cx(CLASS_NAME$6, this.props.className, formatClassNames(CLASS_NAME$6, colon, layout)),
          passDownProps = {
        layout: layout,
        colon: colon
      };
      return /*#__PURE__*/React__default.createElement(Antd.Form, {
        className: className,
        colon: colon,
        layout: layout,
        onSubmit: this.formManager.onSave
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
}(React.Component), _temp$a), (_applyDecoratedDescriptor(_class2$g.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$g.prototype, "fieldSets"), _class2$g.prototype)), _class2$g)) || _class$r) || _class$r; // istanbul ignore next

var WrappedForm = Antd.Form.create()(UnwrappedForm);
var Form = autoBindMethods(_class4 = mobxReact.observer(_class4 = (_temp2 = _class5 = /*#__PURE__*/function (_Component2) {
  _inherits(Form, _Component2);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, _getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(WrappedForm, this.props);
    }
  }]);

  return Form;
}(React.Component), _class5.defaultProps = _objectSpread2({}, formPropsDefaults, {}, sharedComponentPropsDefaults, {
  showControls: true
}), _temp2)) || _class4) || _class4;

var _class$s, _class2$h, _temp$b;
var FormCard = autoBindMethods(_class$s = mobxReact.observer(_class$s = (_temp$b = _class2$h = /*#__PURE__*/function (_Component) {
  _inherits(FormCard, _Component);

  function FormCard() {
    _classCallCheck(this, FormCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormCard).apply(this, arguments));
  }

  _createClass(FormCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          isLoading = _this$props.isLoading,
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          cardClassName = cx("".concat(CLASS_PREFIX, "-card"), className),
          HANDLED_PROPS = ['title', 'renderTopRight'];
      return /*#__PURE__*/React__default.createElement(Antd.Card, {
        className: cardClassName,
        loading: isLoading,
        title: title,
        extra: renderTopRight && renderTopRight()
      }, /*#__PURE__*/React__default.createElement(Form, lodash.omit(this.props, HANDLED_PROPS)));
    }
  }]);

  return FormCard;
}(React.Component), _class2$h.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$b)) || _class$s) || _class$s;

var _class$t, _class2$i, _descriptor$4, _descriptor2$2, _class3$4, _temp$c;

var EditableCard = autoBindMethods(_class$t = mobxReact.observer(_class$t = (_class2$i = (_temp$c = _class3$4 = /*#__PURE__*/function (_Component) {
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

    _initializerDefineProperty(_this, "isEditing", _descriptor2$2, _assertThisInitialized(_this));

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
      var _this$props4 = this.props,
          isLoading = _this$props4.isLoading,
          isGuarded = _this$props4.isGuarded,
          classNameSuffix = _this$props4.classNameSuffix,
          title = _this$props4.title,
          className = getBtnClassName('edit', classNameSuffix, title);
      return /*#__PURE__*/React__default.createElement(GuardedButton, {
        className: className,
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
}(React.Component), _class3$4.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$c), (_descriptor$4 = _applyDecoratedDescriptor(_class2$i.prototype, "isDeleting", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class2$i.prototype, "isEditing", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$i)) || _class$t) || _class$t;

var _class$u, _class2$j, _descriptor$5, _class3$5, _temp$d;

var EditableArrayCard = autoBindMethods(_class$u = mobxReact.observer(_class$u = (_class2$j = (_temp$d = _class3$5 = /*#__PURE__*/function (_Component) {
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

      return /*#__PURE__*/React__default.createElement(Antd.Card, {
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
}(React.Component), _class3$5.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$d), (_descriptor$5 = _applyDecoratedDescriptor(_class2$j.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$j)) || _class$u) || _class$u;

var _class$v, _class2$k, _temp$e;
var CLASS_NAME$7 = "".concat(CLASS_PREFIX, "-form-drawer");

var FormDrawer = autoBindMethods(_class$v = mobxReact.observer(_class$v = (_temp$e = _class2$k = /*#__PURE__*/function (_Component) {
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

      return /*#__PURE__*/React__default.createElement(Antd.Drawer, {
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
      var HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];
      return lodash.omit(this.props, HANDLED_PROPS);
    }
  }]);

  return FormDrawer;
}(React.Component), _class2$k.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$e)) || _class$v) || _class$v;

var _class$w, _class2$l, _descriptor$6, _class3$6, _temp$f;
var CLASS_NAME$8 = "".concat(CLASS_PREFIX, "-form-modal");

var FormModal = autoBindMethods(_class$w = mobxReact.observer(_class$w = (_class2$l = (_temp$f = _class3$6 = /*#__PURE__*/function (_Component) {
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
      this.formManager = formManager;
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

      return /*#__PURE__*/React__default.createElement(Antd.Modal, _extends({
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
      var HANDLED_PROPS = ['title', 'isVisible', 'childrenBefore'];
      return lodash.omit(this.props, HANDLED_PROPS);
    }
  }, {
    key: "modalProps",
    get: function get() {
      var _this$props4 = this.props,
          cancelText = _this$props4.cancelText,
          saveText = _this$props4.saveText,
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
          onSave = _this$formManager.onSave,
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
        onOk: onSave
      };
    }
  }]);

  return FormModal;
}(React.Component), _class3$6.defaultProps = _objectSpread2({}, formPropsDefaults), _temp$f), (_descriptor$6 = _applyDecoratedDescriptor(_class2$l.prototype, "formManager", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$l)) || _class$w) || _class$w;

var _class$x, _class2$m, _class3$7, _temp$g;
var CLASS_NAME$9 = "".concat(CLASS_PREFIX, "-summary-card");

var SummaryCard = autoBindMethods(_class$x = mobxReact.observer(_class$x = (_class2$m = (_temp$g = _class3$7 = /*#__PURE__*/function (_Component) {
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
      return /*#__PURE__*/React__default.createElement(Antd.List.Item, {
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
      return /*#__PURE__*/React__default.createElement(Antd.Card, {
        className: cx(CLASS_NAME$9, className),
        extra: renderTopRight && renderTopRight(),
        loading: isLoading,
        title: title
      }, this.fieldSets.map(function (fieldSet, idx) {
        return /*#__PURE__*/React__default.createElement(Antd.List, {
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
}(React.Component), _class3$7.defaultProps = {
  column: 4
}, _temp$g), (_applyDecoratedDescriptor(_class2$m.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$m.prototype, "fieldSets"), _class2$m.prototype)), _class2$m)) || _class$x) || _class$x;

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
      return this.props.title || undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          title = _this$props.title,
          className = _this$props.className,
          passDownProps = _objectWithoutProperties(_this$props, ["isLoading", "title", "className"]);

      return /*#__PURE__*/React__default.createElement(Antd.Table, _extends({}, passDownProps, {
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
exports.Date = Date;
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
