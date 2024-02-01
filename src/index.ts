interface IComponent {
  [key: string]: any;
}

type ComponentData<T> = Record<string, T>;
type OperatorFunction<T> = (value: any) => T;

// a type guard for the operator function
// an operator function allows you to modify the value before it is set
function isTypeOperatorFunction<T>(
  value: T | OperatorFunction<T>
): value is OperatorFunction<T> {
  return typeof value === "function";
}

/**
 * @name Component
 * @interface IComponent
 */
class Component<T> implements IComponent {
  constructor(data: ComponentData<T>) {
    Object.keys(data).forEach((key: string) => {
      let privateValue: T | OperatorFunction<T> =
        data[key as keyof typeof data];

      const identityFunction = (x: T) => x;
      const operatorFunction: OperatorFunction<T> = isTypeOperatorFunction(
        privateValue
      )
        ? privateValue
        : identityFunction;

      Object.defineProperty(this, key, {
        // called when methods are called
        get(): T {
          // this typeguard is not needed, but TS doesn't know that
          if (!isTypeOperatorFunction(privateValue)) {
            return privateValue;
          }

          return undefined as T;
        },
        set(value: T): void {
          privateValue = operatorFunction(value);
          const domValue = privateValue?.toString
            ? privateValue.toString()
            : privateValue as string;

          // binding by document attributes (prefered)
          if (
            key.startsWith("#") ||
            key.startsWith(".") ||
            key.startsWith("[")
          ) {
            const elements: NodeListOf<HTMLElement> =
              document.querySelectorAll(key);

            elements.forEach((element: HTMLElement) => {
              element.innerHTML = domValue;
            });

            return;
          }

          // custom @key binded attributes
          const modelElements = document.querySelectorAll(`[\\@${key}]`);
          modelElements.forEach((element) => {
            element.innerHTML = domValue;
          });
        },
      });
    });

    // remove all functional properties from the data object
    Object.keys(data).forEach((key: string) => {
      if (isTypeOperatorFunction(data[key])) {
        delete data[key];
      }
    });

    // we do this last so that it triggers the setters
    Object.assign(this, data);
  }
}
