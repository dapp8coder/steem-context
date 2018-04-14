// imports.
import { get, filter, map, mapValues } from 'lodash'
import storage from '../ext/storage'
import appsList from '../data/apps'
import { generatePattern, generateRoute } from './url'

/**
 * Get all enabled applications.
 *
 * @return {{}}
 */
export const getEnabledApps = () => {
  // get the enabled applications from storage
  const enabledApps = storage.get('enabledApps')

  // if for some reason, the result is not an object, return a empty one/
  if (typeof enabledApps !== 'object') {
    return {}
  }

  // return the enabled apps list.
  return enabledApps
}

/**
 * Retrieve and parse the applications list.
 *
 * @return {*}
 */
export const getApps = () => {
  // get a list of enabled apps.
  const enabledApps = getEnabledApps()

  // map all applications, with the corresponding values.
  return mapValues(appsList, (app, slug) => {
    // assign the app slug / key under the object itself for easy reference later.
    app.slug = slug

    // set the enabled key on the app to match the stored settings.
    app.enabled = enabledApps[slug]

    // get the post scheme.
    const postScheme = get(app, 'post_scheme')
    // assign bot route and pattern for posts.
    app.post_route = postScheme ? generateRoute(postScheme) : null
    app.post_pattern = postScheme ? generatePattern(postScheme) : null

    // get the account scheme.
    const accountScheme = get(app, 'account_scheme')
    // assign both route and pattern for accounts.
    app.account_route = accountScheme ? generateRoute(accountScheme) : null
    app.account_pattern = accountScheme ? generatePattern(accountScheme) : null

    // returns the app data itself.
    return app
  })
}

/**
 * Extract a list of values from within a nested object.
 * Filtering, by default, any empty / invalid value.
 *
 * @param apps
 * @param key
 * @param filtered
 * @return {*}
 */
export const extractValues = (apps, key, filtered = true) => {
  // extract the values.
  const extracted = map(apps, app => get(app, key, null))

  // return the values, filtered if set to.
  return filtered ? filter(extracted) : extracted
}
