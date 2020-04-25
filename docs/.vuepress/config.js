module.exports = {
  title: 'aver.js',
  description: 'Official documentation for aver.js',
  themeConfig: {
    repo: 'exreplay/aver.js',
    displayAllHeaders: true,
    sidebarDepth: 1,
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Release Notes', link: 'https://github.com/exreplay/aver.js/releases' }
    ],
    sidebar: {
      '/guide/': [
        '/',
        '/guide/',
        '/guide/vuex/',
        '/guide/router/',
        '/guide/meta/',
        '/guide/plugins/'
      ]
    }
  }
}