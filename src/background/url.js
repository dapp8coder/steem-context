// imports.
// import { get, mapValues } from 'lodash'

/**
 * Given a url schema, generate a chrome URL pattern for matching URLs.
 *
 * @param url
 *
 * @return String
 */
export const generatePattern = (url) => {
  return url
    .replace('https://', '*://')
    .replace('http://', '*://')
    .replace('{category}', '*')
    .replace('{username}', '*')
    .replace('{permlink}', '*')
}

/**
 * Given a url schema, generate a corresponding route.
 *
 * @param url
 *
 * @return String
 */
export const generateRoute = (url) => {
  return url
    .replace('{category}/', '(:category/)')
    .replace('{username}', ':username')
    .replace('/{permlink}', '(/:permlink)')
}
