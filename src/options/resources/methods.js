// imports.
import storage from '../../ext/storage'

/**
 * Export methods.
 */
export default {

  /**
   * Save the list of enabled applications on the options page.
   */
  saveOptions () {
    // start by setting the saving indicator as true.
    this.saving = true

    // save the enabled apps on storage.
    storage.set('enabledApps', this.enabledApps)

    // disable the saving indicator.
    this.saving = false

    window.chrome.runtime.sendMessage({updated: true}, function (response) {
      console.log(response.farewell)
    })
  }
}
