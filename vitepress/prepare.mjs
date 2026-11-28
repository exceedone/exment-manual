// Trial (ISS02820): make the VitePress source (src/) from the docsify manual (../docs).
// ../docs is not changed: the docsify site keeps working while the two are compared.
//
// - README.md -> index.md (the home of each language)
// - links "page?id=heading" (docsify) -> "page#heading" (VitePress)
// - "{{" outside code is written as an entity (Vue reads "{{ }}" in a page)
// - _sidebar.md of each language -> sidebar.json, read by .vitepress/config.mts
// - overlay/ (the pages of the trial, as "what you want to do") is put over it
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { slugify } from './slug.mjs'
import { moved } from './moved.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const docs = join(here, '..', 'docs')
const src = join(here, 'src')
const overlay = join(here, 'overlay')

// the docsify files that are not pages
const SKIP = new Set(['index.html', 'docs.css', 'bootstrap-grid.min.css', '_sidebar.md', '.nojekyll'])

rmSync(src, { recursive: true, force: true })
mkdirSync(src, { recursive: true })

function walk(dir, fn) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      walk(path, fn)
    } else {
      fn(path)
    }
  }
}

// "?id=" of docsify is the heading text: VitePress makes the anchor from the same text
function convertLinks(text) {
  return text.replace(/\]\(([^)\s]*?)(\.md)?\?id=([^)\s]+)\)/g, (all, page, md, id) => {
    let heading = id
    try {
      heading = decodeURIComponent(id)
    } catch (e) {
      // as it is
    }
    return `](${page}#${slugify(heading)})`
  })
}

// "{{" outside code (fenced and inline) as entities
function escapeMustache(text) {
  const out = []
  let fenced = false
  for (const line of text.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced
      out.push(line)
      continue
    }
    if (fenced) {
      out.push(line)
      continue
    }
    out.push(line.split(/(`[^`]*`)/).map((part, i) => (i % 2 === 1 ? part : part.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;'))).join(''))
  }
  return out.join('\n')
}

// a <script> in a page (docsify runs it; Vue would take it as the code of the page):
// left out. Only the zip link of quickstart_easy used one (bustZip does it now).
function dropScripts(text) {
  const out = []
  let fenced = false
  let inScript = false
  for (const line of text.split('\n')) {
    if (!inScript && /^\s*(```|~~~)/.test(line)) {
      fenced = !fenced
    }
    if (!fenced && !inScript && /^\s*<script[\s>]/.test(line)) {
      inScript = !/<\/script>/.test(line)
      continue
    }
    if (inScript) {
      if (/<\/script>/.test(line)) {
        inScript = false
      }
      continue
    }
    out.push(line)
  }
  return out.join('\n')
}

// the zip of Exment on the install page: docsify put the time of the visit after it (a <script>,
// so that a cache does not give an old zip); here the time of the build
const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14)
function bustZip(text) {
  return text.replace(/(<a id="link" href="https:\/\/exment\.net\/downloads\/[^"?]+\.zip)"/g, `$1?ver=${stamp}"`)
}

walk(docs, (path) => {
  const rel = relative(docs, path)
  const base = rel.split(/[\\/]/).pop()
  if (SKIP.has(base)) {
    return
  }
  let to = join(src, rel)
  if (base === 'README.md') {
    to = join(dirname(to), 'index.md')
  }
  mkdirSync(dirname(to), { recursive: true })
  if (path.endsWith('.md')) {
    writeFileSync(to, escapeMustache(convertLinks(bustZip(dropScripts(readFileSync(path, 'utf8'))))))
  } else {
    cpSync(path, to)
  }
})

// the pages that got a new name: a small page at the old name (the browser is sent on by
// the script of .vitepress/config.mts; this is for when it does not run)
for (const lang of ['', 'ja', 'vi', 'zh', 'ko', 'de', 'es']) {
  for (const [from, to] of Object.entries(moved)) {
    if (existsSync(join(src, lang, to + '.md')) && !existsSync(join(src, lang, from + '.md'))) {
      const link = (lang ? '/' + lang : '') + '/' + to
      writeFileSync(join(src, lang, from + '.md'), `---\nsearch: false\nsidebar: false\n---\n\n→ [${link}](${link})\n`)
    }
  }
}

// the sidebar: "* 【group】" with "  * [title](/ja/page)" under it
function sidebar(file) {
  const groups = []
  let group = null
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^(\s*)\*\s+(.*)$/)
    if (!m) {
      continue
    }
    const indent = m[1].length
    const body = m[2].trim()
    const link = body.match(/^\[(.+?)\]\((.+?)\)/)
    if (indent === 0 && !link) {
      group = { text: body.replace(/^【|】$/g, ''), collapsed: true, items: [] }
      groups.push(group)
    } else if (link) {
      const item = { text: link[1], link: link[2].replace(/\.md$/, '') }
      if (indent === 0 || !group) {
        groups.push({ items: [item] })
        group = null
      } else {
        group.items.push(item)
      }
    }
  }
  return groups
}

const bars = {}
for (const [lang, file] of [['/', join(docs, '_sidebar.md')], ['/ja/', join(docs, 'ja', '_sidebar.md')], ['/vi/', join(docs, 'vi', '_sidebar.md')], ['/zh/', join(docs, 'zh', '_sidebar.md')], ['/ko/', join(docs, 'ko', '_sidebar.md')], ['/de/', join(docs, 'de', '_sidebar.md')], ['/es/', join(docs, 'es', '_sidebar.md')]]) {
  if (existsSync(file)) {
    bars[lang] = sidebar(file)
  }
}

// the pages of the trial
if (existsSync(overlay)) {
  cpSync(overlay, src, { recursive: true })
  const tasks = join(overlay, 'tasks.json')
  if (existsSync(tasks)) {
    // "what you want to do" comes first in the sidebar
    const t = JSON.parse(readFileSync(tasks, 'utf8'))
    // Vietnamese: its page when there is one, the English one when not
    for (const item of t['/vi/']?.items ?? []) {
      if (existsSync(join(src, 'vi', item.link.replace(/^\//, '') + '.md'))) {
        item.link = '/vi' + item.link
      }
    }
    for (const lang of Object.keys(t)) {
      bars[lang] = [t[lang], ...(bars[lang] || [])]
    }
    rmSync(join(src, 'tasks.json'))
  }
}

mkdirSync(join(here, '.vitepress'), { recursive: true })
writeFileSync(join(here, '.vitepress', 'sidebar.json'), JSON.stringify(bars, null, 2))
console.log('prepared', relative(here, src))
