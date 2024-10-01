import { Component } from "../../../src/2js";
import { map } from "../../../src/helpers/map";

// used to demonstrate for loops in templates
const styles = [
    "./inputComponent/inputComponent.css",
    "./inputComponent/printStyles.css",
];

export const inputComponent = new Component({
    template: `
        ${
            // "JSX like" style templating
            map(
                styles,
                (styleUrl) => `<link rel="stylesheet" href="${styleUrl}" />`,
            )
        }
        <input class="customInputComponent" type="text" placeholder="Enter your name" />
    `,
});
