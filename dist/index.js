"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Extension class for CodeInspector extensions
 */
class Extension {
    constructor(options) {
        this.api = options.api;
        this.config = options.config;
        this.extensionPath = options.extensionPath;
        this.name = options.config.name;
        this.version = options.config.version;
        this.id = options.config.id;
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
     */
    registerCommand(commandId, handler) {
        this.api.registerCommand(commandId, handler);
    }
    /**
     * Register a menu item
     */
    registerMenu(menuConfig) {
        this.api.registerMenu(menuConfig);
    }
    /**
     * Register a command menu item (appears in command palette)
     */
    registerCommandMenu(commandMenuConfig) {
        this.api.registerCommandMenu(commandMenuConfig);
    }
    /**
     * Execute a command
     */
    executeCommand(commandId, args) {
        return this.api.executeCommand(commandId, args);
    }
    /**
     * Show a notification
     */
    showNotification(title, message, type) {
        this.api.showNotification(title, message, type);
    }
    /**
     * Show a progress indicator
     */
    showProgress(title, message, progress) {
        return Promise.resolve(this.api.showProgress(title, message, progress));
    }
    /**
     * Show output dialog with linear progress
     */
    showOutput(title) {
        this.api.showOutput(title);
    }
    /**
     * Add a line to the output dialog
     */
    addOutputLine(text, type) {
        this.api.addOutputLine(text, type);
    }
    /**
     * Update output dialog progress
     */
    updateOutputProgress(percent) {
        this.api.updateOutputProgress(percent);
    }
    /**
     * Set output dialog to indeterminate loading state
     */
    setOutputIndeterminate(isIndeterminate) {
        this.api.setOutputIndeterminate(isIndeterminate);
    }
    /**
     * Clear output dialog content
     */
    clearOutput() {
        this.api.clearOutput();
    }
    /**
     * Register an activity bar item
     */
    registerActivityBar(id, title, icon, status) {
        return this.api.registerActivityBar(id, title, icon, status);
    }
    /**
     * Update an activity bar item
     */
    updateActivityBar(id, updates) {
        return this.api.updateActivityBar(id, updates);
    }
    /**
     * Remove an activity bar item
     */
    removeActivityBar(id) {
        return this.api.removeActivityBar(id);
    }
    /**
     * Register a webview
     */
    registerWebview(id, title, htmlContent) {
        return this.api.registerWebview(id, title, htmlContent);
    }
    /**
     * Update a webview
     */
    updateWebview(id, htmlContent) {
        return this.api.updateWebview(id, htmlContent);
    }
    /**
     * Remove a webview
     */
    removeWebview(id) {
        return this.api.removeWebview(id);
    }
    /**
     * Show a quick pick dialog
     */
    showQuickPick(items, options) {
        return Promise.resolve(this.api.showQuickPick(items, options));
    }
    /**
     * Get system information
     */
    getSystemInfo() {
        return this.api.getSystemInfo();
    }
}
exports.default = Extension;
//# sourceMappingURL=index.js.map