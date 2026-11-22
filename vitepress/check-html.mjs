// Trial (ISS02820): the pages whose HTML Vue cannot read (VitePress stops at the first).
// Renders each page of src/ as VitePress does and parses it as a Vue template.
import { createMarkdownRenderer } from 'vitepress'
import { parse } from '@vue/compiler-dom'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const src = new URL('./src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const md = await createMarkdownRenderer(src, { attrs: { disable: true } }, '/')

const files = []
;(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (name.endsWith('.md')) files.push(p)
  }
})(src)

let bad = 0
for (const file of files) {
  const html = md.render(readFileSync(file, 'utf8'), { path: file, relativePath: relative(src, file), cleanUrls: false })
  const errors = []
  try {
    parse(html, { onError: (e) => errors.push(e) })
  } catch (e) {
    errors.push(e)
  }
  if (errors.length) {
    bad++
    const lines = html.split('\n')
    for (const e of errors.slice(0, 3)) {
      const line = e.loc ? e.loc.start.line : 0
      console.log(relative(src, file), '|', e.message, '|', (lines[line - 1] || '').slice(0, 160))
    }
  }
}
console.log('pages', files.length, 'with errors', bad)
process.exitCode = bad ? 1 : 0
