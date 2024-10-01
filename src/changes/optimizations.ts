import { TemplateChangeCycle } from "./changes";

export type ChangeOptimization = (
    change: TemplateChangeCycle,
) => TemplateChangeCycle;

// Todo: We should figure out what optimizations to use here
export function defaultOptimization(
    changes: TemplateChangeCycle,
): TemplateChangeCycle {
    return changes;
}
