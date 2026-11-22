# The manual with VitePress (ISS02820)

The pages stay in `../docs` (Markdown, as before). This folder builds them with VitePress. Until the switch, exment.net/docs is still the docsify site of `../docs`.

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
  - A `<script>` in a page is left out. The zip link of the install page gets the time of the build instead.
  - `_sidebar.md` becomes the sidebar.
- `overlay/tasks.json`: the "what you want to do" group at the top of the sidebar (ja, en).
- The old URLs (`/docs/#/ja/page?id=heading`) are sent to the new page and heading by a script in the head.
- A link to a page that is not there stops the build (`localhost` links are allowed). Set `MANUAL_DEAD_LINKS=ignore` to build anyway.
- `check-html.mjs` lists the pages whose HTML Vue cannot read.
- The base path is `/docs/`. Change it with `MANUAL_BASE`.
- `.vitepress/theme/`: the default theme, with the classes the pages use (`red`, `small`, `tile`, `row`, `col-sm-*` and others, from `docs/docs.css`).
- CI (`.github/workflows/manual.yml`) builds it on every pull request. The site is kept as the artifact `manual-site`.

## Publish (run it yourself, in Git Bash)
```
sh vitepress/deploy.sh          # https://exment.net/docs-vp/ (next to the docsify one, to look at)
sh vitepress/deploy.sh docs     # https://exment.net/docs/ (the switch; the old files are kept in ~/backup_docs_<time>/)
```
