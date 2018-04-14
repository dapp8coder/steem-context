// imports.
import storage from '../../ext/storage'

/**
 * Export mounted.
 */
export default function () {
  // get the enabled apps from storage and set.
  this.enabledApps = storage.get('enabledApps')
}
