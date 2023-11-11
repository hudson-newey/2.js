# 2.js

## Syntax

### Minimal Increment-Decrement Counter

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
