/**
 * Extension Handler - TypeScript Version
 * API for extension development in CodeInspector
 */
export interface ExtensionAPI {
    registerCommand?(id: string, handler: (...args: any[]) => any, metadata?: Record<string, any>): void;
    registerMenu?(config: MenuConfig): void;
    registerCommandMenu?(config: CommandMenuConfig): void;
    executeCommand?(id: string, args?: any): any;
    showNotification?(config: NotificationConfig): void;
    showProgress?(title: string, message: string): void;
    hideProgress?(): void;
    registerActivityBar?(config: ActivityBarConfig): void;
    updateActivityBar?(id: string, updates: Partial<ActivityBarConfig>): void;
    removeActivityBar?(id: string): void;
    showQuickPick?({ items, options }: {
        items: QuickPickItem[];
        options?: QuickPickOptions;
    }): Promise<QuickPickItem | undefined>;
    showConfirmDialog?(message: string, options?: DialogOptions): Promise<boolean>;
    showAlertDialog?(message: string, options?: DialogOptions): Promise<boolean>;
    showPromptDialog?(message: string, options?: PromptDialogOptions): Promise<string | null>;
    showErrorDialog?(message: string, options?: DialogOptions): Promise<boolean>;
    showSuccessDialog?(message: string, options?: DialogOptions): Promise<boolean>;
    getCurrentTheme?(): string | null;
    setTheme?(themeId: string): boolean;
    getAllThemes?(): any[];
    getTheme?(themeId: string): any;
    registerTheme?(theme: any): boolean;
    getThemeColor?(colorKey: string): string | null;
    getSystemInfo?(): SystemInfo;
    registerWebview?(options: WebviewConfig, htmlContent: string): void;
    registerStatusBar?(config: StatusBarConfig): void;
}
export interface ContextMenuConfig {
    id: string;
    label: string;
    items: ContextMenuItem[];
}
export interface ContextMenuItem {
    id: string;
    label: string;
    action: string;
    separator?: boolean;
    disabled?: boolean;
    data?: any;
}
export interface StatusBarConfig {
    id: string;
    label: string;
    text: string;
    alignment: 'left' | 'right';
    tooltip: string;
}
export interface ExtensionConfig {
    name?: string;
    version?: string;
    id?: string;
    [key: string]: any;
}
export interface ExtensionContext {
    api?: ExtensionAPI;
    config?: ExtensionConfig;
    extensionPath?: string;
    name: string;
    version: string;
    id: string;
}
export interface MenuConfig {
    id: string;
    label: string;
    items?: MenuItem[];
    position?: 'before' | 'after';
    insertBeforeId?: string;
    submenu?: MenuItem[];
}
export interface MenuItem {
    label: string;
    id?: string;
    type?: 'normal' | 'separator' | 'checkbox' | 'radio';
    accelerator?: string;
    icon?: string;
    enabled?: boolean;
    visible?: boolean;
    command?: string;
    click?: () => void;
    submenu?: MenuItem[];
}
export interface CommandMenuConfig {
    id: string;
    title: string;
    command: string;
    keybinding?: string;
}
export interface NotificationConfig {
    title: string;
    message: string;
    type?: 'info' | 'warn' | 'error';
}
export interface ActivityBarConfig {
    id: string;
    label: string;
    iconPath: string;
    title: string;
    webviewId?: string;
    status?: string;
    icon?: string;
}
export interface WebviewConfig {
    id: string;
    title: string;
}
export type DockPosition = 'left' | 'right' | 'bottom' | 'top' | 'center' | 'float';
export type DockSize = 'small' | 'medium' | 'large' | 'full';
export interface DockPanelConfig {
    id: string;
    title: string;
    icon?: string;
    position: DockPosition;
    size?: DockSize;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    resizable?: boolean;
    closeable?: boolean;
    collapsible?: boolean;
    content?: HTMLElement | string;
    isVisible?: boolean;
    isCollapsed?: boolean;
}
export interface DockPanel extends DockPanelConfig {
    isVisible: boolean;
    isCollapsed: boolean;
}
export interface QuickPickItem {
    label: string;
    description?: string;
    detail?: string;
    value?: any;
}
export interface QuickPickOptions {
    title?: string;
    placeholder?: string;
}
export interface DialogOptions {
    title?: string;
    buttonLabel?: string;
    cancelLabel?: string;
    okLabel?: string;
}
export interface PromptDialogOptions extends DialogOptions {
    placeholder?: string;
    defaultValue?: string;
}
export interface SystemInfo {
    platform: NodeJS.Platform;
    arch: string;
    homeDir: string;
}
/**
 * Create an extension context
 */
export declare function createExtensionContext(options: {
    api?: ExtensionAPI;
    config?: ExtensionConfig;
    extensionPath?: string;
}): ExtensionContext;
/**
 * Register a command
 */
export declare function registerCommand(context: ExtensionContext, commandId: string, handler: (...args: any[]) => any, metadata?: Record<string, any>): void;
/**
 * Register a menu
 */
export declare function registerMenu(context: ExtensionContext, menuConfig: MenuConfig): void;
/**
 * Register a command menu item (appears in command palette)
 */
export declare function registerCommandMenu(context: ExtensionContext, commandMenuConfig: CommandMenuConfig): void;
/**
 * Execute a registered command
 */
export declare function executeCommand(context: ExtensionContext, commandId: string, args?: any): any;
/**
 * Show a notification to the user
 */
export declare function showNotification(context: ExtensionContext, config: NotificationConfig): void;
/**
 * Show an indeterminate progress indicator
 */
export declare function showProgress(context: ExtensionContext, title: string, message: string): void;
/**
 * Hide the progress indicator
 */
export declare function hideProgress(context: ExtensionContext): void;
/**
 * Register an activity bar item
 */
export declare function registerActivityBar(context: ExtensionContext, id: string, label: string, iconPath: string, title: string, webviewId?: string): void;
/**
 * Update an activity bar item
 */
export declare function updateActivityBar(context: ExtensionContext, id: string, updates: Partial<ActivityBarConfig>): void;
/**
 * Remove an activity bar item
 */
export declare function removeActivityBar(context: ExtensionContext, id: string): void;
/**
 * Show a quick pick dialog
 */
export declare function showQuickPick(context: ExtensionContext, items: QuickPickItem[], options?: QuickPickOptions): Promise<QuickPickItem | undefined>;
export declare function showConfirmDialog(context: ExtensionContext, message: string, options?: DialogOptions): Promise<boolean>;
export declare function showAlertDialog(context: ExtensionContext, message: string, options?: DialogOptions): Promise<boolean>;
export declare function showPromptDialog(context: ExtensionContext, messageOrOptions: string | (PromptDialogOptions & {
    message?: string;
}), options?: PromptDialogOptions): Promise<string | null>;
export declare function showErrorDialog(context: ExtensionContext, message: string, options?: DialogOptions): Promise<boolean>;
export declare function showSuccessDialog(context: ExtensionContext, message: string, options?: DialogOptions): Promise<boolean>;
/**
 * Show information message (wrapper around showAlertDialog)
 */
export declare function showInformationMessage(context: ExtensionContext, message: string, options?: DialogOptions): Promise<boolean>;
/**
 * Dialog class for extension dialogs
 */
export declare class Dialog {
    private context;
    constructor(context: ExtensionContext);
    confirm(message: string, options?: DialogOptions): Promise<boolean>;
    alert(message: string, options?: DialogOptions): Promise<boolean>;
    prompt(message: string, options?: PromptDialogOptions): Promise<string | null>;
    error(message: string, options?: DialogOptions): Promise<boolean>;
    success(message: string, options?: DialogOptions): Promise<boolean>;
}
/**
 * Theme class for extension theme management
 */
export declare class Theme {
    private context;
    constructor(context: ExtensionContext);
    /**
     * Get current theme ID
     */
    getCurrentTheme(): string | null;
    /**
     * Set theme by ID
     */
    setTheme(themeId: string): boolean;
    /**
     * Get all available themes
     */
    getAllThemes(): any[];
    /**
     * Get theme by ID
     */
    getTheme(themeId: string): any;
    /**
     * Register a custom theme
     */
    registerTheme(theme: any): boolean;
    /**
     * Get a color value from current theme
     */
    getColor(colorKey: string): string | null;
}
/**
 * Get system information
 */
export declare function getSystemInfo(context: ExtensionContext): SystemInfo;
/**
 * Register a webview
 * @param {Object} context - Extension context
 * @param {string} id - Webview identifier
 * @param {string} title - Webview title
 * @param {string} htmlContent - HTML content to display
 * @returns {void}
 */
export declare function registerWebview(context: ExtensionContext, config: {
    id: string;
    title: string;
}, htmlContent: string): void;
/**
 * Asset Icon Options
 */
export interface AssetIconOptions {
    name?: string;
    category?: string;
    variant?: 'plain' | 'plain-wordmark' | 'original' | 'original-wordmark' | 'line' | 'line-wordmark';
    size?: 'sm' | 'md' | 'lg' | 'xl' | number;
    color?: string;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    type?: 'custom' | 'devicon' | 'font-awesome';
}
/**
 * Asset class for managing icons, images, and resources
 */
export declare class Asset {
    private context;
    private assets;
    private cache;
    constructor(context: ExtensionContext);
    /**
     * Get Devicon SVG
     */
    getDeviconSVG(category: string, variant?: string): Promise<string>;
    /**
     * Get Devicon URL
     */
    getDeviconUrl(category: string, variant?: string): string;
    /**
     * Create Devicon element
     */
    createDeviconElement(options: AssetIconOptions): Promise<HTMLElement>;
    /**
     * Create icon element
     */
    createIcon(options: AssetIconOptions): Promise<HTMLElement>;
    /**
     * Get icon as SVG string
     */
    getIconSVG(category: string, variant?: string): Promise<string>;
    /**
     * Register a custom asset
     */
    registerAsset(id: string, content: any): void;
    /**
     * Get registered asset
     */
    getAsset(id: string): any;
    /**
     * Load SVG from URL or path
     */
    loadSVG(url: string): Promise<string>;
    /**
     * Load image
     */
    loadImage(url: string): Promise<HTMLImageElement>;
    /**
     * Create image element with options
     */
    createImage(url: string, alt?: string, options?: {
        className?: string;
        style?: Partial<CSSStyleDeclaration>;
    }): Promise<HTMLImageElement>;
    /**
     * Get popular Devicon categories
     */
    getPopularCategories(): string[];
    /**
     * Preload multiple icons
     */
    preloadIcons(categories: string[], variant?: string): Promise<void>;
    /**
     * Clear asset cache
     */
    clearCache(): void;
    /**
     * Clear all assets
     */
    clearAll(): void;
    /**
     * Get cache stats
     */
    getStats(): {
        assetCount: number;
        cacheCount: number;
    };
}
/**
 * Language Snippet Definition
 */
export interface LanguageSnippet {
    label: string;
    description?: string;
    prefix: string;
    body: string | string[];
    scope?: string;
}
/**
 * Language Configuration
 */
export interface LanguageConfig {
    id: string;
    name: string;
    extensions: string[];
    aliases?: string[];
    mimeTypes?: string[];
    snippets?: LanguageSnippet[];
}
/**
 * Language class for managing language configurations and snippets
 */
export declare class Language {
    private config;
    private snippets;
    constructor(config: LanguageConfig);
    /**
     * Get language ID
     */
    getId(): string;
    /**
     * Get language name
     */
    getName(): string;
    /**
     * Get file extensions
     */
    getExtensions(): string[];
    /**
     * Get language aliases
     */
    getAliases(): string[];
    /**
     * Get MIME types
     */
    getMimeTypes(): string[];
    /**
     * Get all snippets
     */
    getSnippets(): LanguageSnippet[];
    /**
     * Get snippet by prefix
     */
    getSnippet(prefix: string): LanguageSnippet | undefined;
    /**
     * Add a snippet
     */
    addSnippet(snippet: LanguageSnippet): void;
    /**
     * Remove a snippet
     */
    removeSnippet(prefix: string): boolean;
    /**
     * Check if file extension matches language
     */
    matches(filePath: string): boolean;
    /**
     * Expand snippet body (handle array format)
     */
    expandSnippetBody(snippet: LanguageSnippet): string;
    /**
     * Get language configuration
     */
    getConfig(): LanguageConfig;
}
/**
 * Register a Status Bar item
 */
export declare function registerStatusBar(context: ExtensionContext, itemConfig: StatusBarConfig): any;
/**
 * Show a webview
 */
export declare function showWebview(context: ExtensionContext, config: WebviewConfig, htmlContent: string): void;
//# sourceMappingURL=index.d.ts.map