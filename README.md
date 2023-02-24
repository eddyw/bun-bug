# Problem

Bun seems to only work if `node_modules` directory is removed.

**Bun Version:** 0.5.7

**OS Version:** MacOS Ventura 13.2.1 (22D68)

**Processor:** 2.4 GHz 8-Core Intel Core i9

# Steps to reproduce

Clone the repository, then execute the following commands to install and run the `index.mts` script:

```bash
$ bun install
$ bun index.mts
```

Running `index.mts` errors with:

```
35 |     }
36 | };
37 | import { BindingScopeEnum } from "../inversify";
38 | import { isPromise } from "../utils/async";
39 | export var tryGetFromScope = function (requestScope, binding) {
40 |     if ((binding.scope === BindingScopeEnum.Singleton) && binding.activated) {
                               ^
TypeError: undefined is not an object (evaluating 'BindingScopeEnum.Singleton')
      at /<REDACTED>/bun-bug/node_modules/inversify/es/scope/scope.js:40:27
      at /<REDACTED>/bun-bug/node_modules/inversify/es/resolution/resolver.js:95:17
      at /<REDACTED>/bun-bug/node_modules/inversify/es/container/container.js:600:25
      at /<REDACTED>/bun-bug/node_modules/inversify/es/container/container.js:359:27
      at step (/<REDACTED>/bun-bug/node_modules/inversify/es/container/container.js:43:17)
      at /<REDACTED>/bun-bug/node_modules/inversify/es/container/container.js:18:8
      at /<REDACTED>/bun-bug/node_modules/inversify/es/container/container.js:14:11
      at /<REDACTED>/bun-bug/index.mts:10:0
```

Now, execute the following command:

```bash
$ rm -rf node_modules/
$ bun index.mts
```

It executes the script successfully and prints in the terminal:

```
Hello bun
```

# Notes

You can see in the stack trace where the error is happening. There is this if statement:

```js
     if ((binding.scope === BindingScopeEnum.Singleton) && binding.activated) {
```

The `BindingScopeEnum` is imported from:

```js
import { BindingScopeEnum } from "../inversify";
```

In `inversify.js` is defined as:

```js
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};

// ... code and more code

export { BindingScopeEnum }
```

This work in Node.js if executed with `ts-node` (TypeScript), `ts-node --swc` (use SWC compiler) and `tsx` (esbuild):

```bash
$ ts-node --esm index.mts # (TypeScript compiler) Works
$ ts-node --swc --esm index.mts # (SWC Compiler) Works
$ tsx index.mts # (esbuild) Works
```
