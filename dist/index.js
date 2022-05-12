'use strict';

var React = require('react');
var ResizeObserver = require('resize-observer-polyfill');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ResizeObserver__default = /*#__PURE__*/_interopDefaultLegacy(ResizeObserver);

var TruncatedList = function (_a) {
    var renderTruncator = _a.renderTruncator, alwaysShowTruncator = _a.alwaysShowTruncator, alwaysShowFirst = _a.alwaysShowFirst, children = _a.children, className = _a.className, itemClassName = _a.itemClassName, truncatorClassName = _a.truncatorClassName, style = _a.style;
    var containerRef = React.useRef(null);
    React.useLayoutEffect(function () {
        var truncate = function () {
            if (!containerRef.current)
                return;
            containerRef.current.style.overflow = "hidden";
            var childNodes = Array.from(containerRef.current.children);
            for (var _i = 0, childNodes_1 = childNodes; _i < childNodes_1.length; _i++) {
                var node = childNodes_1[_i];
                node.hidden = true;
            }
            if (childNodes.length === 0) {
                return;
            }
            var i; // Declare outside the loop so we can check it afterward
            for (i = 1; i < childNodes.length; i += 2) {
                var itemEl = childNodes[i];
                var truncatorEl = childNodes[i + 1];
                itemEl.hidden = false;
                truncatorEl.hidden = false;
                var truncatorRect = truncatorEl.getBoundingClientRect();
                var containerRect = containerRef.current.getBoundingClientRect();
                truncatorEl.hidden = true;
                if (i <= 1 && alwaysShowFirst) {
                    continue;
                }
                // If truncator is outside of the container
                if (truncatorRect.bottom > containerRect.bottom ||
                    truncatorRect.right > containerRect.right) {
                    itemEl.hidden = true;
                    if (i >= 1) {
                        childNodes[i - 1].hidden = false;
                    }
                    break;
                }
            }
            // If all items were inside the container but we still wish to show the truncator
            if (i === childNodes.length && alwaysShowTruncator) {
                childNodes[childNodes.length - 1].hidden = false;
            }
        };
        truncate();
        var resizeObserver = new ResizeObserver__default["default"](function (entries) {
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                entries_1[_i];
                truncate();
            }
        });
        // Copy to a variable so the ref in the cleanup effect targets the correct node
        var containerEl = containerRef.current;
        if (containerEl) {
            resizeObserver.observe(containerEl);
        }
        return function () {
            if (containerEl) {
                resizeObserver.unobserve(containerEl);
            }
        };
    }, [children, alwaysShowTruncator, className, style]);
    var childArray = React__default["default"].Children.toArray(children);
    var getTruncator = function (i) { return (React__default["default"].createElement("li", { className: truncatorClassName, hidden: true }, renderTruncator({ hiddenItemsCount: i }))); };
    var items = childArray.map(function (item, i) { return (React__default["default"].createElement(React__default["default"].Fragment, { key: "" + item + i },
        React__default["default"].createElement("li", { className: itemClassName }, item),
        getTruncator(childArray.length - 1 - i))); });
    return (React__default["default"].createElement("ul", { ref: containerRef, className: "react-truncate-list " + (className || ""), style: style },
        getTruncator(childArray.length),
        items));
};

module.exports = TruncatedList;
