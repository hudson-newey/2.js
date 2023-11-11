# 2.js

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
