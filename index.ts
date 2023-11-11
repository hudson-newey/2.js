interface IComponent {
  [key: string]: any;
}

class Component {
  constructor(data: Record<string, unknown>) {
    Object.keys(data).forEach((key: string) => {
      let privateValue: any = data[key as keyof typeof data];

      const identityFunction = (x: unknown) => x;
      const operatorFunction: Function =
        typeof privateValue === "function" ? privateValue : identityFunction;

      Object.defineProperty(this, key, {
        // called when methods are called
        get(): unknown {
          return privateValue;
        },
        set(value): void {
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
