// used to demonstrate for loops in templates
const styles = [
  "./inputComponent/inputComponent.css",
  "./inputComponent/printStyles.css",
];

const inputComponent = new Component({
  template: `
        ${
            // "JSX like" style templating
            styles.map(
                (styleUrl) => "<link rel='stylesheet' href='" + styleUrl + "' />"
            ).join("")
        }
        <input class="customInputComponent" type="text" placeholder="Enter your name" />
    `,
});
