(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isTypeOperatorFunction(value) {
        return typeof value === "function";
    }
    var TwoJS;
    (function (TwoJS) {
        var Component = (function () {
            function Component(data) {
                var _this = this;
                Object.keys(data).forEach(function (key) {
                    var privateValue = data[key];
                    var identityFunction = function (x) { return x; };
                    var operatorFunction = isTypeOperatorFunction(privateValue)
                        ? privateValue
                        : identityFunction;
                    Object.defineProperty(_this, key, {
                        get: function () {
                            if (!isTypeOperatorFunction(privateValue)) {
                                return privateValue;
                            }
                            return undefined;
                        },
                        set: function (value) {
                            privateValue = operatorFunction(value);
                            var domValue = (privateValue === null || privateValue === void 0 ? void 0 : privateValue.toString)
                                ? privateValue.toString()
                                : privateValue;
                            if (key.startsWith("#") ||
                                key.startsWith(".") ||
                                key.startsWith("[")) {
                                var elements = document.querySelectorAll(key);
                                elements.forEach(function (element) {
                                    element.innerHTML = domValue;
                                });
                                return;
                            }
                            var modelElements = document.querySelectorAll("[\\@".concat(key, "]"));
                            modelElements.forEach(function (element) {
                                element.innerHTML = domValue;
                            });
                        },
                    });
                });
                Object.keys(data).forEach(function (key) {
                    if (isTypeOperatorFunction(data[key])) {
                        delete data[key];
                    }
                });
                Object.assign(this, data);
            }
            return Component;
        }());
        TwoJS.Component = Component;
    })(TwoJS || (TwoJS = {}));
});
