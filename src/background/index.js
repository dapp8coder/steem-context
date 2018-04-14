// imports.
import { each, curry } from 'lodash'
import { bootSettings } from './boot'
import { getApps, extractValues } from './apps'
import { generateHandler, registerContextHandler, removeAllHandlers } from './chrome'

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
  // loop the applications (all of them).
  each(apps, (app) => {
    // if the application was enabled for posts...
    if (app.enabled.post) {
      // generate a handler with the correct post route.
      const handler = curry(generateHandler)('post', app.post_route)
      // register the handler within chrome.
      registerContextHandler(`See Post on ${app.name}`, handler, ['link'], postPatterns)
    }

    // if the application was enabled for accounts...
    if (app.enabled.account) {
      // generate a handler with the correct account route.
      const handler = curry(generateHandler)('account', app.account_route)
      // register the handler within chrome.
      registerContextHandler(`See Account on ${app.name}`, handler, ['link'], accountPatterns)
    }
  })
}

// call the register on init.
registerContextHandlers()

// listen for other component messages (like options settings).
window.chrome.runtime.onMessage.addListener(() => {
  // when a message arrives, remove and register the links again.
  registerContextHandlers()
})
