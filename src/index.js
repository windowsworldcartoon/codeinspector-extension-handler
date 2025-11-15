/**
 * Base Extension class for CodeInspector extensions
 */
class Extension {
  constructor({ api, config, extensionPath }) {
    this.api = api;
    this.config = config;
    this.extensionPath = extensionPath;
    this.name = config.name;
    this.version = config.version;
    this.id = config.id;
  }

  /**
   * Called when the extension is activated
   */
  activate() {
    console.log(`${this.name} activated`);
  }

  /**
   * Called when the extension is deactivated
   */
  deactivate() {
    console.log(`${this.name} deactivated`);
  }

  /**
   * Register a command
   * @param {string} commandId - Unique command identifier (e.g., 'ext.action')
   * @param {Function} handler - Command handler function
   */
  registerCommand(commandId, handler) {
    this.api.registerCommand(commandId, handler);
  }

  /**
    * Register a menu item
    * @param {Object} menuConfig - Menu configuration
    */
   registerMenu(menuConfig) {
     this.api.registerMenu(menuConfig);
   }

  /**
    * Register a command menu item (appears in command palette)
    * @param {Object} commandMenuConfig - Command menu configuration
    */
   registerCommandMenu(commandMenuConfig) {
     this.api.registerCommandMenu(commandMenuConfig);
   }

  /**
   * Execute a command
   * @param {string} commandId - Command identifier
   * @param {*} args - Command arguments
   */
  executeCommand(commandId, args) {
    return this.api.executeCommand(commandId, args);
  }

  /**
   * Show a notification
   * @param {string} title - Notification title
   * @param {string} message - Notification message
   * @param {string} type - Notification type ('info', 'warn', 'error')
   */
  showNotification(title, message, type = 'info') {
    this.api.showNotification(title, message, type);
  }

  /**
   * Show a progress indicator
   * @param {string} title - Progress title
   * @param {string} message - Progress message
   * @param {number} progress - Progress percentage (0-100)
   * @returns {Promise} Promise that resolves with progress updates
   */
  showProgress(title, message, progress = 0) {
    return Promise.resolve(this.api.showProgress(title, message, progress));
  }

  /**
   * Register an activity bar item
   * @param {string} id - Unique activity item identifier
   * @param {string} title - Activity item title
   * @param {string} icon - Icon name (e.g., 'circle', 'spinner')
   * @param {string} status - Status ('active', 'pending', 'success', 'error')
   * @returns {Object} Activity item object
   */
  registerActivityBar(id, title, icon = 'circle', status = 'active') {
    return this.api.registerActivityBar(id, title, icon, status);
  }

  /**
   * Update an activity bar item
   * @param {string} id - Activity item identifier
   * @param {Object} updates - Fields to update (title, icon, status)
   * @returns {Object} Updated activity item or null if not found
   */
  updateActivityBar(id, updates = {}) {
    return this.api.updateActivityBar(id, updates);
  }

  /**
   * Remove an activity bar item
   * @param {string} id - Activity item identifier
   * @returns {Object} Success status
   */
  removeActivityBar(id) {
    return this.api.removeActivityBar(id);
  }

  /**
   * Register an HTML webview
   * @param {string} id - Unique webview identifier
   * @param {string} title - Webview title
   * @param {string} htmlContent - HTML content to display
   * @returns {Object} Webview object
   */
  registerWebview(id, title, htmlContent) {
    return this.api.registerWebview(id, title, htmlContent);
  }

  /**
   * Update a webview's HTML content
   * @param {string} id - Webview identifier
   * @param {string} htmlContent - New HTML content
   * @returns {Object} Updated webview or null if not found
   */
  updateWebview(id, htmlContent) {
    return this.api.updateWebview(id, htmlContent);
  }

  /**
   * Remove a webview
   * @param {string} id - Webview identifier
   * @returns {Object} Success status
   */
  removeWebview(id) {
    return this.api.removeWebview(id);
  }

  /**
    * Show a quick pick dialog
    * @param {Array<Object>} items - Array of quick pick items with label, description, detail, value
    * @param {Object} options - Options with placeHolder and title
    * @returns {Promise<Object>} Promise that resolves with selected item
    */
   showQuickPick(items, options = {}) {
     return Promise.resolve(this.api.showQuickPick(items, options));
   }

  /**
    * Get system information
    * @returns {Object} System info (platform, arch, etc.)
    */
   getSystemInfo() {
     return this.api.getSystemInfo();
   }
  }

  module.exports = Extension;
