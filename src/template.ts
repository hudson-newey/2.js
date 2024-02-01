interface ITemplate {
    [key: string]: any;
    render(data: Record<string, any>): string;
}

class Template {
    constructor(protected template: string) {}

    public render(data: Record<string, any>): string {
        return this.template.replace(/\{\{[ ]*(\w+)[ ]*\}\}/g, (_, key) => {
            return data[key];
        });
    }
}
