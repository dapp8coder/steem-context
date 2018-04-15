/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: '__MSG_extName__', // Vue Extension
  description: '__MSG_extDescription__', // Vue.js Webpack Chrome Extension Template
  author: 'Diego Hernandes <diego@hernandev.com>',
  version: '1.0.2',
  icons: {
    '16': 'icons/16.png',
    '48': 'icons/48.png',
    '128': 'icons/128.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage'
  ],
  browser_action: {
    default_title: 'title',
    default_popup: 'pages/popup.html'
  },
  background: {
    page: 'pages/background.html'
  },
  options_ui: {
    open_in_tab: true,
    page: 'pages/options.html'
  },
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/content.js'
    ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  default_locale: 'en',
  manifest_version: 2,
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [
    'js/content.js'
  ]
}
