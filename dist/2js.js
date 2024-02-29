"use strict";
function isTypeOperatorFunction(value) {
    return typeof value === "function";
}
function isBrowser() {
    return typeof document !== "undefined";
}
function identityFunction(x) {
    return x;
}
var Component = (function () {
    function Component(data) {
        var operatorFunctions = {};
        Object.keys(data).forEach(function (key) {
            operatorFunctions[key] = isTypeOperatorFunction(data[key])
                ? data[key]
                : identityFunction;
        });
        var proxy = new Proxy(this, {
            get: function (target, prop) {
                var operatorFunction = operatorFunctions[prop];
                if (target[prop] === undefined) {
                    return undefined;
                }
                return operatorFunction(target[prop]);
            },
            set: function (target, prop, value) {
                if (!(prop in operatorFunctions)) {
                    operatorFunctions[prop] =
                        isTypeOperatorFunction(value)
                            ? value
                            : identityFunction;
                }
                var operatorFunction = operatorFunctions[prop];
                if (isTypeOperatorFunction(value)) {
                    operatorFunctions[prop] =
                        value;
                    return true;
                }
                var privateValue = operatorFunction(value);
                target[prop] = privateValue;
                var domValue = (privateValue === null || privateValue === void 0 ? void 0 : privateValue.toString)
                    ? privateValue.toString()
                    : privateValue;
                if (isBrowser()) {
                    var key = prop.toString();
                    if (key.startsWith("#") ||
                        key.startsWith(".") ||
                        key.startsWith("[")) {
                        var elements = document.querySelectorAll(key);
                        elements.forEach(function (element) {
                            element.innerHTML = domValue;
                        });
                        return privateValue;
                    }
                    var modelElements = document.querySelectorAll("[\\@".concat(key, "]"));
                    modelElements.forEach(function (element) {
                        element.innerHTML = domValue;
                    });
                }
                return privateValue;
            },
        });
        Object.assign(proxy, data);
        return proxy;
    }
    return Component;
}());
module.exports = Component;
