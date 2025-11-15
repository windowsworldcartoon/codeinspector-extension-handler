# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-15

### Added
- Initial release of @codeinspector/extension-handler
- Base `Extension` class for creating CodeInspector extensions
- Full TypeScript support with type definitions
- Extension lifecycle methods: `activate()` and `deactivate()`
- Command registration and execution
- Menu registration (both regular and command palette)
- Notification system
- Progress indication (standard and indeterminate)
- Output dialog with linear progress indicator
- Activity bar management
- Webview registration and management
- Quick pick dialog support
- System information retrieval
- Comprehensive JSDoc documentation
- Support for both CommonJS and ES modules

### Features
- **Commands**: Register and execute commands accessible from UI and command palette
- **Menus**: Create custom menu items and submenus
- **Notifications**: Show info, warning, and error notifications
- **Progress**: Display linear or indeterminate progress indicators
- **Output Dialog**: Show formatted output with progress tracking
- **Activity Bar**: Register visual indicators for long-running operations
- **Webviews**: Embed custom HTML content
- **Quick Pick**: Present users with filterable selection dialogs
- **System Integration**: Access platform and architecture information

### Documentation
- Complete README with usage examples
- API reference for all public methods
- TypeScript type definitions
- Manifest.json specification
