/**
 * Extension Handler - TypeScript Version
 * API for extension development in CodeInspector
 */

// Type Definitions
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
  showQuickPick?({ items, options }: { items: QuickPickItem[], options?: QuickPickOptions }): Promise<QuickPickItem | undefined>;
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

// Core Functions

/**
 * Create an extension context
 */
export function createExtensionContext(options: {
  api?: ExtensionAPI;
  config?: ExtensionConfig;
  extensionPath?: string;
}): ExtensionContext {
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
export function registerCommand(
  context: ExtensionContext,
  commandId: string,
  handler: (...args: any[]) => any,
  metadata: Record<string, any> = {}
): void {
  if (context.api?.registerCommand) {
    context.api.registerCommand(commandId, handler, metadata);
  }
}

/**
 * Register a menu
 */
export function registerMenu(context: ExtensionContext, menuConfig: MenuConfig): void {
  if (context.api?.registerMenu) {
    context.api.registerMenu(menuConfig);
  }
}

/**
 * Register a command menu item (appears in command palette)
 */
export function registerCommandMenu(context: ExtensionContext, commandMenuConfig: CommandMenuConfig): void {
  if (context.api?.registerCommandMenu) {
    context.api.registerCommandMenu(commandMenuConfig);
  }
}

/**
 * Execute a registered command
 */
export function executeCommand(context: ExtensionContext, commandId: string, args?: any): any {
  if (context.api?.executeCommand) {
    return context.api.executeCommand(commandId, args);
  }
}

/**
 * Show a notification to the user
 */
export function showNotification(
  context: ExtensionContext,
  config: NotificationConfig
): void {
  if (context.api?.showNotification) {
    context.api.showNotification(config);
  }
}

/**
 * Show an indeterminate progress indicator
 */
export function showProgress(context: ExtensionContext, title: string, message: string): void {
  if (context.api?.showProgress) {
    context.api.showProgress(title, message);
  }
}

/**
 * Hide the progress indicator
 */
export function hideProgress(context: ExtensionContext): void {
  if (context.api?.hideProgress) {
    context.api.hideProgress();
  }
}

/**
 * Register an activity bar item
 */
export function registerActivityBar(
  context: ExtensionContext,
  id: string,
  label: string,
  iconPath: string,
  title: string,
  webviewId?: string
): void {
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
export function updateActivityBar(
  context: ExtensionContext,
  id: string,
  updates: Partial<ActivityBarConfig>
): void {
  if (context.api?.updateActivityBar) {
    context.api.updateActivityBar(id, updates);
  }
}

/**
 * Remove an activity bar item
 */
export function removeActivityBar(context: ExtensionContext, id: string): void {
  if (context.api?.removeActivityBar) {
    context.api.removeActivityBar(id);
  }
}



/**
 * Show a quick pick dialog
 */
export function showQuickPick(
  context: ExtensionContext,
  items: QuickPickItem[],
  options?: QuickPickOptions
): Promise<QuickPickItem | undefined> {
  if (context.api?.showQuickPick) {
    return context.api.showQuickPick({
      items,
      title: options?.title,
      placeholder: options?.placeholder
    } as any);
  }
  return Promise.resolve(undefined);
}

// Dialog Functions

export function showConfirmDialog(context: ExtensionContext, message: string, options: DialogOptions = {}): Promise<boolean> {
  if (context.api?.showConfirmDialog) {
    return context.api.showConfirmDialog(message, options);
  }
  return Promise.resolve(false);
}

export function showAlertDialog(context: ExtensionContext, message: string, options: DialogOptions = {}): Promise<boolean> {
  if (context.api?.showAlertDialog) {
    return context.api.showAlertDialog(message, options);
  }
  return Promise.resolve(true);
}

export function showPromptDialog(context: ExtensionContext, messageOrOptions: string | (PromptDialogOptions & { message?: string }), options?: PromptDialogOptions): Promise<string | null> {
  if (!context.api?.showPromptDialog) {
    return Promise.resolve(null);
  }

  // Handle both signatures: (context, message, options) and (context, { message, ...options })
  let message: string;
  let finalOptions: PromptDialogOptions;

  if (typeof messageOrOptions === 'string') {
    message = messageOrOptions;
    finalOptions = options || {};
  } else {
    message = messageOrOptions.message || '';
    finalOptions = { ...messageOrOptions };
    delete (finalOptions as any).message;
  }

  return context.api.showPromptDialog(message, finalOptions);
}

export function showErrorDialog(context: ExtensionContext, message: string, options: DialogOptions = {}): Promise<boolean> {
  if (context.api?.showErrorDialog) {
    return context.api.showErrorDialog(message, options);
  }
  return Promise.resolve(true);
}

export function showSuccessDialog(context: ExtensionContext, message: string, options: DialogOptions = {}): Promise<boolean> {
  if (context.api?.showSuccessDialog) {
    return context.api.showSuccessDialog(message, options);
  }
  return Promise.resolve(true);
}

/**
 * Show information message (wrapper around showAlertDialog)
 */
export function showInformationMessage(context: ExtensionContext, message: string, options: DialogOptions = {}): Promise<boolean> {
  return showAlertDialog(context, message, options);
}


/**
 * Dialog class for extension dialogs
 */
export class Dialog {
  constructor(private context: ExtensionContext) {}

  async confirm(message: string, options: DialogOptions = {}): Promise<boolean> {
    return showConfirmDialog(this.context, message, options);
  }

  async alert(message: string, options: DialogOptions = {}): Promise<boolean> {
    return showAlertDialog(this.context, message, options);
  }

  async prompt(message: string, options: PromptDialogOptions = {}): Promise<string | null> {
    return showPromptDialog(this.context, message, options);
  }

  async error(message: string, options: DialogOptions = {}): Promise<boolean> {
    return showErrorDialog(this.context, message, options);
  }

  async success(message: string, options: DialogOptions = {}): Promise<boolean> {
    return showSuccessDialog(this.context, message, options);
  }
}

/**
 * Theme class for extension theme management
 */
export class Theme {
  constructor(private context: ExtensionContext) {}

  /**
   * Get current theme ID
   */
  getCurrentTheme(): string | null {
    if (this.context.api?.getCurrentTheme) {
      return this.context.api.getCurrentTheme();
    }
    return null;
  }

  /**
   * Set theme by ID
   */
  setTheme(themeId: string): boolean {
    if (this.context.api?.setTheme) {
      return this.context.api.setTheme(themeId);
    }
    return false;
  }

  /**
   * Get all available themes
   */
  getAllThemes(): any[] {
    if (this.context.api?.getAllThemes) {
      return this.context.api.getAllThemes();
    }
    return [];
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): any {
    if (this.context.api?.getTheme) {
      return this.context.api.getTheme(themeId);
    }
    return null;
  }

  /**
   * Register a custom theme
   */
  registerTheme(theme: any): boolean {
    if (this.context.api?.registerTheme) {
      return this.context.api.registerTheme(theme);
    }
    return false;
  }

  /**
   * Get a color value from current theme
   */
  getColor(colorKey: string): string | null {
    if (this.context.api?.getThemeColor) {
      return this.context.api.getThemeColor(colorKey);
    }
    return null;
  }
}

/**
 * Get system information
 */
export function getSystemInfo(context: ExtensionContext): SystemInfo {
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
export function registerWebview(context: ExtensionContext, config: { id: string, title: string }, htmlContent: string): void {
  if (context.api?.registerWebview) {
    context.api.registerWebview(config, htmlContent);
  }
}

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
export class Asset {
  private context: ExtensionContext;
  private assets: Map<string, any> = new Map();
  private cache: Map<string, HTMLElement> = new Map();

  constructor(context: ExtensionContext) {
    this.context = context;
  }

  /**
   * Get Devicon SVG
   */
  async getDeviconSVG(category: string, variant: string = 'plain'): Promise<string> {
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
    } catch (error) {
      console.error('[Asset] Failed to load devicon:', error);
      return '';
    }
  }

  /**
   * Get Devicon URL
   */
  getDeviconUrl(category: string, variant: string = 'plain'): string {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${category}/${category}-${variant}.svg`;
  }

  /**
   * Create Devicon element
   */
  async createDeviconElement(options: AssetIconOptions): Promise<HTMLElement> {
    const category = options.category || options.name;
    if (!category) {
      throw new Error('Either category or name must be provided');
    }

    const cacheKey = `element:${category}:${options.variant || 'plain'}`;
    
    if (this.cache.has(cacheKey) && !options.style && !options.color) {
      const cached = this.cache.get(cacheKey);
      return cached?.cloneNode(true) as HTMLElement;
    }

    const svg = await this.getDeviconSVG(category, options.variant || 'plain');
    const container = document.createElement('div');
    
    const sizeClass = typeof options.size === 'number' 
      ? `icon-${options.size}px` 
      : `icon-${options.size || 'md'}`;
    
    container.className = `devicon ${sizeClass}`;
    container.innerHTML = svg;

    const icon = container.firstElementChild as HTMLElement;
    if (!icon) {
      console.error('[Asset] Invalid Devicon SVG:', category);
      return container;
    }

    // Apply color
    if (options.color) {
      icon.style.color = options.color;
      icon.querySelectorAll('[fill]').forEach((el: Element) => {
        el.setAttribute('fill', options.color!);
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
  async createIcon(options: AssetIconOptions): Promise<HTMLElement> {
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
  async getIconSVG(category: string, variant?: string): Promise<string> {
    return this.getDeviconSVG(category, variant || 'plain');
  }

  /**
   * Register a custom asset
   */
  registerAsset(id: string, content: any): void {
    this.assets.set(id, content);
  }

  /**
   * Get registered asset
   */
  getAsset(id: string): any {
    return this.assets.get(id);
  }

  /**
   * Load SVG from URL or path
   */
  async loadSVG(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load SVG from ${url}`);
      }
      return await response.text();
    } catch (error) {
      console.error('[Asset] Failed to load SVG:', error);
      return '';
    }
  }

  /**
   * Load image
   */
  async loadImage(url: string): Promise<HTMLImageElement> {
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
  async createImage(url: string, alt: string = '', options?: { className?: string; style?: Partial<CSSStyleDeclaration> }): Promise<HTMLImageElement> {
    const img = await this.loadImage(url);
    img.alt = alt;
    if (options?.className) img.className = options.className;
    if (options?.style) Object.assign(img.style, options.style);
    return img;
  }

  /**
   * Get popular Devicon categories
   */
  getPopularCategories(): string[] {
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
  async preloadIcons(categories: string[], variant: string = 'plain'): Promise<void> {
    const promises = categories.map(category =>
      this.getDeviconSVG(category, variant)
    );
    await Promise.allSettled(promises);
  }

  /**
   * Clear asset cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear all assets
   */
  clearAll(): void {
    this.assets.clear();
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getStats(): { assetCount: number; cacheCount: number } {
    return {
      assetCount: this.assets.size,
      cacheCount: this.cache.size
    };
  }
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
export class Language {
  private config: LanguageConfig;
  private snippets: Map<string, LanguageSnippet> = new Map();

  constructor(config: LanguageConfig) {
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
  getId(): string {
    return this.config.id;
  }

  /**
   * Get language name
   */
  getName(): string {
    return this.config.name;
  }

  /**
   * Get file extensions
   */
  getExtensions(): string[] {
    return [...this.config.extensions];
  }

  /**
   * Get language aliases
   */
  getAliases(): string[] {
    return this.config.aliases || [];
  }

  /**
   * Get MIME types
   */
  getMimeTypes(): string[] {
    return this.config.mimeTypes || [];
  }

  /**
   * Get all snippets
   */
  getSnippets(): LanguageSnippet[] {
    return Array.from(this.snippets.values());
  }

  /**
   * Get snippet by prefix
   */
  getSnippet(prefix: string): LanguageSnippet | undefined {
    return this.snippets.get(prefix);
  }

  /**
   * Add a snippet
   */
  addSnippet(snippet: LanguageSnippet): void {
    this.snippets.set(snippet.prefix, snippet);
  }

  /**
   * Remove a snippet
   */
  removeSnippet(prefix: string): boolean {
    return this.snippets.delete(prefix);
  }

  /**
   * Check if file extension matches language
   */
  matches(filePath: string): boolean {
    const ext = '.' + filePath.split('.').pop()?.toLowerCase();
    return this.config.extensions.some(e => e.toLowerCase() === ext);
  }

  /**
   * Expand snippet body (handle array format)
   */
  expandSnippetBody(snippet: LanguageSnippet): string {
    if (typeof snippet.body === 'string') {
      return snippet.body;
    }
    return snippet.body.join('\n');
  }

  /**
   * Get language configuration
   */
  getConfig(): LanguageConfig {
    return { ...this.config };
  }
}

/**
 * Register a Status Bar item
 */
export function registerStatusBar(
  context: ExtensionContext,
  itemConfig: StatusBarConfig
): any {
  if (context.api?.registerStatusBar) {
    context.api.registerStatusBar(itemConfig);
  }
  return false;
}

/**
 * Show a webview
 */
export function showWebview(
  context: ExtensionContext,
  config: WebviewConfig,
  htmlContent: string
): void {
  if (context.api?.registerWebview) {
    context.api.registerWebview(config, htmlContent);
  }
}
