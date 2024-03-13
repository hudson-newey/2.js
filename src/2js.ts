import { executeTemplateChange, TemplateChange } from "./changes/changes";

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
    // TODO: this should be more strict
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
 * Reactive state that can be bound to DOM elements
 */
class Component<T> implements IComponent {
    public constructor(data: ComponentData<T>) {
        const operatorFunctions: Record<string, OperatorFunction<T>> = {};

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                operatorFunctions[key] = isTypeOperatorFunction(data[key])
                    ? (data[key] as OperatorFunction<T>)
                    : identityFunction<T>;
            }
        }

        const proxy = new Proxy(this, {
            get(target, prop) {
                const operatorFunction =
                    operatorFunctions[prop as keyof typeof operatorFunctions];

                // if it is just a function, execute the function and return the result
                if (target[prop as keyof typeof target] === undefined) {
                    return operatorFunction;
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

                    // create a component change request
                    const changeRequest: TemplateChange = { [key]: domValue };

                    const isTemplateStable: boolean =
                        executeTemplateChange(changeRequest);

                    if (!isTemplateStable) {
                        console.warn(`Template is unstable after change to ${key}`);
                        console.warn("This may lead to bugs in your application.");
                    }
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
