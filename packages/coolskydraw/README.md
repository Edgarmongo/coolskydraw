# Coolskydraw

**Coolskydraw** is exported as a React component that you can embed directly in your app.

## Installation

Install the package together with its React peer dependencies.

```bash
npm install react react-dom @coolskydraw/coolskydraw
# or
yarn add react react-dom @coolskydraw/coolskydraw
```

> **Note**: If you want to try unreleased changes, use `@coolskydraw/coolskydraw@next`.

## Quick start

The minimum working setup has two easy-to-miss requirements:

1. Import the package CSS:

```ts
import "@coolskydraw/coolskydraw/index.css";
```

2. Render Coolskydraw inside a container with a non-zero height.

```tsx
import { Coolskydraw } from "@coolskydraw/coolskydraw";
import "@coolskydraw/coolskydraw/index.css";

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Coolskydraw />
    </div>
  );
}
```

Coolskydraw fills `100%` of the width and height of its parent. If the parent has no height, the canvas will not be visible.

## Next.js / SSR frameworks

Coolskydraw should be rendered on the client. In SSR frameworks such as Next.js, use a client component and load it dynamically with SSR disabled.

```tsx
// app/components/CoolskydrawClient.tsx
"use client";

import { Coolskydraw } from "@coolskydraw/coolskydraw";
import "@coolskydraw/coolskydraw/index.css";

export default function CoolskydrawClient() {
  return (
    <div style={{ height: "100vh" }}>
      <Coolskydraw />
    </div>
  );
}
```

```tsx
// app/page.tsx
import dynamic from "next/dynamic";

const CoolskydrawClient = dynamic(
  () => import("./components/CoolskydrawClient"),
  { ssr: false },
);

export default function Page() {
  return <CoolskydrawClient />;
}
```

See the local examples for complete setups:

- [examples/with-nextjs](https://github.com/Edgarmongo/coolskydraw/tree/master/examples/with-nextjs)
- [examples/with-script-in-browser](https://github.com/Edgarmongo/coolskydraw/tree/master/examples/with-script-in-browser)

## LLM / agent tips

If an LLM or coding agent is setting up Coolskydraw, these shortcuts usually save more time than re-prompting:

- Start with a plain `<Coolskydraw />` in a `100vh` container. Add refs, `initialData`, persistence, or custom UI only after the base embed works.
- If the canvas is blank, check the CSS import and parent height first. Those are the two most common integration failures.
- In Next.js or other SSR frameworks, assume client-only rendering first. Use `"use client"` and `dynamic(..., { ssr: false })` before debugging hydration or `window is not defined` errors.
- If imports or entrypoints are unclear, inspect `node_modules/@coolskydraw/coolskydraw/package.json`. The installed package exports are the source of truth.
- Do not set `window.COOLSKYDRAW_ASSET_PATH` unless you are intentionally self-hosting fonts/assets.
- When docs and generated code drift, copy the nearest working example from this repo, especially `examples/with-nextjs` or `examples/with-script-in-browser`.

## Migrating to `@coolskydraw/coolskydraw@0.18.x`

Version `0.18.x` removes the old `types/`-prefixed deep import paths. If you were importing types from `@coolskydraw/coolskydraw/types/...`, switch to the new type-only subpaths below.

| Old path | New path |
| --- | --- |
| `@coolskydraw/coolskydraw/types/data/transform.js` | `@coolskydraw/coolskydraw/element/transform` |
| `@coolskydraw/coolskydraw/types/data/types.js` | `@coolskydraw/coolskydraw/data/types` |
| `@coolskydraw/coolskydraw/types/element/types.js` | `@coolskydraw/coolskydraw/element/types` |
| `@coolskydraw/coolskydraw/types/utility-types.js` | `@coolskydraw/coolskydraw/common/utility-types` |
| `@coolskydraw/coolskydraw/types/types.js` | `@coolskydraw/coolskydraw/types` |

Drop the `.js` extension. The new package `exports` map resolves these paths without it.

These deep subpaths are for `import type` only. Runtime imports should come from the package root, plus `@coolskydraw/coolskydraw/index.css` for styles.

For example:

```ts
import { exportToSvg } from "@coolskydraw/coolskydraw";
```

## Self-hosting fonts

By default, Coolskydraw downloads the fonts it needs from the [CDN](https://esm.run/@coolskydraw/coolskydraw/dist/prod).

For self-hosting, copy the contents of `node_modules/@coolskydraw/coolskydraw/dist/prod/fonts` into the path where your app serves static assets, for example `public/`. Then set `window.COOLSKYDRAW_ASSET_PATH` to that same path:

```html
<script>
  window.COOLSKYDRAW_ASSET_PATH = "/";
</script>
```

## Demo

Try the [CodeSandbox example](https://codesandbox.io/p/sandbox/github/Edgarmongo/coolskydraw/tree/master/examples/with-script-in-browser).

## Integration

Read the [integration docs](https://docs.coolskyai.com/docs/@coolskydraw/coolskydraw/integration).

## API

Read the [API docs](https://docs.coolskyai.com/docs/@coolskydraw/coolskydraw/api).

## Contributing

Read the [contributing docs](https://docs.coolskyai.com/docs/@coolskydraw/coolskydraw/contributing).
