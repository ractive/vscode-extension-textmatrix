# Change Log

All notable changes to the "textmatrix" extension will be documented in this file.

## [0.2.4] - 2026-07-12

### Changed

- Modernized the whole toolchain (no functional changes to the extension):
  - Raised the VS Code baseline to `^1.90.0` (`@types/vscode` and `engines.vscode`).
  - Upgraded TypeScript to 7.x and switched the build to esbuild bundling
    (`main` now points at `./dist/extension.js`).
  - Replaced ESLint + `@typescript-eslint` with [Biome](https://biomejs.dev)
    (ESLint's TypeScript support is not yet compatible with TypeScript 7).
  - Migrated the test setup from the deprecated `vscode-test` to
    `@vscode/test-cli` + `@vscode/test-electron` (removed the `glob`-based
    test bootstrap).
  - Switched the package manager to npm and refreshed the GitHub Actions
    workflow (Node 20, updated actions).
  - Removed the obsolete `activationEvents` (commands auto-activate since
    VS Code 1.74) and fixed the `icons/transpose-dark.png` icon path typo.
