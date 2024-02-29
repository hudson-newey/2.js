"use strict";
class Template {
    template;
    constructor(template) {
        this.template = template;
    }
    render(data) {
        return this.template.replace(/\{\{[ ]*(\w+)[ ]*\}\}/g, (_, key) => {
            return data[key];
        });
    }
}
