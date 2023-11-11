class Component {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      let privateValue = data[key];

      const identityFunction = (x) => x;
      const operatorFunction =
        typeof privateValue === "function" ? privateValue : identityFunction;

      Object.defineProperty(this, key, {
        // called when methods are called
        get() {
          return privateValue;
        },
        set(value) {
          privateValue = operatorFunction(value);

          // binding by DOM attributes
          if (
            key.startsWith("#") ||
            key.startsWith(".") ||
            key.startsWith("[")
          ) {
            const elements = document.querySelectorAll(key);

            elements.forEach((element) => {
              element.innerHTML = privateValue;
            });

            return;
          }

          // custom @key binded attributes
          const modelElements = document.querySelectorAll(`[\\@${key}]`);
          modelElements.forEach((element) => {
            element.innerHTML = privateValue;
          });
        },
      });
    });

    // remove all functional properties from the data object
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "function") {
        delete data[key];
      }
    });

    // we do this last so that it triggers the setters
    Object.assign(this, data);
  }
}
