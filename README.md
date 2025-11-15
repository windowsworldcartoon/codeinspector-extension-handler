# @windowsworldcartoon/codeinspector-extension-handler

Extension handler and base class for creating CodeInspector extensions.

## Installation

```bash
npm install @windowsworldcartoon/codeinspector-extension-handler
```

## Usage

Create an extension by extending the `Extension` class:

```javascript
const Extension = require('@windowsworldcartoon/codeinspector-extension-handler');

class MyExtension extends Extension {
  activate() {
    console.log(`${this.name} activated`);
    
    // Register commands
    this.registerCommand('myext.action', () => {
      this.showNotification('My Extension', 'Action executed!');
      return { status: 'success' };
    });
    
    // Register menu items
    this.registerMenu({
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

  deactivate() {
    console.log(`${this.name} deactivated`);
  }
}

module.exports = MyExtension;
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

### Methods

#### `registerCommand(commandId: string, handler: Function): void`
Register a command that can be executed from the UI or command palette.

```javascript
this.registerCommand('ext.doSomething', (args) => {
  return { result: 'done' };
});
```

#### `registerMenu(menuConfig: MenuConfig): void`
Register a menu with items and submenus.

```javascript
this.registerMenu({
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

#### `executeCommand(commandId: string, args?: any): any`
Execute a registered command.

```javascript
const result = this.executeCommand('ext.doSomething', { key: 'value' });
```

#### `showNotification(title: string, message: string): void`
Show a notification to the user.

```javascript
this.showNotification('Success', 'Operation completed!');
```

#### `getSystemInfo(): SystemInfo`
Get system information (platform, architecture, etc.).

```javascript
const info = this.getSystemInfo();
console.log(info.platform); // 'win32', 'darwin', 'linux'
console.log(info.arch);     // 'x64', 'arm64', etc.
```

## TypeScript Support

TypeScript types are included. For TypeScript extensions:

```typescript
import Extension, {
  ExtensionAPI,
  ExtensionConfig,
  MenuConfig,
  SystemInfo
} from '@windowsworldcartoon/codeinspector-extension-handler';

class MyExtension extends Extension {
  activate(): void {
    // Your code here
  }
}

export default MyExtension;
```

## Publishing Your Extension

Use the CodeInspector CLI to publish your extension:

```bash
codeinspector publish <path-to-extension>
```

This command will:
1. Validate your extension manifest
2. Initialize a git repository (if needed)
3. Create an initial commit
4. Push to a git repository or GitHub
5. Create a GitHub release

Example:
```bash
codeinspector publish ./my-extension
```

You can also use the CodeInspector CLI interactively without specifying a path:
```bash
codeinspector publish
```

The CLI will guide you through:
- Selecting where to publish (GitHub or git repository)
- Adding remote origin if needed
- Creating and pushing commits
- Creating GitHub releases with your package version

## License

MIT
