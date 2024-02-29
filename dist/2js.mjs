function isTypeOperatorFunction(value) {
  return typeof value === "function";
}
function isBrowser() {
  return typeof document !== "undefined";
}
function identityFunction(x) {
  return x;
}
class Component {
  constructor(data) {
    const operatorFunctions = {};
    Object.keys(data).forEach((key) => {
      operatorFunctions[key] = isTypeOperatorFunction(data[key]) ? data[key] : identityFunction;
    });
    const proxy = new Proxy(this, {
      get(target, prop) {
        const operatorFunction = operatorFunctions[prop];
        if (target[prop] === void 0) {
          return void 0;
        }
        return operatorFunction(target[prop]);
      },
      //@ts-ignore
      set(target, prop, value) {
        if (!(prop in operatorFunctions)) {
          operatorFunctions[prop] = isTypeOperatorFunction(value) ? value : identityFunction;
        }
        const operatorFunction = operatorFunctions[prop];
        if (isTypeOperatorFunction(value)) {
          operatorFunctions[prop] = value;
          return true;
        }
        const privateValue = operatorFunction(value);
        target[prop] = privateValue;
        const domValue = (privateValue == null ? void 0 : privateValue.toString) ? privateValue.toString() : privateValue;
        if (isBrowser()) {
          const key = prop.toString();
          if (key.startsWith("#") || key.startsWith(".") || key.startsWith("[")) {
            const elements = document.querySelectorAll(key);
            elements.forEach((element) => {
              element.innerHTML = domValue;
            });
            return true;
          }
          const modelElements = document.querySelectorAll(
            `[\\@${key}]`
          );
          modelElements.forEach((element) => {
            element.innerHTML = domValue;
          });
        }
        return true;
      }
    });
    Object.assign(proxy, data);
    return proxy;
  }
}
module.exports = Component;
