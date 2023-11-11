# 2.js

A highly effcient **work in progress prototype** to bring reactive state to JavaScript with minimal overhead and bundle size

## Syntax

### Minimal Increment-Decrement Counter

```html
<p>Count: <span id="count-output"></span></p>
<button onclick="page['#count-output']++">Increment</button>
<button onclick="page['#count-output']--">Decrement</button>

<script>
    const page = new Component({
        "#count-output": 0,
    });
</script>
```

OR

```html
<p>Count: <span @count></span></p>
<button onclick="page.count++">Increment</button>
<button onclick="page.count--">Decrement</button>

<script>
    const page = new Component({
        count: 0,
    });
</script>
```

### Collapsable Elements

```html
<button onclick="app.toggleElement()">Click Me</button>
<div @collapsableElement></div>

<script>
    const app = new Component({
        collapsableElement: null,
        toggleElement: () =>
            app.collapsableElement = app.collapsableElement ? null : "<h1>Hello World</h1>",
    });
</script>
```

### Single Page Application (SPA)

```html
<main>
    <nav>
        <button onclick="app.setPage(homePage)">Home</button>
        <button onclick="app.setPage(aboutPage)">About</button>
    </nav>

    <div>
        <h1 @name></h1>
        <p @description></p>
    </div>
</main>

<script>
    const homePage = {
        name: "Home",
        description: "This is the home page",
    };

    const aboutPage = {
        name: "About",
        description: "About this company",
    };

    const app = new Component({
        name: homePage.name,
        description: homePage.description,
        setPage: (value) => {
            app.name = value.name;
            app.description = value.description;
        },
    });
</script>
```
