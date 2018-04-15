// imports.
import { each, curry, concat } from 'lodash'
import { bootSettings } from './boot'
import { getApps, extractValues } from './apps'
import { generateHandler, registerContextHandler, removeAllHandlers } from './browser'

// webextension polfill.
if (typeof window.browser === 'undefined') {
  window.browser = window.chrome
}

// get translated messages for the menus.
const viewPostMessage = window.chrome.i18n.getMessage('viewPost')
const viewAccountMessage = window.chrome.i18n.getMessage('viewAccount')

/**
 * Main context handler register.
 */
const registerContextHandlers = () => {
  // remove previous handlers.
  removeAllHandlers()

  // when just installed or browser start, the settings must be initialized properly.
  bootSettings()

  // init the applications list.
  const apps = getApps()

  // get all patterns for posts on Steem.
  const postPatterns = extractValues(apps, 'post_pattern')
  // get all patterns for accounts on Steem.
  const accountPatterns = extractValues(apps, 'account_pattern')

  // single match for both type of patterns.
  const allPatterns = concat(postPatterns, accountPatterns)

  // loop the applications (all of them).
  each(apps, (app) => {
    // if the application was enabled for posts...
    if (app.enabled.post) {
      // generate a handler with the correct post route.
      const handler = curry(generateHandler)('post', app.post_route)
      // register the handler within chrome.
      registerContextHandler(`${viewPostMessage} ${app.name}`, handler, ['link', 'page'], postPatterns, postPatterns)
    }
  })

  // registers a separator for post / account.
  window.browser.contextMenus.create({
    type: 'separator',
    contexts: ['link', 'page'],
    targetUrlPatterns: allPatterns,
    documentUrlPatterns: allPatterns
  })

  // loop the applications (all of them).
  each(apps, (app) => {
    // if the application was enabled for accounts...
    if (app.enabled.account) {
      // generate a handler with the correct account route.
      const handler = curry(generateHandler)('account', app.account_route)
      // register the handler within chrome.
      registerContextHandler(`${viewAccountMessage} ${app.name}`, handler, ['link', 'page'], accountPatterns, accountPatterns)
    }
  })
}

// call the register on init.
registerContextHandlers()

// listen for other component messages (like options settings).
window.browser.runtime.onMessage.addListener(() => {
  // when a message arrives, remove and register the links again.
  registerContextHandlers()
})
