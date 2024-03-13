import { TemplateChangeCycle, TemplateChange, domSelector } from "./changes";

export type ChangeOptimization = (
    change: TemplateChangeCycle,
) => TemplateChangeCycle;

// TODO: we are currently querying every DOM element twice during every change cycle
// we should optimize this so that we only query the DOM once
export function defaultOptimization(
    changes: TemplateChangeCycle,
): TemplateChangeCycle {
    // filter out all elements that don't have a corresponding DOM element
    const changesWithDomElements = changes.filter((change: TemplateChange) =>
        Object.keys(change).every(
            (selector) =>
                document.querySelector(domSelector(selector)) !== null,
        ),
    );

    return changesWithDomElements;
}
