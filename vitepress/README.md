# VitePress trial (ISS02820)

The manual is still built and published from `../docs` with docsify. This folder builds the same pages with VitePress, so the two can be compared. `../docs` is not changed by it.

```
cd vitepress
npm install
npm run build      # prepare.mjs, then vitepress build -> .vitepress/dist
npm run preview    # http://localhost:4173/docs/
```

- `prepare.mjs` copies `../docs` to `src/` and changes the following on the way:
  - `README.md` becomes `index.md`.
  - `page?id=heading` becomes `page#heading`.
  - `{{` outside code is escaped.
  - A `<script>` in a page is left out.
  - `_sidebar.md` becomes the sidebar.
- `overlay/tasks.json`: the "what you want to do" group at the top of the sidebar (ja, en).
- The old URLs (`/docs/#/ja/page?id=heading`) are sent to the new page and heading by a script in the head.
- A link to a page that is not there stops the build (`localhost` links are allowed). Set `MANUAL_DEAD_LINKS=ignore` to build anyway.
- `check-html.mjs` lists the pages whose HTML Vue cannot read.
- The base path is `/docs/`. Change it with `MANUAL_BASE`.
