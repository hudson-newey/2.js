interface IComponent {
    [key: string]: any;
}
declare namespace TwoJS {
    type ComponentData<T> = Record<string, T>;
    type OperatorFunction<T> = (value: any) => T;
    class Component<T> implements IComponent {
        constructor(data: ComponentData<T>);
    }
}
export type ComponentData<T> = TwoJS.ComponentData<T>;
export type OperatorFunction<T> = TwoJS.OperatorFunction<T>;
export declare const Component: typeof TwoJS.Component;
export {};
//# sourceMappingURL=2js.d.ts.map