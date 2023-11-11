"use strict";
var Component = (function () {
    function Component(data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            var privateValue = data[key];
            var identityFunction = function (x) { return x; };
            var operatorFunction = typeof privateValue === "function" ? privateValue : identityFunction;
            Object.defineProperty(_this, key, {
                get: function () {
                    return privateValue;
                },
                set: function (value) {
                    privateValue = operatorFunction(value);
                    if (key.startsWith("#") ||
                        key.startsWith(".") ||
                        key.startsWith("[")) {
                        var elements = document.querySelectorAll(key);
                        elements.forEach(function (element) {
                            element.innerHTML = privateValue;
                        });
                        return;
                    }
                    var modelElements = document.querySelectorAll("[\\@" + key + "]");
                    modelElements.forEach(function (element) {
                        element.innerHTML = privateValue;
                    });
                }
            });
        });
        Object.keys(data).forEach(function (key) {
            if (typeof data[key] === "function") {
                delete data[key];
            }
        });
        Object.assign(this, data);
    }
    return Component;
}());
