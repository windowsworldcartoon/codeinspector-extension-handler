# Publishing to NPM

## Pre-Publication Checklist

✅ **Package Files**

- [x] dist/index.js - Compiled JavaScript
- [x] dist/index.d.ts - TypeScript definitions
- [x] README.md - Complete documentation
- [x] CHANGELOG.md - Version history
- [x] package.json - Properly configured
- [x] .npmignore - Excludes unnecessary files

✅ **Package Configuration**

- [x] Author and license specified
- [x] Repository URL configured
- [x] Keywords optimized for discovery
- [x] Main entry point correct
- [x] Types entry point specified
- [x] Files whitelist configured

✅ **Documentation**

- [x] Installation instructions
- [x] Usage examples
- [x] API reference
- [x] TypeScript support documented
- [x] Manifest specification
- [x] Publishing guide for users

## How to Publish

### Prerequisites

1. Ensure you're logged into NPM with @codeinspector scope
2. Verify: `npm whoami`
3. Ensure you have npm >= 6.0.0

### Publishing Steps

```bash
# 1. Navigate to package directory
cd packages/@codeinspector/extension-handler

# 2. Verify build is complete
# dist/ folder should contain index.js and index.d.ts

# 3. Update version if needed (semantic versioning)
npm version patch  # or minor, major

# 4. Publish to npm
npm publish --access public

# 5. Verify publication
npm view @codeinspector/extension-handler
```

### Version Bumping

Follow semantic versioning:

- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes

Commands:

```bash
npm version major   # 1.0.0 → 2.0.0
npm version minor   # 1.0.0 → 1.1.0
npm version patch   # 1.0.0 → 1.0.1
```

## After Publishing

1. **Verify**: Check package on <https://www.npmjs.com/package/@codeinspector/extension-handler>
2. **Test**: Install in test project: `npm install @codeinspector/extension-handler`
3. **Announce**: Share with community
4. **Monitor**: Watch for issues and feedback

## Scope Explanation

This is a **scoped package** (@windowsworldcartoon/*):

- Published under the windowsworldcartoon scope
- Requires explicit `--access public` flag for first publish
- Subsequent publishes are automatic with same scope
- Users install with: `npm install @codeinspector/extension-handler`

## Common Issues

**"403 Forbidden" error**

- Ensure you're logged in: `npm whoami`
- Check NPM account has permission for scope
- First publish needs `--access public` flag

**"Package already exists"**

- Version already published
- Increment version number

**"dist/ folder missing"**

- Run `npm run build` first
- Ensure TypeScript compilation succeeds

## Support

For issues or questions:

- NPM Package: <https://www.npmjs.com/package/@codeinspector/extension-handler>
