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

  constructor(options: ExtensionOptions);

  /**
   * Called when the extension is activated
   */
  activate(): void;

  /**
   * Called when the extension is deactivated
   */
  deactivate(): void;

  /**
   * Register a command
   */
  registerCommand(commandId: string, handler: (...args: any[]) => any): void;

  /**
   * Register a menu item
   */
  registerMenu(menuConfig: MenuConfig): void;

  /**
   * Register a command menu item (appears in command palette)
   */
  registerCommandMenu(commandMenuConfig: CommandMenuConfig): void;

  /**
   * Execute a command
   */
  executeCommand(commandId: string, args?: any): any;

  /**
   * Show a notification
   */
  showNotification(title: string, message: string, type?: 'info' | 'warn' | 'error'): void;

  /**
   * Show a progress indicator
   */
  showProgress(title: string, message: string, progress?: number): Promise<void>;

  /**
   * Show output dialog with linear progress
   */
  showOutput(title?: string): void;

  /**
   * Add a line to the output dialog
   */
  addOutputLine(text: string, type?: 'log' | 'error' | 'warning' | 'success'): void;

  /**
   * Update output dialog progress
   */
  updateOutputProgress(percent: number): void;

  /**
   * Set output dialog to indeterminate loading state
   */
  setOutputIndeterminate(isIndeterminate?: boolean): void;

  /**
   * Clear output dialog content
   */
  clearOutput(): void;

  /**
   * Register an activity bar item
   */
  registerActivityBar(id: string, title: string, icon?: string, status?: string): ActivityItem;

  /**
   * Update an activity bar item
   */
  updateActivityBar(id: string, updates?: Record<string, any>): ActivityItem | null;

  /**
   * Remove an activity bar item
   */
  removeActivityBar(id: string): { success: boolean };

  /**
   * Register a webview
   */
  registerWebview(id: string, title: string, htmlContent: string): Webview;

  /**
   * Update a webview
   */
  updateWebview(id: string, htmlContent: string): Webview | null;

  /**
   * Remove a webview
   */
  removeWebview(id: string): { success: boolean };

  /**
   * Show a quick pick dialog
   */
  showQuickPick(items: QuickPickItem[], options?: { placeHolder?: string; title?: string }): Promise<QuickPickItem | undefined>;

  /**
   * Get system information
   */
  getSystemInfo(): SystemInfo;
}
