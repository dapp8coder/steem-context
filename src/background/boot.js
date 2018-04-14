// imports.
import { each, isEmpty, isObject, mapValues, size } from 'lodash'
import storage from '../ext/storage'
import apps from '../data/apps'

// list of applications to enable by default.
export const defaultApps = ['steemit', 'busy', 'steemdb']

/**
 * Function to init a default list of applications.
 *
 * Useful for cases where the extension has no settings yet.
 *
 * @return {*}
 */
export const defaultEnabledAppsList = () => {
  // map a list of applications with the post and account keys set to false.
  const appsList = mapValues(apps, () => ({ post: false, account: false }))

  // loop on the default applications, setting the post and account keys to true.
  each(defaultApps, (appName) => {
    appsList[appName]['post'] = true
    appsList[appName]['account'] = true
  })

  // returns the list.
  return appsList
}

/**
 * Method for storing default settings, case none is available.
 */
export const bootSettings = () => {
  // get the enabled applications from storage.
  const enabledApps = storage.get('enabledApps')

  // case there was no enabled applications stored...
  if (isEmpty(enabledApps) || (isObject(enabledApps) && (size(enabledApps) === 0))) {
    // factory and store a default list.
    storage.set('enabledApps', defaultEnabledAppsList())
  }
}
