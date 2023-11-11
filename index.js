class Component {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      let privateValue = this[key];
      
      Object.defineProperty(this, key, {
        get() {
          return privateValue;
        },
        set(value) {
          privateValue = value;

          // binding by DOM attributes
          if (key.startsWith("#") || key.startsWith(".") || key.startsWith("[")) {
            const elements = document.querySelectorAll(key);

            elements.forEach((element) => {
              element.innerHTML = value;
            });

            return;
          }

          // custom @key binded attributes
          const modelElements = document.querySelectorAll(`[\\@${key}]`);
          modelElements.forEach((element) => {
            element.innerHTML = value;
          });
        },
      });
    });

    // we do this last so that it triggers the setters
    Object.assign(this, data);
  }
}
