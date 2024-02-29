"use strict";
function isTypeOperatorFunction(value) {
    return typeof value === "function";
}
function isBrowser() {
    return typeof document !== "undefined";
}
const identityFunction = (x) => x;
class Component {
    constructor(data) {
        Object.keys(data).forEach((key) => {
            let privateValue = data[key];
            const operatorFunction = isTypeOperatorFunction(privateValue)
                ? privateValue
                : identityFunction;
            Object.defineProperty(this, key, {
                get() {
                    if (!isTypeOperatorFunction(privateValue)) {
                        return privateValue;
                    }
                    return undefined;
                },
                set(value) {
                    privateValue = operatorFunction(value);
                    const domValue = privateValue?.toString
                        ? privateValue.toString()
                        : privateValue;
                    if (isBrowser()) {
                        if (key.startsWith("#") ||
                            key.startsWith(".") ||
                            key.startsWith("[")) {
                            const elements = document.querySelectorAll(key);
                            elements.forEach((element) => {
                                element.innerHTML = domValue;
                            });
                            return privateValue;
                        }
                        const modelElements = document.querySelectorAll(`[\\@${key}]`);
                        modelElements.forEach((element) => {
                            element.innerHTML = domValue;
                        });
                    }
                    return privateValue;
                },
            });
        });
        Object.keys(data).forEach((key) => {
            if (isTypeOperatorFunction(data[key])) {
                delete data[key];
            }
        });
        Object.assign(this, data);
    }
}
module.exports = Component;
