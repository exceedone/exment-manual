import { defineConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { slugifySource } from '../slug.mjs'

// made by prepare.mjs from the _sidebar.md of each language
const sidebar = JSON.parse(readFileSync(fileURLToPath(new URL('./sidebar.json', import.meta.url)), 'utf8'))

// the old URLs of docsify ("/docs/#/ja/file_server?id=heading") open the same page
const oldUrls = `(function () {
  var h = location.hash;
  if (h.indexOf('#/') !== 0) { return; }
  var rest = h.slice(2), id = '', q = rest.indexOf('?');
  if (q >= 0) {
    var m = rest.slice(q + 1).match(/(?:^|&)id=([^&]*)/);
    if (m) { try { id = decodeURIComponent(m[1]); } catch (e) { id = m[1]; } }
    rest = rest.slice(0, q);
  }
  rest = rest.replace(/\\.md$/, '').replace(/\\/$/, '/index');
  if (rest === '' || rest === 'README') { rest = 'index'; }
  rest = rest.replace(/(^|\\/)README$/, '$1index');
  // the anchor as VitePress makes it from the heading
  var slug = (SLUGIFY)(id);
  location.replace(BASE + rest + '.html' + (slug ? '#' + slug : ''));
})();`

const base = process.env.MANUAL_BASE || '/docs/'

// the way back to the site (exment.net) from the header, in the language of the page
const backToSite = (link: string) => [{ text: '← exment.net', link, target: '_self' }]

export default defineConfig({
  srcDir: 'src',
  base,
  title: 'Exment',
  lastUpdated: false,
  // a link to a page that is not there stops the build (ISS02820: no dead links)
  ignoreDeadLinks: process.env.MANUAL_DEAD_LINKS === 'ignore' ? true : 'localhostLinks',
  head: [
    ['script', {}, oldUrls.replace('BASE', JSON.stringify(base)).replace('SLUGIFY', () => slugifySource)],
  ],
  markdown: {
    // the tables and notes of the manual are wide: no line numbers
    lineNumbers: false,
    // "{...}" at the end of a line is text in the manual (as "${sum:(table).(column)}"), not attributes
    attrs: { disable: true },
  },
  themeConfig: {
    logo: 'https://exment.net/docs/img/common/exment_logo_side.png',
    siteTitle: false,
    search: {
      provider: 'local',
      options: {
        locales: {
          ja: { translations: { button: { buttonText: '検索' }, modal: { noResultsText: '結果がありませんでした', footer: { selectText: '開く', navigateText: '移動', closeText: '閉じる' } } } },
          vi: { translations: { button: { buttonText: 'Tìm kiếm' }, modal: { noResultsText: 'Không có kết quả' } } },
        },
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/exceedone/exment' }],
    outline: { level: [2, 3] },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: { nav: backToSite('https://exment.net/en/'), sidebar: sidebar['/'] ?? [], outline: { level: [2, 3], label: 'On this page' } },
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: {
        nav: backToSite('https://exment.net/'),
        sidebar: sidebar['/ja/'] ?? [],
        outline: { level: [2, 3], label: 'このページの内容' },
        docFooter: { prev: '前のページ', next: '次のページ' },
        returnToTopLabel: '上に戻る',
        sidebarMenuLabel: 'メニュー',
        darkModeSwitchLabel: '表示',
        langMenuLabel: '言語',
      },
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi',
      link: '/vi/',
      themeConfig: { nav: backToSite('https://exment.net/vi/'), sidebar: sidebar['/vi/'] ?? [], outline: { level: [2, 3], label: 'Trong trang này' } },
    },
  },
})
