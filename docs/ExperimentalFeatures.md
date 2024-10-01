# Experimental Features

## Functional operatorators

```html
<input
    id="number-input"
    type="number"
    onchange="app.numberOutput = event.target.value"
    oninput="app.numberOutput = event.target.value"
/>
<h1>Double your number is: <span @numberOutput></span></h1>

<script>
    const app = new Component({
        numberOutput: (x) => x * 2,
    });
</script>
```

Every time `numberOutput` is updated, the function is applied to the new value

### Alternatives

```html
<input
    id="number-input"
    type="number"
    onchange="numberOutput(event.target.value)"
    oninput="numberOutput(event.target.value)"
/>
<h1>Double your number is: <span @numberOutput></span></h1>

<script>
    const app = new Component({
        numberOutput: (x) => x * 2,
    });
</script>
```

I don't like this approach as want to seperate class methods (called through `onclick='foo()'`) and stateful changes.

In my eyes, all stateful changes should be done through `x = y`, and functions with side effects should be `onclick='foo()'` where `foo` looks something like:

```html
<button onclick="app.foo()">Click Me!</button>

<script>
    const app = new Component({
        foo: () => alert("Hello World!"),
    });
</script>
```

## Flow dependencies (not implemented)

```js
const app = new Component({
    foo: 5,
    bar: () => a * 2,
});
```

Updating `foo` should also update references to `bar` (I think)

## Implicit two way data bindings (not implemented)

This is currently a WIP, I have not decided on this syntax

```html
<input @model />
<p>Hello <span @model></span></p>

<script>
    const app = new Component({
        model: "",
    });
</script>
```
