"use strict";
var Template = (function () {
    function Template(template) {
        this.template = template;
    }
    Template.prototype.render = function (data) {
        return this.template.replace(/\{\{[ ]*(\w+)[ ]*\}\}/g, function (_, key) {
            return data[key];
        });
    };
    return Template;
}());
