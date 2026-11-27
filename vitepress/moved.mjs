// Pages that got a new name: old name -> new name (in every language).
// The old URLs keep working: docsify (../docs/index.html, alias), and here
// prepare.mjs makes a small page at the old name and .vitepress/config.mts sends
// the browser on to the new one (also for the docsify URLs "#/ja/old").
export const moved = {
  // ExmentITSupport became ExmentSupportDesk (サポートデスク)
  plugin_it_support: 'plugin_support_desk',
}
