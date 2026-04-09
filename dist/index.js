"use strict";
/**
 * Extension Handler - TypeScript Version
 * API for extension development in CodeInspector
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = exports.Asset = exports.Theme = exports.Dialog = void 0;
exports.createExtensionContext = createExtensionContext;
exports.registerCommand = registerCommand;
exports.registerMenu = registerMenu;
exports.registerCommandMenu = registerCommandMenu;
exports.executeCommand = executeCommand;
exports.showNotification = showNotification;
exports.showProgress = showProgress;
exports.hideProgress = hideProgress;
exports.registerActivityBar = registerActivityBar;
exports.updateActivityBar = updateActivityBar;
exports.removeActivityBar = removeActivityBar;
exports.showQuickPick = showQuickPick;
exports.showConfirmDialog = showConfirmDialog;
exports.showAlertDialog = showAlertDialog;
exports.showPromptDialog = showPromptDialog;
exports.showErrorDialog = showErrorDialog;
exports.showSuccessDialog = showSuccessDialog;
exports.showInformationMessage = showInformationMessage;
exports.getSystemInfo = getSystemInfo;
exports.registerWebview = registerWebview;
exports.registerStatusBar = registerStatusBar;
exports.showWebview = showWebview;
// Core Functions
/**
 * Create an extension context
 */
function createExtensionContext(options) {
    const { api, config, extensionPath } = options;
    return {
        api,
        config,
        extensionPath,
        name: config?.name || 'Unknown',
        version: config?.version || '0.0.0',
        id: config?.id || 'unknown'
    };
}
/**
 * Register a command
 */
function registerCommand(context, commandId, handler, metadata = {}) {
    if (context.api?.registerCommand) {
        context.api.registerCommand(commandId, handler, metadata);
    }
}
/**
 * Register a menu
 */
function registerMenu(context, menuConfig) {
    if (context.api?.registerMenu) {
        context.api.registerMenu(menuConfig);
    }
}
/**
 * Register a command menu item (appears in command palette)
 */
function registerCommandMenu(context, commandMenuConfig) {
    if (context.api?.registerCommandMenu) {
        context.api.registerCommandMenu(commandMenuConfig);
    }
}
/**
 * Execute a registered command
 */
function executeCommand(context, commandId, args) {
    if (context.api?.executeCommand) {
        return context.api.executeCommand(commandId, args);
    }
}
/**
 * Show a notification to the user
 */
function showNotification(context, config) {
    if (context.api?.showNotification) {
        context.api.showNotification(config);
    }
}
/**
 * Show an indeterminate progress indicator
 */
function showProgress(context, title, message) {
    if (context.api?.showProgress) {
        context.api.showProgress(title, message);
    }
}
/**
 * Hide the progress indicator
 */
function hideProgress(context) {
    if (context.api?.hideProgress) {
        context.api.hideProgress();
    }
}
/**
 * Register an activity bar item
 */
function registerActivityBar(context, id, label, iconPath, title, webviewId) {
    if (context.api?.registerActivityBar) {
        context.api.registerActivityBar({
            id,
            label,
            iconPath,
            title,
            webviewId
        });
    }
}
/**
 * Update an activity bar item
 */
function updateActivityBar(context, id, updates) {
    if (context.api?.updateActivityBar) {
        context.api.updateActivityBar(id, updates);
    }
}
/**
 * Remove an activity bar item
 */
function removeActivityBar(context, id) {
    if (context.api?.removeActivityBar) {
        context.api.removeActivityBar(id);
    }
}
/**
 * Show a quick pick dialog
 */
function showQuickPick(context, items, options) {
    if (context.api?.showQuickPick) {
        return context.api.showQuickPick({
            items,
            title: options?.title,
            placeholder: options?.placeholder
        });
    }
    return Promise.resolve(undefined);
}
// Dialog Functions
function showConfirmDialog(context, message, options = {}) {
    if (context.api?.showConfirmDialog) {
        return context.api.showConfirmDialog(message, options);
    }
    return Promise.resolve(false);
}
function showAlertDialog(context, message, options = {}) {
    if (context.api?.showAlertDialog) {
        return context.api.showAlertDialog(message, options);
    }
    return Promise.resolve(true);
}
function showPromptDialog(context, messageOrOptions, options) {
    if (!context.api?.showPromptDialog) {
        return Promise.resolve(null);
    }
    // Handle both signatures: (context, message, options) and (context, { message, ...options })
    let message;
    let finalOptions;
    if (typeof messageOrOptions === 'string') {
        message = messageOrOptions;
        finalOptions = options || {};
    }
    else {
        message = messageOrOptions.message || '';
        finalOptions = { ...messageOrOptions };
        delete finalOptions.message;
    }
    return context.api.showPromptDialog(message, finalOptions);
}
function showErrorDialog(context, message, options = {}) {
    if (context.api?.showErrorDialog) {
        return context.api.showErrorDialog(message, options);
    }
    return Promise.resolve(true);
}
function showSuccessDialog(context, message, options = {}) {
    if (context.api?.showSuccessDialog) {
        return context.api.showSuccessDialog(message, options);
    }
    return Promise.resolve(true);
}
/**
 * Show information message (wrapper around showAlertDialog)
 */
function showInformationMessage(context, message, options = {}) {
    return showAlertDialog(context, message, options);
}
/**
 * Dialog class for extension dialogs
 */
class Dialog {
    constructor(context) {
        this.context = context;
    }
    async confirm(message, options = {}) {
        return showConfirmDialog(this.context, message, options);
    }
    async alert(message, options = {}) {
        return showAlertDialog(this.context, message, options);
    }
    async prompt(message, options = {}) {
        return showPromptDialog(this.context, message, options);
    }
    async error(message, options = {}) {
        return showErrorDialog(this.context, message, options);
    }
    async success(message, options = {}) {
        return showSuccessDialog(this.context, message, options);
    }
}
exports.Dialog = Dialog;
/**
 * Theme class for extension theme management
 */
class Theme {
    constructor(context) {
        this.context = context;
    }
    /**
     * Get current theme ID
     */
    getCurrentTheme() {
        if (this.context.api?.getCurrentTheme) {
            return this.context.api.getCurrentTheme();
        }
        return null;
    }
    /**
     * Set theme by ID
     */
    setTheme(themeId) {
        if (this.context.api?.setTheme) {
            return this.context.api.setTheme(themeId);
        }
        return false;
    }
    /**
     * Get all available themes
     */
    getAllThemes() {
        if (this.context.api?.getAllThemes) {
            return this.context.api.getAllThemes();
        }
        return [];
    }
    /**
     * Get theme by ID
     */
    getTheme(themeId) {
        if (this.context.api?.getTheme) {
            return this.context.api.getTheme(themeId);
        }
        return null;
    }
    /**
     * Register a custom theme
     */
    registerTheme(theme) {
        if (this.context.api?.registerTheme) {
            return this.context.api.registerTheme(theme);
        }
        return false;
    }
    /**
     * Get a color value from current theme
     */
    getColor(colorKey) {
        if (this.context.api?.getThemeColor) {
            return this.context.api.getThemeColor(colorKey);
        }
        return null;
    }
}
exports.Theme = Theme;
/**
 * Get system information
 */
function getSystemInfo(context) {
    if (context.api?.getSystemInfo) {
        return context.api.getSystemInfo();
    }
    return {
        platform: process.platform,
        arch: process.arch,
        homeDir: process.env.HOME || process.env.USERPROFILE || ''
    };
}
/**
 * Register a webview
 * @param {Object} context - Extension context
 * @param {string} id - Webview identifier
 * @param {string} title - Webview title
 * @param {string} htmlContent - HTML content to display
 * @returns {void}
 */
function registerWebview(context, config, htmlContent) {
    if (context.api?.registerWebview) {
        context.api.registerWebview(config, htmlContent);
    }
}
/**
 * Asset class for managing icons, images, and resources
 */
class Asset {
    constructor(context) {
        this.assets = new Map();
        this.cache = new Map();
        this.context = context;
    }
    /**
     * Get Devicon SVG
     */
    async getDeviconSVG(category, variant = 'plain') {
        const cacheKey = `devicon:${category}:${variant}`;
        if (this.assets.has(cacheKey)) {
            return this.assets.get(cacheKey);
        }
        try {
            const url = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${category}/${category}-${variant}.svg`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load devicon: ${category}/${variant}`);
            }
            const svg = await response.text();
            this.assets.set(cacheKey, svg);
            return svg;
        }
        catch (error) {
            console.error('[Asset] Failed to load devicon:', error);
            return '';
        }
    }
    /**
     * Get Devicon URL
     */
    getDeviconUrl(category, variant = 'plain') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${category}/${category}-${variant}.svg`;
    }
    /**
     * Create Devicon element
     */
    async createDeviconElement(options) {
        const category = options.category || options.name;
        if (!category) {
            throw new Error('Either category or name must be provided');
        }
        const cacheKey = `element:${category}:${options.variant || 'plain'}`;
        if (this.cache.has(cacheKey) && !options.style && !options.color) {
            const cached = this.cache.get(cacheKey);
            return cached?.cloneNode(true);
        }
        const svg = await this.getDeviconSVG(category, options.variant || 'plain');
        const container = document.createElement('div');
        const sizeClass = typeof options.size === 'number'
            ? `icon-${options.size}px`
            : `icon-${options.size || 'md'}`;
        container.className = `devicon ${sizeClass}`;
        container.innerHTML = svg;
        const icon = container.firstElementChild;
        if (!icon) {
            console.error('[Asset] Invalid Devicon SVG:', category);
            return container;
        }
        // Apply color
        if (options.color) {
            icon.style.color = options.color;
            icon.querySelectorAll('[fill]').forEach((el) => {
                el.setAttribute('fill', options.color);
            });
        }
        // Apply size
        if (typeof options.size === 'number') {
            icon.style.width = `${options.size}px`;
            icon.style.height = `${options.size}px`;
        }
        // Apply custom class
        if (options.className) {
            icon.classList.add(options.className);
        }
        // Apply custom styles
        if (options.style) {
            Object.assign(icon.style, options.style);
        }
        if (!options.style && !options.color) {
            this.cache.set(cacheKey, icon);
        }
        return icon;
    }
    /**
     * Create icon element
     */
    async createIcon(options) {
        if (options.type === 'devicon' || options.category) {
            return this.createDeviconElement(options);
        }
        // Default behavior for other icon types
        const container = document.createElement('div');
        container.className = 'icon';
        return container;
    }
    /**
     * Get icon as SVG string
     */
    async getIconSVG(category, variant) {
        return this.getDeviconSVG(category, variant || 'plain');
    }
    /**
     * Register a custom asset
     */
    registerAsset(id, content) {
        this.assets.set(id, content);
    }
    /**
     * Get registered asset
     */
    getAsset(id) {
        return this.assets.get(id);
    }
    /**
     * Load SVG from URL or path
     */
    async loadSVG(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load SVG from ${url}`);
            }
            return await response.text();
        }
        catch (error) {
            console.error('[Asset] Failed to load SVG:', error);
            return '';
        }
    }
    /**
     * Load image
     */
    async loadImage(url) {
        const img = document.createElement('img');
        img.src = url;
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        });
    }
    /**
     * Create image element with options
     */
    async createImage(url, alt = '', options) {
        const img = await this.loadImage(url);
        img.alt = alt;
        if (options?.className)
            img.className = options.className;
        if (options?.style)
            Object.assign(img.style, options.style);
        return img;
    }
    /**
     * Get popular Devicon categories
     */
    getPopularCategories() {
        return [
            'javascript', 'typescript', 'nodejs', 'python', 'java',
            'react', 'angular', 'vuejs', 'nextjs', 'svelte',
            'express', 'django', 'flask', 'spring',
            'mongodb', 'postgresql', 'mysql', 'redis', 'docker',
            'git', 'github', 'gitlab', 'bitbucket',
            'npm', 'webpack', 'vite', 'jest'
        ];
    }
    /**
     * Preload multiple icons
     */
    async preloadIcons(categories, variant = 'plain') {
        const promises = categories.map(category => this.getDeviconSVG(category, variant));
        await Promise.allSettled(promises);
    }
    /**
     * Clear asset cache
     */
    clearCache() {
        this.cache.clear();
    }
    /**
     * Clear all assets
     */
    clearAll() {
        this.assets.clear();
        this.cache.clear();
    }
    /**
     * Get cache stats
     */
    getStats() {
        return {
            assetCount: this.assets.size,
            cacheCount: this.cache.size
        };
    }
}
exports.Asset = Asset;
/**
 * Language class for managing language configurations and snippets
 */
class Language {
    constructor(config) {
        this.snippets = new Map();
        this.config = config;
        // Initialize snippets
        if (config.snippets) {
            config.snippets.forEach(snippet => {
                this.snippets.set(snippet.prefix, snippet);
            });
        }
    }
    /**
     * Get language ID
     */
    getId() {
        return this.config.id;
    }
    /**
     * Get language name
     */
    getName() {
        return this.config.name;
    }
    /**
     * Get file extensions
     */
    getExtensions() {
        return [...this.config.extensions];
    }
    /**
     * Get language aliases
     */
    getAliases() {
        return this.config.aliases || [];
    }
    /**
     * Get MIME types
     */
    getMimeTypes() {
        return this.config.mimeTypes || [];
    }
    /**
     * Get all snippets
     */
    getSnippets() {
        return Array.from(this.snippets.values());
    }
    /**
     * Get snippet by prefix
     */
    getSnippet(prefix) {
        return this.snippets.get(prefix);
    }
    /**
     * Add a snippet
     */
    addSnippet(snippet) {
        this.snippets.set(snippet.prefix, snippet);
    }
    /**
     * Remove a snippet
     */
    removeSnippet(prefix) {
        return this.snippets.delete(prefix);
    }
    /**
     * Check if file extension matches language
     */
    matches(filePath) {
        const ext = '.' + filePath.split('.').pop()?.toLowerCase();
        return this.config.extensions.some(e => e.toLowerCase() === ext);
    }
    /**
     * Expand snippet body (handle array format)
     */
    expandSnippetBody(snippet) {
        if (typeof snippet.body === 'string') {
            return snippet.body;
        }
        return snippet.body.join('\n');
    }
    /**
     * Get language configuration
     */
    getConfig() {
        return { ...this.config };
    }
}
exports.Language = Language;
/**
 * Register a Status Bar item
 */
function registerStatusBar(context, itemConfig) {
    if (context.api?.registerStatusBar) {
        context.api.registerStatusBar(itemConfig);
    }
    return false;
}
/**
 * Show a webview
 */
function showWebview(context, config, htmlContent) {
    if (context.api?.registerWebview) {
        context.api.registerWebview(config, htmlContent);
    }
}
