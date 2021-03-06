
# What is a stub

It's a fake or mock implementation of a real function.

# When to use stubs

Stubs are useful in unit testing to deal with the software that we have marginally less control over.  
For example: network, filesystem, process operations and so on. In other words, things that depend on external resources.

Let's take a look at an example:

```javascript
function draw(err) {
  if (err) {
    process.exit(1)
  }
}
```

In the `draw` function, if `err` is truthy the process exits with code `1`.
The problem with testing this function in a test environment is that it will **exit your test process**.

To fix that, I like to make the function receive stubs in the last argument if the user wants to override that functions inner things:

```javascript
function draw(err, stubs = {}) {
  const { p = process } = stubs
  if (err) {
    p.exit(1)
  }
}
```

Then, when you're testing, you pass a stub function as `p`. In this case we use `dummee`:
```javascript
const stub = require('dummee')

const p = {
  exit: stub()
}
draw('something went wrong', { p })
p.exit // => { calls: [{ args: [1] }] }
```

Now the function is unit-testable.

If you want the stub argument to not be as visibile, you can get it from the `arguments` object.

```javascript
function draw(err) {
  const { p = process } = arguments[1] || {}
  ...
}
```

# When to not use stub

Don't stub functions that don't deal with external resources.  
Overusing stub can results in too optimistic tests.

If function `a` depends on function `b`, and function `b` doesn't depend on external resources, then there's no need to stub `b` in `a`.
