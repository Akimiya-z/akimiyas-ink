import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

const siteUrl = 'https://akimiyas-ink.vercel.app'
const githubUrl = 'https://github.com/Akimiya-z'
const zhihuUrl = 'https://www.zhihu.com/people/snsjshhsh'
const bilibiliUrl = 'https://space.bilibili.com/3461570801699042?spm_id_from=333.337.0.0'
const xiaohongshuUrl = 'https://www.xiaohongshu.com/user/profile/63250d9c0000000023025871?m_source=pwa'
const emailUrl = 'mailto:zjy.akimiya@gmail.com'

export const socialProfiles = {
  github: githubUrl,
  zhihu: zhihuUrl,
  bilibili: bilibiliUrl,
  xiaohongshu: xiaohongshuUrl,
  email: emailUrl
} as const

export const theme: ThemeUserConfig = {
  // [Basic]
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: "Akimiya's ink",
  /** Will be used in index page & copyright declaration */
  author: 'Akimiya',
  /** Description metadata for your website. Can be used in page metadata. */
  description: '记录网站搭建、学习笔记和生活片段。',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon.svg',
  /** The default social card image for your site which should be a path to an image in the `public/` directory. */
  socialCard: '/images/social-card.svg',
  /** Specify the default language for this site. */
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    // Date locale
    dateLocale: 'zh-CN',
    dateOptions: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: '/images/avatar.jpg',
    alt: 'Akimiya avatar'
  },

  titleDelimiter: '|',
  prerender: true, // pagefind search is not supported with prerendering disabled
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // Still in test
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Projects', link: '/projects' },
      { title: 'About', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Year format
    year: `© ${new Date().getFullYear()} `,
    links: [],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: false,
    /** Optional details about the social media accounts for this site. */
    social: {
      github: socialProfiles.github,
      zhihu: socialProfiles.zhihu,
      bilibili: socialProfiles.bilibili,
      email: socialProfiles.email
    }
  },

  // [Content]
  content: {
    /** External links configuration */
    externalLinks: {
      content: ' ↗',
      /** Properties for the external links element */
      properties: {
        style: 'user-select:none'
      }
    },
    /** Blog page size for pagination (optional) */
    blogPageSize: 6,
    share: []
  }
}

export const integ: IntegrationUserConfig = {
  // [Links]
  // https://astro-pure.js.org/docs/integrations/links
  links: {
    // Friend logbook
    logbook: [],
    // Yourself link info
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: siteUrl },
      { name: 'Avatar', val: `${siteUrl}${theme.logo.src}` }
    ],
    // Cache avatars in `public/avatars/` to improve user experience.
    cacheAvatar: false
  },
  // [Search]
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  // See: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  // [Quote]
  quote: {
    server: '/quote.json',
    target: `(data) => data.quote || '对未来的真正慷慨，是把一切都献给现在'`
  },
  // [Typography]
  // https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base',
    // The style of blockquote font `normal` / `italic` (default to italic in typography)
    blockquoteStyle: 'italic',
    // The style of inline code block `code` / `modern` (default to code in typography)
    inlineCodeBlockStyle: 'modern'
  },
  // [Lightbox]
  // A lightbox library that can add zoom effect
  // https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: false,
    showMeta: false,
    additionalConfigs: {}
  }
}

export const terms: CardListData = {
  title: '站点说明',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
