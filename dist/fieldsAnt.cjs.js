'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var autoBindMethods = _interopDefault(require('class-autobind-decorator'));
var cx = _interopDefault(require('classnames'));
var Antd = require('antd');
var mobx = require('mobx');
var lodash = require('lodash');
var utils = require('@mighty-justice/utils');
var moment = _interopDefault(require('moment'));
var dateFns = require('date-fns');
var iso8601Duration = require('iso8601-duration');
var mobxReact = require('mobx-react');
var SmartBool = _interopDefault(require('@mighty-justice/smart-bool'));
var flattenObject = _interopDefault(require('flat'));

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

var _dec, _class$1, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

/*
This component performs the 'search' action of ObjectSearchCreate.
It must be a separate component so that Ant Design / rc-form can
inject their own props, do validation, and correctly show help:

{formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(
  <ObjectSearchCreateSearchInput
*/
var ITEM_KEYS = {
  ADD: 'add',
  EMPTY: 'empty',
  NO_SEARCH: 'no-search'
};
var ObjectSearchCreateSearchInput = (_dec = mobxReact.inject('getEndpoint'), _dec(_class$1 = autoBindMethods(_class$1 = mobxReact.observer(_class$1 = (_class2 = (_temp = _class3 =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectSearchCreateSearchInput, _Component);

  function ObjectSearchCreateSearchInput(props) {
    var _this;

    _classCallCheck(this, ObjectSearchCreateSearchInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObjectSearchCreateSearchInput).call(this, props));

    _initializerDefineProperty(_this, "options", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isLoading", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "search", _descriptor3, _assertThisInitialized(_this));

    _this.debouncedHandleSearch = void 0;
    _this.debouncedHandleSearch = lodash.debounce(_this.handleSearch, props.debounceWait);
    return _this;
  }

  _createClass(ObjectSearchCreateSearchInput, [{
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
                this.isLoading.setTrue();
                _context.next = 5;
                return getEndpoint("/".concat(endpoint, "/").concat(utils.toKey(params)));

              case 5:
                response = _context.sent;
                this.options = response.results;
                this.isLoading.setFalse();

              case 8:
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
    key: "renderOptionAdd",
    value: function renderOptionAdd() {
      var addNewContent = this.props.addNewContent,
          className = "".concat(CX_PREFIX_SEARCH_CREATE, "-item-").concat(ITEM_KEYS.ADD);
      return React__default.createElement(Antd.Select.Option, {
        className: className,
        key: ITEM_KEYS.ADD
      }, React__default.createElement("div", null, addNewContent || React__default.createElement(React__default.Fragment, null, React__default.createElement(Antd.Icon, {
        type: "plus"
      }), " Add new")));
    }
  }, {
    key: "renderOptionEmpty",
    value: function renderOptionEmpty() {
      var selectProps = this.props.selectProps,
          className = "".concat(CX_PREFIX_SEARCH_CREATE, "-item-").concat(ITEM_KEYS.EMPTY);
      return React__default.createElement(Antd.Select.Option, {
        className: className,
        disabled: true,
        key: ITEM_KEYS.EMPTY
      }, React__default.createElement("div", null, lodash.get(selectProps, 'notFoundContent') || 'No results'));
    }
  }, {
    key: "renderOptionNoSearch",
    value: function renderOptionNoSearch() {
      var noSearchContent = this.props.noSearchContent,
          className = "".concat(CX_PREFIX_SEARCH_CREATE, "-item-").concat(ITEM_KEYS.NO_SEARCH);
      return React__default.createElement(Antd.Select.Option, {
        className: className,
        disabled: true,
        key: ITEM_KEYS.NO_SEARCH
      }, React__default.createElement("div", null, noSearchContent || 'Type in search text'));
    }
  }, {
    key: "renderOption",
    value: function renderOption(option) {
      var renderOption = this.props.renderOption,
          className = "".concat(CX_PREFIX_SEARCH_CREATE, "-item");
      return React__default.createElement(Antd.Select.Option, {
        className: className,
        key: option.id,
        value: option.id,
        title: option.name
      }, renderOption ? renderOption(option) : option.name);
    }
  }, {
    key: "onChange",
    value: function onChange(selectedOption) {
      var _this$injected = this.injected,
          onChange = _this$injected.onChange,
          onAddNew = _this$injected.onAddNew; // Clear

      if (!selectedOption) {
        onChange(selectedOption);
        return;
      } // Add new


      if (selectedOption.key === ITEM_KEYS.ADD) {
        onAddNew(this.search);
        return;
      } // Select from search


      var foundOption = this.options.find(function (option) {
        return option.id === selectedOption.key;
      });
      onChange(mobx.toJS(foundOption));
    } // istanbul ignore next

  }, {
    key: "onBlur",
    value: function onBlur() {
      this.search = '';
    } // istanbul ignore next

  }, {
    key: "onFocus",
    value: function onFocus() {
      var isPristine = !this.hasOptions && !this.hasSearch;

      if (isPristine) {
        // Trigger empty search
        this.handleSearch(this.search);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.injected.id,
          showEmpty = this.hasSearch && !this.hasOptions,
          showNoSearch = !this.hasSearch && !this.hasOptions,
          showAdd = this.hasSearch;
      return React__default.createElement(Antd.Select, _extends({
        allowClear: true,
        defaultActiveFirstOption: false,
        filterOption: false,
        id: id,
        labelInValue: true,
        loading: this.isLoading.isTrue,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.onFocus,
        onSearch: this.debouncedHandleSearch,
        optionLabelProp: "title",
        placeholder: "Search...",
        showSearch: true,
        suffixIcon: this.isLoading.isTrue ? this.loadingIcon : this.searchIcon
      }, this.selectProps), this.options.map(this.renderOption), showEmpty && this.renderOptionEmpty(), showNoSearch && this.renderOptionNoSearch(), showAdd && this.renderOptionAdd());
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
    key: "loadingIcon",
    get: function get() {
      return this.props.loadingIcon || React__default.createElement(Antd.Icon, {
        type: "loading"
      });
    }
  }, {
    key: "searchIcon",
    get: function get() {
      return this.props.searchIcon || React__default.createElement(Antd.Icon, {
        type: "search"
      });
    }
  }, {
    key: "selectProps",
    get: function get() {
      // Omitting specific props to avoid unintentional behaviors
      return lodash.omit(this.props.selectProps, ['id', 'loading', 'onBlur', 'onChange', 'onFocus', 'onSearch', 'showSearch']);
    }
  }]);

  return ObjectSearchCreateSearchInput;
}(React.Component), _class3.defaultProps = {
  debounceWait: DEFAULT_DEBOUNCE_WAIT
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "options", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "search", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2)) || _class$1) || _class$1) || _class$1);

var _dec$1, _class$2, _class2$1, _descriptor$1, _descriptor2$1, _temp$1;
function isTypeObjectSearchCreate(fieldConfig) {
  return fieldConfig.type === 'objectSearchCreate';
}
var ObjectSearchCreate = (_dec$1 = mobxReact.inject('getEndpoint'), _dec$1(_class$2 = autoBindMethods(_class$2 = mobxReact.observer(_class$2 = (_class2$1 = (_temp$1 =
/*#__PURE__*/
function (_Component) {
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
      var _onAddNew = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(search) {
        var _this$injected, onAddNewToggle, formManager, id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$injected = this.injected, onAddNewToggle = _this$injected.onAddNewToggle, formManager = _this$injected.formManager, id = _this$injected.id;
                this.search = search;
                formManager.form.setFieldsValue(_defineProperty({}, id, {}));
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

      function onAddNew(_x) {
        return _onAddNew.apply(this, arguments);
      }

      return onAddNew;
    }()
  }, {
    key: "onSearch",
    value: function () {
      var _onSearch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
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
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(NestedFieldSet, {
        fieldSet: this.fieldConfig.createFields,
        formManager: formManager,
        id: fieldConfig.field,
        label: this.fieldConfig.label,
        search: this.search
      }), React__default.createElement(Antd.Button, {
        className: "".concat(CX_PREFIX_SEARCH_CREATE, "-btn-back"),
        size: "small",
        onClick: this.onSearch
      }, React__default.createElement(Antd.Icon, {
        type: "left"
      }), " Back to search"));
    }
  }, {
    key: "renderSearch",
    value: function renderSearch() {
      var _this$injected4 = this.injected,
          decoratorOptions = _this$injected4.decoratorOptions,
          fieldConfig = _this$injected4.fieldConfig,
          formManager = _this$injected4.formManager;
      return React__default.createElement(Antd.Form.Item, null, formManager.form.getFieldDecorator(fieldConfig.field, decoratorOptions)(React__default.createElement(ObjectSearchCreateSearchInput, _extends({
        onAddNew: this.onAddNew
      }, this.objectSearchProps))));
    }
  }, {
    key: "render",
    value: function render() {
      var className = cx(CX_PREFIX_SEARCH_CREATE, _defineProperty({}, "".concat(CX_PREFIX_SEARCH_CREATE, "-create"), this.isAddingNew.isTrue), this.props.className);
      return React__default.createElement("div", {
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
      return lodash.pick(this.props, ['addNewContent', 'debounceWait', 'fieldConfig', 'loadingIcon', 'noSearchContent', 'renderOption', 'searchIcon', 'selectProps']);
    }
  }]);

  return ObjectSearchCreate;
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
var OptionSelect = (_dec$2 = mobxReact.inject('getOptions'), _dec$2(_class$3 = (_class2$2 =
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
      var renderOption = this.props.renderOption;
      return React__default.createElement(Antd.Select, _extends({
        allowClear: true,
        optionFilterProp: "children",
        showSearch: !!this.fieldConfig.showSearch
      }, this.props), this.options.map(function (option) {
        return React__default.createElement(Antd.Select.Option, {
          key: option.value,
          value: option.value
        }, renderOption ? renderOption(option) : option.name);
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

  return OptionSelect;
}(React.Component), (_applyDecoratedDescriptor(_class2$2.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$2.prototype, "options"), _class2$2.prototype)), _class2$2)) || _class$3);

var _dec$3, _class$4, _class2$3;
var RadioGroup = (_dec$3 = mobxReact.inject('getOptions'), _dec$3(_class$4 = autoBindMethods(_class$4 = mobxReact.observer(_class$4 = (_class2$3 =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioGroup).apply(this, arguments));
  }

  _createClass(RadioGroup, [{
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

  return RadioGroup;
}(React.Component), (_applyDecoratedDescriptor(_class2$3.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$3.prototype, "options"), _class2$3.prototype)), _class2$3)) || _class$4) || _class$4) || _class$4);

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
}(React.Component);

var _dec$4, _class$5, _class2$4;
var OptionSelectDisplay = (_dec$4 = mobxReact.inject('getOptions'), _dec$4(_class$5 = autoBindMethods(_class$5 = mobxReact.observer(_class$5 = (_class2$4 =
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
}(React.Component), (_applyDecoratedDescriptor(_class2$4.prototype, "options", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$4.prototype, "options"), _class2$4.prototype)), _class2$4)) || _class$5) || _class$5) || _class$5);
function formatOptionSelect(value, fieldConfig) {
  if (lodash.isArray(value)) {
    if (value.length > 1) {
      return "(".concat(value.length, " values)");
    }

    return React__default.createElement(OptionSelectDisplay, {
      value: value[0],
      fieldConfig: fieldConfig
    });
  }

  return React__default.createElement(OptionSelectDisplay, {
    value: value,
    fieldConfig: fieldConfig
  });
}

var DEFAULT_DEBOUNCE_WAIT = 300;
var CX_PREFIX_SEARCH_CREATE = 'ant-input-search-create';
var REGEXP_SSN = /^[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}$/;
var REGEXP_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var ID_ATTR = 'id';

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
  var _arr = [true, false];

  for (var _i = 0; _i < _arr.length; _i++) {
    var bool = _arr[_i];

    if (value === bool || value === bool.toString()) {
      return bool;
    }
  }

  return value;
}

var TYPES = {
  boolean: {
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
  date: {
    editComponent: Antd.DatePicker,
    fromForm: function fromForm(value) {
      return value && dateFns.format(value, 'YYYY-MM-DD');
    },
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
  email: {
    formValidationRules: {
      email: {
        message: 'Must be a valid email address',
        type: 'email'
      }
    }
  },
  hidden: {
    editComponent: Antd.Input,
    editProps: {
      type: 'hidden'
    },
    render: function render() {
      return null;
    },
    showLabel: false,
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
    render: passRenderOnlyValue(utils.formatMoney),
    toForm: falseyToString
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
    editComponent: ObjectSearchCreate,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValue(utils.getNameOrDefault),
    skipFieldDecorator: true
  },
  optionSelect: {
    editComponent: OptionSelect,
    fieldConfigProp: true,
    nullify: true,
    render: passRenderOnlyValueAndFieldConfig(formatOptionSelect)
  },
  password: {
    editComponent: Antd.Input,
    editProps: {
      type: 'password'
    },
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
    formValidationRules: {
      isPhoneNumber: {
        message: 'Must be a valid phone number',
        pattern: REGEXP_PHONE,
        type: 'regexp'
      }
    },
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
        pattern: REGEXP_SSN,
        type: 'regexp'
      }
    },
    render: passRenderOnlyValue(utils.formatSocialSecurityNumber)
  },
  string: {},
  text: {
    editComponent: Antd.Input.TextArea,
    editProps: {
      autosize: {
        minRows: 4
      }
    },
    render: passRenderOnlyValue(utils.parseAndPreserveNewlines)
  },
  url: {
    editComponent: Antd.Input,
    editProps: {
      type: 'url'
    },
    formValidationRules: {
      url: {
        message: 'Not a valid website (URLs should start with http:// or https://)',
        type: 'url'
      }
    },
    render: passRenderOnlyValue(utils.formatWebsite)
  }
};

function asyncNoop() {
  return _asyncNoop.apply(this, arguments);
}

function _asyncNoop() {
  _asyncNoop = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
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
  } // start_date => date etc.


  for (var type in TYPES) {
    if (field.includes(type)) {
      return type;
    }
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
    render: stripFieldConfig(utils.getOrDefault),
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


  throw new Error('FieldConfig missing options, getOptions; getOptions not injected');
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
function fieldSetsToColumns(fieldSets) {
  var tableModel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return getFieldSetsFields(fillInFieldSets(fieldSets)).filter(function (fieldConfig) {
    return !fieldConfig.writeOnly;
  }).filter(function (fieldConfig) {
    return !filterInsertIf(fieldConfig, tableModel);
  }).map(function (fieldConfig) {
    return _objectSpread({
      dataIndex: fieldConfig.field,
      key: fieldConfig.field,
      render: function render(value, model) {
        return fieldConfig.render(value, fieldConfig, model);
      },
      title: fieldConfig.showLabel ? fieldConfig.label : ''
    }, fieldConfig.tableColumnProps);
  });
}
function modelFromFieldConfigs(fieldConfigs, data) {
  /*
  This function takes in a model with ALL form values, including those that should be hidden like
  readOnly fieldConfigs and those hidden by insertIf. We build a new model from scratch, only
  including those that should be there. We also nullify falsey values that require it here, and
  include the id from the model even if there is no fieldConfig for it.
  */
  var returnValues = {};
  fieldConfigs.map(fillInFieldConfig).filter(function (fieldConfig) {
    return !filterInsertIf(fieldConfig, data);
  }).filter(function (fieldConfig) {
    return !fieldConfig.readOnly;
  }).forEach(function (fieldConfig) {
    var field = fieldConfig.field,
        nullify = fieldConfig.nullify,
        formValue = lodash.get(data, field),
        shouldNullify = nullify && !formValue && formValue !== false,
        nullifiedValue = shouldNullify ? null : formValue,
        isAddingNew = lodash.isObject(formValue) && !lodash.has(formValue, ID_ATTR),
        value = isTypeObjectSearchCreate(fieldConfig) && isAddingNew ? modelFromFieldConfigs(fieldConfig.createFields, formValue) : nullifiedValue;
    lodash.set(returnValues, field, value);
  }); // We always include ids of models on submit

  var id = lodash.get(data, ID_ATTR);

  if (id) {
    lodash.set(returnValues, ID_ATTR, id);
  }

  return returnValues;
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

var _class$6;
var CardField = (_class$6 =
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
          fieldConfig = this.fieldConfig,
          field = fieldConfig.field,
          label = fieldConfig.label,
          showLabel = fieldConfig.showLabel,
          writeOnly = fieldConfig.writeOnly,
          value = renderValue(fieldConfig, model);

      if (writeOnly || filterInsertIf(fieldConfig, model)) {
        return null;
      }

      return React__default.createElement(Info, {
        key: field
      }, !showLabel ? value : React__default.createElement(React__default.Fragment, null, React__default.createElement(Label, null, label), React__default.createElement(Value, null, value)));
    }
  }, {
    key: "fieldConfig",
    get: function get() {
      return fillInFieldConfig(this.props.fieldConfig);
    }
  }]);

  return CardField;
}(React.Component), (_applyDecoratedDescriptor(_class$6.prototype, "fieldConfig", [mobx.computed], Object.getOwnPropertyDescriptor(_class$6.prototype, "fieldConfig"), _class$6.prototype)), _class$6);

var _class$7, _class2$5;

var FormField = autoBindMethods(_class$7 = mobxReact.observer(_class$7 = (_class2$5 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    _classCallCheck(this, FormField);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormField).apply(this, arguments));
  }

  _createClass(FormField, [{
    key: "fieldsValidatorToValidator",
    value: function fieldsValidatorToValidator(fieldsValidator, message) {
      var _this = this;

      // This returns a valid rc-form validator.
      // It would be enforced by typing, but their validation interface is basically just anys
      return function (_rule, _value, callback) {
        var formManager = _this.props.formManager,
            model = formManager.formModel,
            value = lodash.get(model, _this.fieldConfig.field),
            valid = fieldsValidator(value, _this.fieldConfig, model);

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
      var formManager = this.props.formManager,
          fieldConfig = this.fieldConfig,
          className = fieldConfig.className,
          colProps = fieldConfig.colProps,
          formItemProps = fieldConfig.formItemProps,
          field = fieldConfig.field,
          skipFieldDecorator = fieldConfig.skipFieldDecorator,
          readOnly = fieldConfig.readOnly,
          getFieldDecorator = formManager.form.getFieldDecorator;

      if (readOnly || filterInsertIf(fieldConfig, formManager.formModel)) {
        return null;
      }

      var decoratorOptionsProp = skipFieldDecorator ? {
        decoratorOptions: this.decoratorOptions
      } : {},
          editComponent = React__default.createElement(fieldConfig.editComponent, _extends({}, this.editProps, decoratorOptionsProp)),
          wrappedComponent = skipFieldDecorator ? editComponent : getFieldDecorator(field, this.decoratorOptions)(editComponent),
          FormItemComponent = React__default.createElement(Antd.Form.Item, _extends({
        className: className
      }, formItemProps, {
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
    key: "fieldConfig",
    get: function get() {
      return fillInFieldConfig(this.props.fieldConfig);
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
      var formManager = this.props.formManager;
      return formManager.getDefaultValue(this.fieldConfig);
    }
  }, {
    key: "editProps",
    get: function get() {
      var formManager = this.props.formManager,
          fieldConfig = this.fieldConfig,
          fieldConfigProp = fieldConfig.fieldConfigProp ? {
        fieldConfig: fieldConfig,
        formManager: formManager
      } : {};
      return _objectSpread({}, fieldConfig.editProps, fieldConfigProp, {
        form: formManager.form
      });
    }
  }, {
    key: "rules",
    get: function get() {
      var _this2 = this;

      // Here we take the { [key: string]: formValidationRules } object
      // found in fieldConfig.formValidationRules and return a valid list
      // of rules for rc-form
      return lodash.values(this.fieldConfig.formValidationRules).map(function (validationRule) {
        // Our own proprietary ( much more sane and powerful ) validation attribute
        // is converted here to the rc-form style validator
        if (validationRule.fieldsValidator) {
          return _objectSpread({
            validator: _this2.fieldsValidatorToValidator(validationRule.fieldsValidator, validationRule.message)
          }, lodash.omit(validationRule, 'fieldsValidator'));
        } // However, all default rc-form validators will still work as expected


        return validationRule;
      });
    }
  }, {
    key: "decoratorOptions",
    get: function get() {
      return {
        initialValue: this.initialValue,
        rules: this.rules
      };
    }
  }]);

  return FormField;
}(React.Component), (_applyDecoratedDescriptor(_class2$5.prototype, "fieldConfig", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$5.prototype, "fieldConfig"), _class2$5.prototype)), _class2$5)) || _class$7) || _class$7;

var _class$8, _class2$6;

var FormFieldSet = autoBindMethods(_class$8 = mobxReact.observer(_class$8 = (_class2$6 =
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

      var formManager = this.props.formManager,
          fieldConfigs = getFieldSetFields(this.fieldSet),
          filteredFieldConfigs = fieldConfigs.filter(function (fieldConfig) {
        return !filterInsertIf(fieldConfig, formManager.formModel);
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
}(React.Component), (_applyDecoratedDescriptor(_class2$6.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$6.prototype, "fieldSet"), _class2$6.prototype)), _class2$6)) || _class$8) || _class$8;

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

var _class$9, _class2$7;

var NestedFieldSet = autoBindMethods(_class$9 = mobxReact.observer(_class$9 = (_class2$7 =
/*#__PURE__*/
function (_Component) {
  _inherits(NestedFieldSet, _Component);

  function NestedFieldSet() {
    _classCallCheck(this, NestedFieldSet);

    return _possibleConstructorReturn(this, _getPrototypeOf(NestedFieldSet).apply(this, arguments));
  }

  _createClass(NestedFieldSet, [{
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
      }

      return {};
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement(FormFieldSet, {
        fieldSet: this.fieldSet,
        formManager: this.props.formManager
      });
    }
  }, {
    key: "fieldSet",
    get: function get() {
      var _this = this;

      var _this$props = this.props,
          id = _this$props.id,
          fieldSet = _this$props.fieldSet;
      return getFieldSetFields(fillInFieldSet(fieldSet)).map(function (fieldConfig) {
        return _objectSpread({}, fieldConfig, {
          field: "".concat(id, ".").concat(fieldConfig.field)
        }, _this.getDefaultValue(fieldConfig));
      });
    }
  }]);

  return NestedFieldSet;
}(React.Component), (_applyDecoratedDescriptor(_class2$7.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$7.prototype, "fieldSet"), _class2$7.prototype)), _class2$7)) || _class$9) || _class$9;

var _class$a, _class2$8;

var CardFieldSet = mobxReact.observer(_class$a = (_class2$8 =
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
          unfilteredFieldConfigs = fieldConfigs.filter(function (fieldConfig) {
        return !filterInsertIf(fieldConfig, model);
      });

      if (!unfilteredFieldConfigs.length) {
        return null;
      }

      return React__default.createElement(React.Fragment, {
        key: idx
      }, idx > 0 && React__default.createElement(Antd.Divider, {
        key: "divider-".concat(idx)
      }), legend && React__default.createElement("h3", null, legend), unfilteredFieldConfigs.map(function (fieldConfig) {
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
}(React.Component), (_applyDecoratedDescriptor(_class2$8.prototype, "fieldSet", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$8.prototype, "fieldSet"), _class2$8.prototype)), _class2$8)) || _class$a;

var _class$b, _class2$9;

var Card = autoBindMethods(_class$b = mobxReact.observer(_class$b = (_class2$9 =
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
}(React.Component), (_applyDecoratedDescriptor(_class2$9.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$9.prototype, "fieldSets"), _class2$9.prototype)), _class2$9)) || _class$b) || _class$b;

var _class$c;

var ArrayCard = autoBindMethods(_class$c = mobxReact.observer(_class$c =
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
      return React__default.createElement(Antd.Card, {
        title: title,
        extra: renderTopRight && renderTopRight(),
        loading: isLoading
      }, lodash.isEmpty(model) && React__default.createElement("p", {
        className: "empty-message"
      }, "No records"), model.map(function (modelItem) {
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
}(React.Component)) || _class$c) || _class$c;

var formPropsDefaults = {
  onSave: asyncNoop,
  onSuccess: asyncNoop,
  saveText: 'Save'
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var httpStatusCodes = createCommonjsModule(function (module, exports) {
/**
 * Constants enumerating the HTTP status codes.
 *
 * All status codes defined in RFC1945 (HTTP/1.0, RFC2616 (HTTP/1.1),
 * RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes), and
 * RFC7538 (Permanent Redirect) are supported.
 *
 * Based on the org.apache.commons.httpclient.HttpStatus Java API.
 *
 * Ported by Bryce Neal.
 */

var statusCodes = {};

statusCodes[exports.ACCEPTED = 202] = "Accepted";
statusCodes[exports.BAD_GATEWAY = 502] = "Bad Gateway";
statusCodes[exports.BAD_REQUEST = 400] = "Bad Request";
statusCodes[exports.CONFLICT = 409] = "Conflict";
statusCodes[exports.CONTINUE = 100] = "Continue";
statusCodes[exports.CREATED = 201] = "Created";
statusCodes[exports.EXPECTATION_FAILED = 417] = "Expectation Failed";
statusCodes[exports.FAILED_DEPENDENCY  = 424] = "Failed Dependency";
statusCodes[exports.FORBIDDEN = 403] = "Forbidden";
statusCodes[exports.GATEWAY_TIMEOUT = 504] = "Gateway Timeout";
statusCodes[exports.GONE = 410] = "Gone";
statusCodes[exports.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP Version Not Supported";
statusCodes[exports.IM_A_TEAPOT = 418] = "I'm a teapot";
statusCodes[exports.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "Insufficient Space on Resource";
statusCodes[exports.INSUFFICIENT_STORAGE = 507] = "Insufficient Storage";
statusCodes[exports.INTERNAL_SERVER_ERROR = 500] = "Server Error";
statusCodes[exports.LENGTH_REQUIRED = 411] = "Length Required";
statusCodes[exports.LOCKED = 423] = "Locked";
statusCodes[exports.METHOD_FAILURE = 420] = "Method Failure";
statusCodes[exports.METHOD_NOT_ALLOWED = 405] = "Method Not Allowed";
statusCodes[exports.MOVED_PERMANENTLY = 301] = "Moved Permanently";
statusCodes[exports.MOVED_TEMPORARILY = 302] = "Moved Temporarily";
statusCodes[exports.MULTI_STATUS = 207] = "Multi-Status";
statusCodes[exports.MULTIPLE_CHOICES = 300] = "Multiple Choices";
statusCodes[exports.NETWORK_AUTHENTICATION_REQUIRED = 511] = "Network Authentication Required";
statusCodes[exports.NO_CONTENT = 204] = "No Content";
statusCodes[exports.NON_AUTHORITATIVE_INFORMATION = 203] = "Non Authoritative Information";
statusCodes[exports.NOT_ACCEPTABLE = 406] = "Not Acceptable";
statusCodes[exports.NOT_FOUND = 404] = "Not Found";
statusCodes[exports.NOT_IMPLEMENTED = 501] = "Not Implemented";
statusCodes[exports.NOT_MODIFIED = 304] = "Not Modified";
statusCodes[exports.OK = 200] = "OK";
statusCodes[exports.PARTIAL_CONTENT = 206] = "Partial Content";
statusCodes[exports.PAYMENT_REQUIRED = 402] = "Payment Required";
statusCodes[exports.PERMANENT_REDIRECT = 308] = "Permanent Redirect";
statusCodes[exports.PRECONDITION_FAILED = 412] = "Precondition Failed";
statusCodes[exports.PRECONDITION_REQUIRED = 428] = "Precondition Required";
statusCodes[exports.PROCESSING = 102] = "Processing";
statusCodes[exports.PROXY_AUTHENTICATION_REQUIRED = 407] = "Proxy Authentication Required";
statusCodes[exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "Request Header Fields Too Large";
statusCodes[exports.REQUEST_TIMEOUT = 408] = "Request Timeout";
statusCodes[exports.REQUEST_TOO_LONG = 413] = "Request Entity Too Large";
statusCodes[exports.REQUEST_URI_TOO_LONG = 414] = "Request-URI Too Long";
statusCodes[exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "Requested Range Not Satisfiable";
statusCodes[exports.RESET_CONTENT = 205] = "Reset Content";
statusCodes[exports.SEE_OTHER = 303] = "See Other";
statusCodes[exports.SERVICE_UNAVAILABLE = 503] = "Service Unavailable";
statusCodes[exports.SWITCHING_PROTOCOLS = 101] = "Switching Protocols";
statusCodes[exports.TEMPORARY_REDIRECT = 307] = "Temporary Redirect";
statusCodes[exports.TOO_MANY_REQUESTS = 429] = "Too Many Requests";
statusCodes[exports.UNAUTHORIZED = 401] = "Unauthorized";
statusCodes[exports.UNPROCESSABLE_ENTITY = 422] = "Unprocessable Entity";
statusCodes[exports.UNSUPPORTED_MEDIA_TYPE = 415] = "Unsupported Media Type";
statusCodes[exports.USE_PROXY = 305] = "Use Proxy";

exports.getStatusText = function(statusCode) {
  if (statusCodes.hasOwnProperty(statusCode)) {
    return statusCodes[statusCode];
  } else {
    throw new Error("Status code does not exist: " + statusCode);
  }
};
});
var httpStatusCodes_1 = httpStatusCodes.ACCEPTED;
var httpStatusCodes_2 = httpStatusCodes.BAD_GATEWAY;
var httpStatusCodes_3 = httpStatusCodes.BAD_REQUEST;
var httpStatusCodes_4 = httpStatusCodes.CONFLICT;
var httpStatusCodes_5 = httpStatusCodes.CONTINUE;
var httpStatusCodes_6 = httpStatusCodes.CREATED;
var httpStatusCodes_7 = httpStatusCodes.EXPECTATION_FAILED;
var httpStatusCodes_8 = httpStatusCodes.FAILED_DEPENDENCY;
var httpStatusCodes_9 = httpStatusCodes.FORBIDDEN;
var httpStatusCodes_10 = httpStatusCodes.GATEWAY_TIMEOUT;
var httpStatusCodes_11 = httpStatusCodes.GONE;
var httpStatusCodes_12 = httpStatusCodes.HTTP_VERSION_NOT_SUPPORTED;
var httpStatusCodes_13 = httpStatusCodes.IM_A_TEAPOT;
var httpStatusCodes_14 = httpStatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE;
var httpStatusCodes_15 = httpStatusCodes.INSUFFICIENT_STORAGE;
var httpStatusCodes_16 = httpStatusCodes.INTERNAL_SERVER_ERROR;
var httpStatusCodes_17 = httpStatusCodes.LENGTH_REQUIRED;
var httpStatusCodes_18 = httpStatusCodes.LOCKED;
var httpStatusCodes_19 = httpStatusCodes.METHOD_FAILURE;
var httpStatusCodes_20 = httpStatusCodes.METHOD_NOT_ALLOWED;
var httpStatusCodes_21 = httpStatusCodes.MOVED_PERMANENTLY;
var httpStatusCodes_22 = httpStatusCodes.MOVED_TEMPORARILY;
var httpStatusCodes_23 = httpStatusCodes.MULTI_STATUS;
var httpStatusCodes_24 = httpStatusCodes.MULTIPLE_CHOICES;
var httpStatusCodes_25 = httpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED;
var httpStatusCodes_26 = httpStatusCodes.NO_CONTENT;
var httpStatusCodes_27 = httpStatusCodes.NON_AUTHORITATIVE_INFORMATION;
var httpStatusCodes_28 = httpStatusCodes.NOT_ACCEPTABLE;
var httpStatusCodes_29 = httpStatusCodes.NOT_FOUND;
var httpStatusCodes_30 = httpStatusCodes.NOT_IMPLEMENTED;
var httpStatusCodes_31 = httpStatusCodes.NOT_MODIFIED;
var httpStatusCodes_32 = httpStatusCodes.OK;
var httpStatusCodes_33 = httpStatusCodes.PARTIAL_CONTENT;
var httpStatusCodes_34 = httpStatusCodes.PAYMENT_REQUIRED;
var httpStatusCodes_35 = httpStatusCodes.PERMANENT_REDIRECT;
var httpStatusCodes_36 = httpStatusCodes.PRECONDITION_FAILED;
var httpStatusCodes_37 = httpStatusCodes.PRECONDITION_REQUIRED;
var httpStatusCodes_38 = httpStatusCodes.PROCESSING;
var httpStatusCodes_39 = httpStatusCodes.PROXY_AUTHENTICATION_REQUIRED;
var httpStatusCodes_40 = httpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE;
var httpStatusCodes_41 = httpStatusCodes.REQUEST_TIMEOUT;
var httpStatusCodes_42 = httpStatusCodes.REQUEST_TOO_LONG;
var httpStatusCodes_43 = httpStatusCodes.REQUEST_URI_TOO_LONG;
var httpStatusCodes_44 = httpStatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE;
var httpStatusCodes_45 = httpStatusCodes.RESET_CONTENT;
var httpStatusCodes_46 = httpStatusCodes.SEE_OTHER;
var httpStatusCodes_47 = httpStatusCodes.SERVICE_UNAVAILABLE;
var httpStatusCodes_48 = httpStatusCodes.SWITCHING_PROTOCOLS;
var httpStatusCodes_49 = httpStatusCodes.TEMPORARY_REDIRECT;
var httpStatusCodes_50 = httpStatusCodes.TOO_MANY_REQUESTS;
var httpStatusCodes_51 = httpStatusCodes.UNAUTHORIZED;
var httpStatusCodes_52 = httpStatusCodes.UNPROCESSABLE_ENTITY;
var httpStatusCodes_53 = httpStatusCodes.UNSUPPORTED_MEDIA_TYPE;
var httpStatusCodes_54 = httpStatusCodes.USE_PROXY;
var httpStatusCodes_55 = httpStatusCodes.getStatusText;

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

var _class$d, _class2$a, _descriptor$2, _temp$2;
var toastError = {
  description: '',
  duration: null,
  message: 'Error submitting form'
};

var FormManager = autoBindMethods(_class$d = (_class2$a = (_temp$2 =
/*#__PURE__*/
function () {
  function FormManager(formWrappedInstance, fieldSets, args) {
    _classCallCheck(this, FormManager);

    _initializerDefineProperty(this, "saving", _descriptor$2, this);

    this.args = void 0;
    this.formWrappedInstance = void 0;
    this.formWrappedInstance = formWrappedInstance;
    this.args = _objectSpread({
      defaults: {},
      fieldSets: fieldSets,
      model: {},
      onSave: lodash.noop,
      onSuccess: lodash.noop
    }, lodash.pickBy(args, function (value) {
      return value !== undefined;
    }));
  }

  _createClass(FormManager, [{
    key: "getDefaultValue",
    value: function getDefaultValue(fieldConfigPartial) {
      var _this$args = this.args,
          model = _this$args.model,
          defaults = _this$args.defaults,
          fieldConfig = fillInFieldConfig(fieldConfigPartial),
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

      return modelToForm(_objectSpread({}, model, defaults));
    }
  }, {
    key: "getFormValue",
    value: function getFormValue(fieldConfigPartial) {
      var fieldConfig = fillInFieldConfig(fieldConfigPartial),
          formValue = lodash.get(this.formValues, fieldConfig.field),
          convertedValue = fieldConfig.fromForm(formValue, fieldConfig);

      return convertedValue;
    }
  }, {
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

      this.form.setFields(lodash.mapValues(errors, function (error, field) {
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
      /*
      Here we take the raw HTTP response and try to extract as much information from it as we can
      and use it to inform the user. If we're lucky, we have a nicely formatted JSON bad request
      response. If so, we will try to assign those validation errors to fields, and if that fails
      we will display them in toast notifications.
      */
      // A response with no status cannot be reasoned with
      // istanbul ignore next
      if (lodash.get(response, 'status') !== httpStatusCodes.BAD_REQUEST) {
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
                /*
                rc-form validateFields cannot be awaited and takes a callback as input,
                so we have to split the bulk of onSave out into this function to make
                sure we don't try to submit an un-validated form.
                */
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
                return onSave(this.submitModel);

              case 8:
                this.onSuccess();
                this.form.resetFields();
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
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();
                this.saving = true;
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
    key: "fieldConfigs",
    get: function get() {
      return getFieldSetsFields(this.args.fieldSets);
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
      var _this2 = this;

      /*
      formValues < formModel < submitModel
       Get the current value of all fields according to rc-form,
      or so that we have the model before the first render,
      compile it from all the default values.
       WARNING: This will include many values you don't see on the page.
      Use submitModel to get the fully processed form state.
      */
      var formValues = {};
      this.fieldConfigs.forEach(function (fieldConfig) {
        var isInForm = lodash.has(_this2.formValues, fieldConfig.field),
            value = isInForm ? _this2.getFormValue(fieldConfig) : _this2.getDefaultValue(fieldConfig);
        lodash.set(formValues, fieldConfig.field, value);
      }); // We always include ids of models on submit

      var id = lodash.get(this.args.model, ID_ATTR);

      if (id) {
        lodash.set(formValues, ID_ATTR, id);
      }

      return formValues;
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
}(), _temp$2), (_descriptor$2 = _applyDecoratedDescriptor(_class2$a.prototype, "saving", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2$a)) || _class$d;

var _class$e, _class2$b, _temp$3, _class4, _class5, _temp2;
var UnwrappedForm = autoBindMethods(_class$e = mobxReact.observer(_class$e = (_class2$b = (_temp$3 =
/*#__PURE__*/
function (_Component) {
  _inherits(UnwrappedForm, _Component);

  function UnwrappedForm(props) {
    var _this;

    _classCallCheck(this, UnwrappedForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnwrappedForm).call(this, props));
    _this.formManager = void 0;
    var defaults = props.defaults,
        model = props.model,
        onSave = props.onSave,
        setRefFormManager = props.setRefFormManager;
    _this.formManager = new FormManager(_assertThisInitialized(_this), _this.fieldSets, {
      defaults: defaults,
      model: model,
      onSave: onSave,
      onSuccess: _this.onSuccess
    });

    if (setRefFormManager) {
      setRefFormManager(_this.formManager);
    }

    return _this;
  }

  _createClass(UnwrappedForm, [{
    key: "onSuccess",
    value: function onSuccess() {
      var _this$props = this.props,
          onSuccess = _this$props.onSuccess,
          onCancel = _this$props.onCancel;

      if (onSuccess) {
        onSuccess();
      }

      if (onCancel) {
        onCancel();
      }
    }
  }, {
    key: "renderControls",
    value: function renderControls() {
      var _this$props2 = this.props,
          blockSubmit = _this$props2.blockSubmit,
          onCancel = _this$props2.onCancel,
          saveText = _this$props2.saveText,
          submitProps = {
        children: saveText,
        htmlType: 'submit',
        loading: this.formManager.saving,
        size: 'large',
        type: 'primary'
      };

      if (blockSubmit) {
        return React__default.createElement(Antd.Button, _extends({
          block: true
        }, submitProps));
      }

      return React__default.createElement(ButtonToolbar, {
        align: "right",
        noSpacing: true
      }, onCancel && React__default.createElement(Antd.Button, {
        disabled: this.formManager.saving,
        onClick: onCancel,
        size: "large"
      }, "Cancel"), React__default.createElement(Antd.Button, submitProps));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          showControls = _this$props3.showControls,
          title = _this$props3.title;
      return React__default.createElement(Antd.Form, {
        layout: "vertical",
        onSubmit: this.formManager.onSave,
        className: "mfa-form"
      }, title && React__default.createElement("h2", null, title), this.fieldSets.map(function (fieldSet, idx) {
        return React__default.createElement(React.Fragment, {
          key: idx
        }, idx > 0 && React__default.createElement(Antd.Divider, {
          key: "divider-".concat(idx)
        }), React__default.createElement("div", null, React__default.createElement(FormFieldSet, {
          fieldSet: fieldSet,
          formManager: _this2.formManager
        })));
      }), this.props.children, showControls && this.renderControls());
    }
  }, {
    key: "fieldSets",
    get: function get() {
      return fillInFieldSets(this.props.fieldSets);
    }
  }]);

  return UnwrappedForm;
}(React.Component), _temp$3), (_applyDecoratedDescriptor(_class2$b.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$b.prototype, "fieldSets"), _class2$b.prototype)), _class2$b)) || _class$e) || _class$e; // istanbul ignore next

var WrappedForm = Antd.Form.create()(UnwrappedForm);
var Form = autoBindMethods(_class4 = mobxReact.observer(_class4 = (_temp2 = _class5 =
/*#__PURE__*/
function (_Component2) {
  _inherits(Form, _Component2);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, _getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      return React__default.createElement(WrappedForm, this.props);
    }
  }]);

  return Form;
}(React.Component), _class5.defaultProps = _objectSpread({}, formPropsDefaults, {
  showControls: true
}), _temp2)) || _class4) || _class4;

var _class$f, _class2$c, _temp$4;
var FormCard = autoBindMethods(_class$f = mobxReact.observer(_class$f = (_temp$4 = _class2$c =
/*#__PURE__*/
function (_Component) {
  _inherits(FormCard, _Component);

  function FormCard() {
    _classCallCheck(this, FormCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormCard).apply(this, arguments));
  }

  _createClass(FormCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          title = _this$props.title,
          renderTopRight = _this$props.renderTopRight,
          HANDLED_PROPS = ['title', 'renderTopRight'];
      return React__default.createElement(Antd.Card, {
        loading: isLoading,
        title: title,
        extra: renderTopRight && renderTopRight()
      }, React__default.createElement(Form, lodash.omit(this.props, HANDLED_PROPS)));
    }
  }]);

  return FormCard;
}(React.Component), _class2$c.defaultProps = _objectSpread({}, formPropsDefaults), _temp$4)) || _class$f) || _class$f;

var _class$g, _class2$d, _descriptor$3, _descriptor2$2, _class3$1, _temp$5;

var EditableCard = autoBindMethods(_class$g = mobxReact.observer(_class$g = (_class2$d = (_temp$5 = _class3$1 =
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

    _initializerDefineProperty(_this, "isDeleting", _descriptor$3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isEditing", _descriptor2$2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(EditableCard, [{
    key: "handleDelete",
    value: function () {
      var _handleDelete = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
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
        var _this$props2, onSuccess, onSave;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = this.props, onSuccess = _this$props2.onSuccess, onSave = _this$props2.onSave;
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
      return React__default.createElement(ButtonToolbar, {
        noSpacing: true
      }, this.deleteButton, this.editButton);
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
    key: "deleteButton",
    get: function get() {
      var _this$props3 = this.props,
          isGuarded = _this$props3.isGuarded,
          title = _this$props3.title,
          onDelete = _this$props3.onDelete,
          isLoading = _this$props3.isLoading,
          classNameSuffix = this.props.classNameSuffix || lodash.kebabCase(title);

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
      var _this$props4 = this.props,
          isLoading = _this$props4.isLoading,
          title = _this$props4.title,
          isGuarded = _this$props4.isGuarded,
          classNameSuffix = this.props.classNameSuffix || lodash.kebabCase(title);
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
}(React.Component), _class3$1.defaultProps = _objectSpread({}, formPropsDefaults), _temp$5), (_descriptor$3 = _applyDecoratedDescriptor(_class2$d.prototype, "isDeleting", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class2$d.prototype, "isEditing", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$d)) || _class$g) || _class$g;

var _class$h, _class2$e, _descriptor$4, _class3$2, _temp$6;

var EditableArrayCard = autoBindMethods(_class$h = mobxReact.observer(_class$h = (_class2$e = (_temp$6 = _class3$2 =
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

    _initializerDefineProperty(_this, "isAddingNew", _descriptor$4, _assertThisInitialized(_this));

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
}(React.Component), _class3$2.defaultProps = _objectSpread({}, formPropsDefaults), _temp$6), (_descriptor$4 = _applyDecoratedDescriptor(_class2$e.prototype, "isAddingNew", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new SmartBool();
  }
})), _class2$e)) || _class$h) || _class$h;

var _class$i, _class2$f, _temp$7;

var FormDrawer = autoBindMethods(_class$i = mobxReact.observer(_class$i = (_temp$7 = _class2$f =
/*#__PURE__*/
function (_Component) {
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
      onCancel();
      isVisible.setFalse();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          isVisible = _this$props2.isVisible,
          title = _this$props2.title,
          width = _this$props2.width,
          drawerClassName = cx('mfa-form-drawer', className || null),
          HANDLED_PROPS = ['title', 'isVisible'];
      return React__default.createElement(Antd.Drawer, {
        className: drawerClassName,
        closable: true,
        destroyOnClose: true,
        maskClosable: false,
        onClose: this.onCancel,
        placement: "right",
        title: title,
        visible: isVisible.isTrue,
        width: width
      }, React__default.createElement(Form, _extends({}, lodash.omit(this.props, HANDLED_PROPS), {
        onCancel: this.onCancel
      })));
    }
  }]);

  return FormDrawer;
}(React.Component), _class2$f.defaultProps = _objectSpread({}, formPropsDefaults), _temp$7)) || _class$i) || _class$i;

var _class$j, _class2$g, _descriptor$5, _class3$3, _temp$8;

var FormModal = autoBindMethods(_class$j = mobxReact.observer(_class$j = (_class2$g = (_temp$8 = _class3$3 =
/*#__PURE__*/
function (_Component) {
  _inherits(FormModal, _Component);

  function FormModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "formManager", _descriptor$5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(FormModal, [{
    key: "setRefFormManager",
    value: function setRefFormManager(formManager) {
      this.formManager = formManager;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          onCancel = _this$props.onCancel,
          HANDLED_PROPS = ['title', 'children', 'childrenBefore'];
      return React__default.createElement(Antd.Modal, _extends({
        onCancel: onCancel,
        title: title,
        visible: true
      }, this.modalProps), this.props.childrenBefore, React__default.createElement(Form, _extends({}, lodash.omit(this.props, HANDLED_PROPS), {
        setRefFormManager: this.setRefFormManager,
        showControls: false
      })), this.props.children);
    }
  }, {
    key: "modalProps",
    get: function get() {
      var saveText = this.props.saveText;

      if (!this.formManager) {
        return {
          confirmLoading: true,
          okText: saveText,
          onOk: lodash.noop
        };
      }

      return {
        confirmLoading: this.formManager.saving,
        okText: this.formManager.saving ? 'Saving...' : saveText,
        onOk: this.formManager.onSave
      };
    }
  }]);

  return FormModal;
}(React.Component), _class3$3.defaultProps = _objectSpread({}, formPropsDefaults), _temp$8), (_descriptor$5 = _applyDecoratedDescriptor(_class2$g.prototype, "formManager", [mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2$g)) || _class$j) || _class$j;

var _class$k, _class2$h, _class3$4, _temp$9;

var SummaryCard = autoBindMethods(_class$k = mobxReact.observer(_class$k = (_class2$h = (_temp$9 = _class3$4 =
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
      var model = this.props.model,
          className = "summary-".concat(lodash.kebabCase(fieldConfig.field));
      return React__default.createElement(Antd.List.Item, {
        key: fieldConfig.field,
        className: className,
        extra: null
      }, React__default.createElement("h4", null, fieldConfig.label), React__default.createElement("p", null, renderValue(fieldConfig, model)));
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
}(React.Component), _class3$4.defaultProps = {
  column: 4
}, _temp$9), (_applyDecoratedDescriptor(_class2$h.prototype, "fieldSets", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$h.prototype, "fieldSets"), _class2$h.prototype)), _class2$h)) || _class$k) || _class$k;

var _class$l, _class2$i;

var Table = autoBindMethods(_class$l = mobxReact.observer(_class$l = (_class2$i =
/*#__PURE__*/
function (_Component) {
  _inherits(Table, _Component);

  function Table() {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, _getPrototypeOf(Table).apply(this, arguments));
  }

  _createClass(Table, [{
    key: "getTitle",
    value: function getTitle() {
      return this.props.title || '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          title = _this$props.title;
      return React__default.createElement(Antd.Table, _extends({}, lodash.omit(this.props, 'title'), {
        columns: this.columns,
        dataSource: this.dataSource,
        loading: isLoading,
        title: title ? this.getTitle : undefined
      }));
    }
  }, {
    key: "columns",
    get: function get() {
      return fieldSetsToColumns(this.props.fieldSets, this.props.model);
    }
  }, {
    key: "dataSource",
    get: function get() {
      return this.props.model.map(function (item, idx) {
        return _objectSpread({
          key: item.id || idx.toString()
        }, item);
      });
    }
  }]);

  return Table;
}(React.Component), (_applyDecoratedDescriptor(_class2$i.prototype, "columns", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$i.prototype, "columns"), _class2$i.prototype), _applyDecoratedDescriptor(_class2$i.prototype, "dataSource", [mobx.computed], Object.getOwnPropertyDescriptor(_class2$i.prototype, "dataSource"), _class2$i.prototype)), _class2$i)) || _class$l) || _class$l;

// Lower-level building blocks and helper components

exports.ArrayCard = ArrayCard;
exports.ButtonToolbar = ButtonToolbar;
exports.CARD_COL_LABEL = CARD_COL_LABEL;
exports.CARD_COL_VALUE = CARD_COL_VALUE;
exports.CX_PREFIX_SEARCH_CREATE = CX_PREFIX_SEARCH_CREATE;
exports.Card = Card;
exports.CardField = CardField;
exports.DEFAULT_DEBOUNCE_WAIT = DEFAULT_DEBOUNCE_WAIT;
exports.EditableArrayCard = EditableArrayCard;
exports.EditableCard = EditableCard;
exports.Form = Form;
exports.FormCard = FormCard;
exports.FormDrawer = FormDrawer;
exports.FormField = FormField;
exports.FormFieldSet = FormFieldSet;
exports.FormManager = FormManager;
exports.FormModal = FormModal;
exports.GuardedButton = GuardedButton;
exports.ID_ATTR = ID_ATTR;
exports.Info = Info;
exports.Label = Label;
exports.NestedFieldSet = NestedFieldSet;
exports.ObjectSearchCreate = ObjectSearchCreate;
exports.OptionSelect = OptionSelect;
exports.OptionSelectDisplay = OptionSelectDisplay;
exports.REGEXP_PHONE = REGEXP_PHONE;
exports.REGEXP_SSN = REGEXP_SSN;
exports.RadioGroup = RadioGroup;
exports.Rate = Rate;
exports.SummaryCard = SummaryCard;
exports.TYPES = TYPES;
exports.Table = Table;
exports.Value = Value;
exports.asyncNoop = asyncNoop;
exports.booleanToForm = booleanToForm;
exports.falseyToString = falseyToString;
exports.fieldSetsToColumns = fieldSetsToColumns;
exports.fillInFieldConfig = fillInFieldConfig;
exports.fillInFieldSet = fillInFieldSet;
exports.fillInFieldSets = fillInFieldSets;
exports.filterInsertIf = filterInsertIf;
exports.formPropsDefaults = formPropsDefaults;
exports.formatOptionSelect = formatOptionSelect;
exports.formatRating = formatRating;
exports.getFieldSetFields = getFieldSetFields;
exports.getFieldSetsFields = getFieldSetsFields;
exports.getOptions = getOptions;
exports.getUnsortedOptions = getUnsortedOptions;
exports.isFieldSetSimple = isFieldSetSimple;
exports.isPartialFieldSetSimple = isPartialFieldSetSimple;
exports.modelFromFieldConfigs = modelFromFieldConfigs;
exports.renderValue = renderValue;
