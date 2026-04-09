# @codeinspector/extension-handler

Lightweight utility functions for creating CodeInspector extensions. Provides a functional API for registering commands, menus, webviews, and activity items.

## Installation

```bash
npm install @codeinspector/extension-handler
```

## Usage

### Basic Setup

Create an extension using the functional API. Supports both ES modules and CommonJS.

#### CommonJS

```javascript
const code = require('@codeinspector/extension-handler');

// In your extension's activate function:
module.exports = async (api, config) => {
  const context = code.createExtensionContext({
    api,
    config,
    extensionPath: __dirname
  });

 

  // Register a simple command
  code.registerCommand(context, 'my-js.hello', () => {
   code.showConfirmDialog(context, 'Hello', {
     title: 'Hello',
     message: 'Extension loaded successfully!',
     type: 'info',
     buttonLabel: 'OK'
   });
  })

  

  code.registerMenu(context, {
    id: 'my-menu',
    label: 'My Extension',
    items: [
      {
        id: 'my-menu.action',
        label: 'Execute Action',
        command: 'my-js.hello'
      }
    ]
  });
  
  code.registerStatusBar(context, {
    id: 'my-status-bar',
    text: 'My Status Bar',
  });

  console.log('Extension loaded:', context.name);
};

```

#### ES Modules

```javascript
import code from '@codeinspector/extension-handler';

// In your extension's activate function:
export function activate(api, config, extensionPath) {
  const context = createExtensionContext({
    api,
    config,
    extensionPath
  });

  // Register a command
  registerCommand(context, 'myext.action', () => {
    showNotification(context, 'My Extension', 'Action executed!');
    return { status: 'success' };
  });

  // Register a menu
  registerMenu(context, {
    id: 'myext-menu',
    label: 'My Extension',
    submenu: [
      {
        id: 'myext.action',
        label: 'Execute Action',
        command: 'myext.action'
      }
    ]
  });
}
```

## Extension Manifest

Create a `manifest.json` in your extension root:

```json
{
  "id": "myextension",
  "name": "My Extension",
  "version": "1.0.0",
  "description": "My CodeInspector extension",
  "author": "Your Name",
  "main": "index.js"
}
```

## API Reference

### `createExtensionContext(options)`

Create an extension context with the provided API.

```javascript
const context = createExtensionContext({
  api,           // Extension API reference
  config,        // Extension configuration
  extensionPath  // Path to extension directory
});
```

Returns an object with:

- `api` - Extension API reference
- `config` - Extension configuration
- `extensionPath` - Extension directory path
- `name` - Extension name
- `version` - Extension version
- `id` - Extension ID

### `registerCommand(context, commandId, handler)`

Register a command that can be executed from the UI or command palette.

```javascript
registerCommand(context, 'ext.doSomething', (args) => {
  return { result: 'done' };
});
```

### `registerMenu(context, menuConfig)`

Register a menu with items and submenus.

```javascript
registerMenu(context, {
  id: 'ext-menu',
  label: 'My Menu',
  submenu: [
    {
      id: 'ext.action1',
      label: 'Action 1',
      command: 'ext.action1'
    }
  ]
});
```

### `registerCommandMenu(context, commandMenuConfig)`

Register a command menu item (appears in command palette).

```javascript
registerCommandMenu(context, {
  id: 'ext.quickAction',
  title: 'Quick Action',
  command: 'ext.quickAction',
  keybinding: 'ctrl+shift+p'
});
```

### `executeCommand(context, commandId, args)`

Execute a registered command.

```javascript
const result = executeCommand(context, 'ext.doSomething', { key: 'value' });
```

### `showNotification(context, title, message, type)`

Show a notification to the user.

```javascript
showNotification(context, 'Success', 'Operation completed!', 'info');
// type: 'info' | 'warn' | 'error'
```

### `showProgress(context, title, message, progress)`

Show a progress indicator.

```javascript
showProgress(context, 'Loading', 'Processing files...', 50);
// progress: 0-100
```

### `registerActivityBar(context, id, title, icon, status)`

Register an activity bar item.

```javascript
registerActivityBar(context, 'activity-1', 'My Activity', 'circle', 'active');
// icon: 'circle' | 'spinner' | 'check' | 'x'
// status: 'active' | 'pending' | 'success' | 'error'
```

### `updateActivityBar(context, id, updates)`

Update an activity bar item.

```javascript
updateActivityBar(context, 'activity-1', {
  title: 'Updated Title',
  status: 'success'
});
```

### `removeActivityBar(context, id)`

Remove an activity bar item.

```javascript
removeActivityBar(context, 'activity-1');
```

### `registerWebview(context, id, title, htmlContent)`

Register an HTML webview.

```javascript
registerWebview(context, 'webview-1', 'My Webview', '<div>Content</div>');
```

### `updateWebview(context, id, htmlContent)`

Update a webview's HTML content.

```javascript
updateWebview(context, 'webview-1', '<div>Updated Content</div>');
```

### `removeWebview(context, id)`

Remove a webview.

```javascript
removeWebview(context, 'webview-1');
```

### `showQuickPick(context, items, options)`

Show a quick pick dialog.

```javascript
const selected = await showQuickPick(context, [
  {
    label: 'Option 1',
    description: 'First option',
    detail: 'Details about option 1',
    value: { id: 1 }
  },
  {
    label: 'Option 2',
    description: 'Second option',
    value: { id: 2 }
  }
], {
  title: 'Select an option',
  placeHolder: 'Type to filter...'
});
```

### `getSystemInfo(context)`

Get system information (platform, architecture, etc.).

```javascript
const info = getSystemInfo(context);
console.log(info.platform); // 'win32', 'darwin', 'linux'
console.log(info.arch);     // 'x64', 'arm64', etc.
console.log(info.homeDir);  // Home directory path
```

## Version History

- **1.0.0** - Initial release

## License

This extension is released under the [MIT License](https://opensource.org/licenses/MIT).

## Note: the Application CodeInspector is not currently out yet but will be soon. Please check back later for updates
