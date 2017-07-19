# htap

A simple function to work with paths in a cross-platform manner.

Package has no runtime dependecies, and does not use any environment-specific APIs (e.g. `path` in Node.js).
It is ready to be used in any ES5 JavaScript environment.

**htap** (*`path` reversed*) is a utility function that **normalizes** and **joins** absolute and relative paths.

```ts
function htap(...path: string[]): string
```

It accepts a variable number of paths, each can:
- be relative, or have relative parts in it.
- contain Unix-style (`/`), Windows-style (`\`), or even mixed path separators.

It outputs a single deterministic path and:
- coverts separators to a unified, Unix-style (`/`). Multiple consecutive separators become one.
- maintains relative-ness (`./` or `../`) at the beginning of the path.
- maintains root slash (`/`) at the beginning of the path.
- normalizes any `/./` and `/../` at the middle of the path.
- removes trailing separtors (except for `/`).

## Getting started

**htap** is published to the public **npm** registry.

You can add it to your project using your npm client of choice (e.g. `yarn add htap`).

Then, it can be used as follows:
```ts
import { htap } from 'htap';

const normalizedPath = htap('/path/../to/./normalize', './or\\even\\more\\');
// normalizedPath === '/to/normalize/or/even/more'
```

## Why **htap**?

I needed an isomorphic, deterministic path normalization and joining solution that properly handles user-defined absolute/relative paths.
My use-case involved module resolution, as well as using the paths as cache keys for rather expensive operations.

## How **htap**?

Source is strictly-typed using TypeScript, fully-tested using Mocha and Chai, and transpiles into ES5 JavaScript with source-maps and typings.

## Development

`yarn test` - runs tests directly from source using Mocha. Use `yarn test -- -w` for watch-mode.

`yarn build` - compiles `src` folder into `lib`, for library publishing and consumption.

## License

MIT
