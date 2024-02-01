interface ITemplate {
    [key: string]: any;
    render(data: Record<string, any>): string;
}
declare class Template {
    protected template: string;
    constructor(template: string);
    render(data: Record<string, any>): string;
}
//# sourceMappingURL=template.d.ts.map