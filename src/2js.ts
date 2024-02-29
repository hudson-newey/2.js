interface IComponent {
    [key: string]: any;
}

// a type guard for the operator function
// an operator function allows you to modify the value before it is set
function isTypeOperatorFunction<T>(
    value: T | OperatorFunction<T>
): value is OperatorFunction<T> {
    return typeof value === "function";
}

function isBrowser(): boolean {
    return typeof document !== "undefined";
}

type ComponentData<T> = Record<string, T>;
type OperatorFunction<T> = (value: any) => T;


const identityFunction = <T>(x: T) => x;

/**
 * @name Component
 * @interface IComponent
 *
 * A reactive state that can be bound to DOM elements
 */
class Component<T> implements IComponent {
    public constructor(data: ComponentData<T>) {
        Object.keys(data).forEach((key: string) => {
            let privateValue: T | OperatorFunction<T> =
                data[key as keyof typeof data];

            const operatorFunction: OperatorFunction<T> =
                isTypeOperatorFunction(privateValue)
                    ? privateValue
                    : identityFunction<T>;

            Object.defineProperty(this, key, {
                // called when methods are called
                get(): T {
                    if (!isTypeOperatorFunction(privateValue)) {
                        return privateValue;
                    }

                    return undefined as T;
                },
                set(value: T): T {
                    privateValue = operatorFunction(value) satisfies T;
                    const domValue: string = privateValue?.toString
                        ? privateValue.toString()
                        : (privateValue as string);

                    // in certain cases (eg. using 2.js inside another SSR framework)
                    // you may only want the 2.js reactivity and not DOM bindings
                    // therefore, we check if the document exists before binding
                    if (isBrowser()) {
                        // binding by document attributes (preferred)
                        if (
                            key.startsWith("#") ||
                            key.startsWith(".") ||
                            key.startsWith("[")
                        ) {
                            const elements: NodeListOf<HTMLElement> = document.querySelectorAll(key);

                            elements.forEach((element: HTMLElement) => {
                                element.innerHTML = domValue;
                            });

                            return privateValue;
                        }

                        // custom @key binded attributes
                        // this is a special functionality case of 2.js
                        const modelElements = document.querySelectorAll(
                            `[\\@${key}]`
                        );
                        modelElements.forEach((element) => {
                            element.innerHTML = domValue;
                        });
                    }

                    return privateValue;
                },
            });
        });

        // remove all operator functions from this objects value
        Object.keys(data).forEach((key: string) => {
            if (isTypeOperatorFunction(data[key])) {
                delete data[key];
            }
        });

        // we do this last so that it triggers the setters
        Object.assign(this, data);
    }
}

module.exports = Component;
