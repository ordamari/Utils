"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var global_util_1 = require("@/common/utils/global.util");
var react_1 = require("react");
var useToggle_1 = require("../../hooks/useToggle");
var useTranslation_1 = require("../../hooks/useTranslation");
var read_more_less_module_scss_1 = require("./read-more-less.module.scss");
var initialOptions = {
    limit: 300,
    min: 0
};
function ReadMoreLess(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c, _d = _a.highlightClassName, highlightClassName = _d === void 0 ? '' : _d, _e = _a.highlightStyle, highlightStyle = _e === void 0 ? {} : _e, _f = _a.options, options = _f === void 0 ? {} : _f, sideEffect = _a.sideEffect;
    var _g = __assign(__assign({}, initialOptions), options), limit = _g.limit, min = _g.min;
    var _h = useToggle_1.useToggle(), isShowFullText = _h[0], toggleIsShowFullText = _h[1];
    var t = useTranslation_1["default"]();
    var isNeeded = children.length > limit;
    var shortText = react_1.useMemo(function () {
        var spaceIndexes = min >= limit
            ? []
            : global_util_1.globalUtil.findSpaceIndexesBetweenPoints(children, min, limit);
        return children.slice(0, spaceIndexes.length ? spaceIndexes[spaceIndexes.length - 1] : limit);
    }, [children, limit, min]);
    var handleToggleIsShowFullText = sideEffect
        ? global_util_1.globalUtil.callFnsInSequence(toggleIsShowFullText, sideEffect)
        : toggleIsShowFullText;
    if (!isNeeded)
        return (React.createElement("span", { className: read_more_less_module_scss_1["default"]['read-more-less'] + "  " + className, style: style }, children));
    return (React.createElement("span", { className: read_more_less_module_scss_1["default"]['read-more-less'] + "  " + className, style: style },
        isShowFullText ? children : shortText,
        React.createElement("button", { onClick: handleToggleIsShowFullText.bind(null, !isShowFullText) },
            isShowFullText ? ' ' : '... ',
            React.createElement("span", { className: read_more_less_module_scss_1["default"].highlight + " " + highlightClassName, style: highlightStyle }, t("general." + (isShowFullText ? 'read-less' : 'read-more'))))));
}
exports["default"] = ReadMoreLess;
