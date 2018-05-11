"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("../style/Highlight.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Highlight = function (_Component) {
  _inherits(Highlight, _Component);

  function Highlight() {
    _classCallCheck(this, Highlight);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Highlight.prototype.render = function render() {
    var _props = this.props,
        position = _props.position,
        onClick = _props.onClick,
        onMouseOver = _props.onMouseOver,
        onMouseOut = _props.onMouseOut,
        comment = _props.comment,
        isScrolledTo = _props.isScrolledTo,
        highlightIndex = _props.highlightIndex,
        highlightColor = _props.highlightColor;
    var rects = position.rects,
        boundingRect = position.boundingRect;


    return _react2.default.createElement(
      "div",
      {
        className: "Highlight " + (isScrolledTo ? "Highlight--scrolledTo" : "")
      },
      comment ? _react2.default.createElement(
        "div",
        {
          className: "Highlight__emoji",
          style: {
            left: 20,
            top: boundingRect.top
          }
        },
        comment.emoji
      ) : null,
      _react2.default.createElement(
        "div",
        { className: "Highlight__parts" },
        rects.map(function (rect, index) {
          return _react2.default.createElement(
            "div",
            { className: "Highlight__part-container", style: rect, key: index },
            highlightIndex !== null && highlightIndex !== undefined && index == 0 && _react2.default.createElement(
              "div",
              {
                className: "Highlight__text-container",
                key: highlightIndex
              },
              _react2.default.createElement(
                "p",
                { className: "Highlight__text-node" },
                (highlightIndex + 1).toString()
              )
            ),
            _react2.default.createElement("div", {
              onMouseOver: onMouseOver,
              onMouseOut: onMouseOut,
              onClick: onClick,
              style: _extends({}, rect, {
                background: highlightColor ? highlightColor : "rgba(255, 226, 143, 1)"
              }),
              className: "Highlight__part"
            })
          );
        })
      )
    );
  };

  return Highlight;
}(_react.Component);

exports.default = Highlight;
module.exports = exports["default"];