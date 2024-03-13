import { ChangeOptimization, defaultOptimization } from "./optimizations";

export type TemplateChangeCycle = TemplateChange[];

// by specifying a template change as a record of template selectors and templates
// we don't have to re-render the component every time the template changes
// we can conditionally render sub-elements in a component depending on if it has been updated
export type TemplateChange = Record<TemplateSelector, Template>;

// template selectors are DOM query selectors
export type TemplateSelector = string;
export type Template = string;

export function executeTemplateChange(change: TemplateChange): boolean {
    const optimizedChange: TemplateChangeCycle = optimizeChangeRequest(change);

    return executeTemplateChangeCycle(optimizedChange);
}

// I haven't exposed this because if your manually defining a change cycle
// either:
// 1. you are doing something very wrong
// 2. we are doing something very wrong
function executeTemplateChangeCycle(changes: TemplateChangeCycle): boolean {
    for (const change of changes) {
        for (const [selector, template] of Object.entries(change)) {
            const elements = templateElements(selector);

            elements?.forEach((element) => {
                element.innerHTML = template;
            });
        }
    }

    return true;
}

function optimizeChangeRequest(
    change: TemplateChange | TemplateChangeCycle,
    optimization: ChangeOptimization = defaultOptimization,
): TemplateChangeCycle {
    const changeCycles = Array.isArray(change)
        ? change
        : [change];

    return optimization(changeCycles);
}

// because 2.js adds support for a custom @selector attribute
export function domSelector(selector: TemplateSelector): TemplateSelector {
    const isDomSelector =
        selector.startsWith("#") ||
        selector.startsWith(".") ||
        selector.startsWith("[");
    return isDomSelector ? selector : `[\\@${selector}]`;
}

function templateElements(
    selector: TemplateSelector,
): NodeListOf<HTMLElement> {
    const twoJsSelector = domSelector(selector);
    return document.querySelectorAll(twoJsSelector) ?? [];
}
