export interface IComponent {
  [key: string]: any;
}

export type ComponentData = Record<string, unknown>;
export type OperatorFunction<T> = (value: any) => T;
