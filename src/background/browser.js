// imports.
import { get } from 'lodash'
const Router = require('route-parser')

/**
 * Register a context menu handler.
 *
 * @param title
 * @param onclick
 * @param contexts
 * @param linkPatterns
 * @param pagePatterns
 *
 */
export const registerContextHandler = (title, onclick, contexts = ['link'], linkPatterns = null, pagePatterns = null) => {
  // settings for the url handler options.
  const handlerOptions = {
    title, onclick, contexts
  }

  // register patterns for URLs, if any informed.
  if (linkPatterns !== null) {
    handlerOptions['targetUrlPatterns'] = linkPatterns
  }

  // register patterns for pages (tabs), if any informed.
  if (pagePatterns !== null) {
    handlerOptions['documentUrlPatterns'] = pagePatterns
  }

  // registers the handler.
  window.chrome.contextMenus.create(handlerOptions)
}

/**
 * Extracts the URL from the context menu event data.
 *
 * @param eventData
 *
 * @return {*}
 */
export const extractUrl = (eventData) => get(eventData, 'linkUrl', get(eventData, 'pageUrl', null))

/**
 * Converts a URL into a document element.
 *
 * @param urlString
 *
 * @return {HTMLAnchorElement}
 */
export const urlToElement = (urlString) => {
  // create a link element.
  const url = document.createElement('a')
  // assign the url as the href for the element.
  url.href = urlString

  // return the url element.
  return url
}

/**
 * Extract a the hash (#) part of a URL.
 *
 * @param urlString
 *
 * @return {string}
 */
export const extractHash = (urlString) => urlToElement(urlString).hash

/**
 * Extract the path from a given URL.
 *
 * @param urlString
 *
 * @return {string}
 */
export const extractPath = (urlString) => urlToElement(urlString).pathname

/**
 * Extract params from a URL based on a given route.
 *
 * @param route
 * @param path
 *
 * @return {*}
 */
export const routeToParams = (route, path) => {
  // starts the router.
  const router = new Router(route)

  // return the matched params.
  return router.match(path)
}

/**
 * Given params and a route, generate a URL.
 *
 * @param route
 * @param params
 *
 * @return {*}
 */
export const paramsToRoute = (route, params = {}) => {
  // starts the router.
  const router = new Router(route)
  console.log('reverse', router.reverse(params))
  // return a reversed route URL.
  return router.reverse(params)
}

/**
 * Generates a handler based on some input.
 *
 * @param type
 * @param route
 * @param data
 */
export const generateHandler = (type, route, data) => {
  // get the base URL for the handler.
  const baseUrl = extractUrl(data)

  // extract the route path alone.
  const routePath = type === 'post' ? '/(:category/)@:username/:permlink' : '/@:username'

  // extract the path part from the URL.
  const path = extractPath(baseUrl)

  // extract params from provided path and route.
  const params = routeToParams(routePath, path)

  // generate the URL to open the new tab with, appending hash when present.
  const targetUrl = paramsToRoute(route, params) + (extractHash(baseUrl) || '')

  // open the new URL on a new chrome tab.
  window.chrome.tabs.create({ url: targetUrl })
}

/**
 * Remove previously registered chrome context menu handlers.
 */
export const removeAllHandlers = () => {
  // call the removal.
  window.chrome.contextMenus.removeAll()
}
