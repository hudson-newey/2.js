"use strict";
function isTypeOperatorFunction(value) {
    return typeof value === "function";
}
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
                    var domValue = (privateValue === null || privateValue === void 0 ? void 0 : privateValue.toString) ? privateValue.toString()
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
                    var modelElements = document.querySelectorAll("[\\@" + key + "]");
                    modelElements.forEach(function (element) {
                        element.innerHTML = domValue;
                    });
                }
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
