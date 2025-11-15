/**
 * Activity bar item
 */
export interface ActivityItem {
  id: string;
  title: string;
  icon: string;
  status: 'active' | 'pending' | 'success' | 'error';
  timestamp: string;
}

/**
 * Webview registration
 */
export interface Webview {
  id: string;
  title: string;
  htmlContent: string;
}

/**
 * Quick pick item
 */
export interface QuickPickItem {
  label: string;
  description?: string;
  detail?: string;
  value?: any;
}

/**
 * API available to extensions
 */
export interface ExtensionAPI {
  registerCommand(commandId: string, handler: (...args: any[]) => any): void;
  registerMenu(menuConfig: MenuConfig): void;
  registerCommandMenu(commandMenuConfig: CommandMenuConfig): void;
  executeCommand(commandId: string, args?: any): any;
  showNotification(title: string, message: string, type?: 'info' | 'warn' | 'error'): void;
  showProgress(title: string, message: string, progress?: number): Promise<void>;
  showOutput(title?: string): void;
  addOutputLine(text: string, type?: 'log' | 'error' | 'warning' | 'success'): void;
  updateOutputProgress(percent: number): void;
  setOutputIndeterminate(isIndeterminate?: boolean): void;
  clearOutput(): void;
  registerActivityBar(id: string, title: string, icon?: string, status?: string): ActivityItem;
  updateActivityBar(id: string, updates?: Record<string, any>): ActivityItem | null;
  removeActivityBar(id: string): { success: boolean };
  registerWebview(id: string, title: string, htmlContent: string): Webview;
  updateWebview(id: string, htmlContent: string): Webview | null;
  removeWebview(id: string): { success: boolean };
  showQuickPick(items: QuickPickItem[], options?: { placeHolder?: string; title?: string }): Promise<QuickPickItem | undefined>;
  getSystemInfo(): SystemInfo;
}

/**
 * Extension configuration from manifest
 */
export interface ExtensionConfig {
  name: string;
  version: string;
  id: string;
  description?: string;
  author?: string;
  [key: string]: any;
}

/**
 * Menu item configuration
 */
export interface MenuItem {
  id: string;
  label: string;
  command?: string;
  submenu?: MenuItem[];
  icon?: string;
}

/**
 * Menu registration configuration
 */
export interface MenuConfig {
  id: string;
  label: string;
  submenu?: MenuItem[];
  icon?: string;
}

/**
 * Command menu configuration (for command palette)
 */
export interface CommandMenuConfig {
  id: string;
  name: string;
  action: string;
  extensionId?: string;
  command?: string;
  description?: string;
  shortcut?: string;
  [key: string]: any;
}

/**
 * System information
 */
export interface SystemInfo {
  platform: string;
  arch: string;
  [key: string]: any;
}

/**
 * Extension constructor options
 */
export interface ExtensionOptions {
  api: ExtensionAPI;
  config: ExtensionConfig;
  extensionPath: string;
}

/**
 * Base Extension class for CodeInspector extensions
 */
export default class Extension {
  api: ExtensionAPI;
  config: ExtensionConfig;
  extensionPath: string;
  name: string;
  version: string;
  id: string;

  constructor(options: ExtensionOptions) {
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
  activate(): void {
    console.log(`${this.name} activated`);
  }

  /**
   * Called when the extension is deactivated
   */
  deactivate(): void {
    console.log(`${this.name} deactivated`);
  }

  /**
   * Register a command
   */
  registerCommand(commandId: string, handler: (...args: any[]) => any): void {
    this.api.registerCommand(commandId, handler);
  }

  /**
   * Register a menu item
   */
  registerMenu(menuConfig: MenuConfig): void {
    this.api.registerMenu(menuConfig);
  }

  /**
   * Register a command menu item (appears in command palette)
   */
  registerCommandMenu(commandMenuConfig: CommandMenuConfig): void {
    this.api.registerCommandMenu(commandMenuConfig);
  }

  /**
   * Execute a command
   */
  executeCommand(commandId: string, args?: any): any {
    return this.api.executeCommand(commandId, args);
  }

  /**
   * Show a notification
   */
  showNotification(title: string, message: string, type?: 'info' | 'warn' | 'error'): void {
    this.api.showNotification(title, message, type);
  }

  /**
   * Show a progress indicator
   */
  showProgress(title: string, message: string, progress?: number): Promise<void> {
    return Promise.resolve(this.api.showProgress(title, message, progress));
  }

  /**
   * Show output dialog with linear progress
   */
  showOutput(title?: string): void {
    this.api.showOutput(title);
  }

  /**
   * Add a line to the output dialog
   */
  addOutputLine(text: string, type?: 'log' | 'error' | 'warning' | 'success'): void {
    this.api.addOutputLine(text, type);
  }

  /**
   * Update output dialog progress
   */
  updateOutputProgress(percent: number): void {
    this.api.updateOutputProgress(percent);
  }

  /**
   * Set output dialog to indeterminate loading state
   */
  setOutputIndeterminate(isIndeterminate?: boolean): void {
    this.api.setOutputIndeterminate(isIndeterminate);
  }

  /**
   * Clear output dialog content
   */
  clearOutput(): void {
    this.api.clearOutput();
  }

  /**
   * Register an activity bar item
   */
  registerActivityBar(id: string, title: string, icon?: string, status?: string): ActivityItem {
    return this.api.registerActivityBar(id, title, icon, status);
  }

  /**
   * Update an activity bar item
   */
  updateActivityBar(id: string, updates?: Record<string, any>): ActivityItem | null {
    return this.api.updateActivityBar(id, updates);
  }

  /**
   * Remove an activity bar item
   */
  removeActivityBar(id: string): { success: boolean } {
    return this.api.removeActivityBar(id);
  }

  /**
   * Register a webview
   */
  registerWebview(id: string, title: string, htmlContent: string): Webview {
    return this.api.registerWebview(id, title, htmlContent);
  }

  /**
   * Update a webview
   */
  updateWebview(id: string, htmlContent: string): Webview | null {
    return this.api.updateWebview(id, htmlContent);
  }

  /**
   * Remove a webview
   */
  removeWebview(id: string): { success: boolean } {
    return this.api.removeWebview(id);
  }

  /**
   * Show a quick pick dialog
   */
  showQuickPick(items: QuickPickItem[], options?: { placeHolder?: string; title?: string }): Promise<QuickPickItem | undefined> {
    return Promise.resolve(this.api.showQuickPick(items, options));
  }

  /**
   * Get system information
   */
  getSystemInfo(): SystemInfo {
    return this.api.getSystemInfo();
  }
}
