interface IComponent {
    [key: string]: any;
}

type ComponentData<T> = Record<string, T>;
type OperatorFunction<T> = (value: any) => T;

// a type guard for the operator function
// an operator function allows you to modify the value before it is set
function isTypeOperatorFunction<T>(
    value: T | OperatorFunction<T>,
): value is OperatorFunction<T> {
    return typeof value === "function";
}

function isBrowser(): boolean {
    return typeof document !== "undefined";
}

function identityFunction<T>(x: T): T {
    return x;
}

/**
 * @name Component
 * @interface IComponent
 *
 * A reactive state that can be bound to DOM elements
 */
class Component<T> implements IComponent {
    public constructor(data: ComponentData<T>) {
        const operatorFunctions: Record<string, OperatorFunction<T>> = {};

        Object.keys(data).forEach((key) => {
            operatorFunctions[key] = isTypeOperatorFunction(data[key])
                ? (data[key] as OperatorFunction<T>)
                : (identityFunction as OperatorFunction<T>);
        });

        const proxy = new Proxy(this, {
            get(target, prop) {
                const operatorFunction =
                    operatorFunctions[prop as keyof typeof operatorFunctions];

                // this will trigger if there is no operator function (internal error)
                // or if there is no value on the object
                // TODO: use native JS functionality for this check
                if (target[prop as keyof typeof target] === undefined) {
                    return undefined;
                }

                return operatorFunction(target[prop as keyof typeof target]);
            },
            //@ts-ignore
            set(target, prop, value) {
                if (!(prop in operatorFunctions)) {
                    operatorFunctions[prop as keyof typeof operatorFunctions] =
                        isTypeOperatorFunction(value)
                            ? value
                            : identityFunction;
                }

                const operatorFunction =
                    operatorFunctions[prop as keyof typeof operatorFunctions];

                if (isTypeOperatorFunction(value)) {
                    operatorFunctions[prop as keyof typeof operatorFunctions] =
                        value;
                    return true;
                }

                const privateValue = operatorFunction(value);

                target[prop as keyof typeof target] = privateValue as any;

                const domValue: string = privateValue?.toString
                    ? privateValue.toString()
                    : (privateValue as string);

                // in certain cases (eg. using 2.js inside another SSR framework)
                // you may only want the 2.js reactivity and not DOM bindings
                // therefore, we check if the document exists before binding
                if (isBrowser()) {
                    const key = prop.toString();

                    // binding by document attributes (preferred)
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

                        return true;
                    }

                    // custom @key binded attributes
                    // this is a special functionality case of 2.js
                    const modelElements = document.querySelectorAll(
                        `[\\@${key}]`,
                    );
                    modelElements.forEach((element) => {
                        element.innerHTML = domValue;
                    });
                }

                return true;
            },
        });

        // we do this last so that it triggers the proxy setters
        Object.assign(proxy, data);

        return proxy;
    }
}

module.exports = Component;
