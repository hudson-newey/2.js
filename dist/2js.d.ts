interface IComponent {
    [key: string]: any;
}
type ComponentData<T> = Record<string, T>;
type OperatorFunction<T> = (value: any) => T;
declare function isTypeOperatorFunction<T>(value: T | OperatorFunction<T>): value is OperatorFunction<T>;
declare class Component<T> implements IComponent {
    constructor(data: ComponentData<T>);
}
//# sourceMappingURL=2js.d.ts.map