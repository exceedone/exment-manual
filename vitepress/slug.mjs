// The anchor VitePress 1.6 makes from a heading (its own slugify, copied). The old
// "?id=heading" of docsify becomes "#" + this, in the pages (prepare.mjs) and in the
// browser (the old URLs, .vitepress/config.mts). Keep it as VitePress has it.
export const slugifySource = `function (str) {
  return str.normalize('NFKD').replace(/[\\u0300-\\u036F]/g, '').replace(/[\\u0000-\\u001f]/g, '')
    .replace(/[\\s~\`!@#$%^&*()\\-_+=[\\]{}|\\\\;:"'“”‘’<>,.?/]+/g, '-').replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '').replace(/^(\\d)/, '_$1').toLowerCase();
}`

// eslint-disable-next-line no-new-func
export const slugify = new Function('return ' + slugifySource)()
