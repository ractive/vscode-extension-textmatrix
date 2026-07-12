import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defineConfig } from "@vscode/test-cli";

// Place VS Code's user-data dir (and its IPC socket) in a short temp path.
// macOS caps Unix domain socket paths at ~104 chars; the default location
// under the workspace (.vscode-test/user-data) overflows that on CI runners
// with deeply nested workspace paths and makes VS Code fail to launch.
const userDataDir = mkdtempSync(join(tmpdir(), "vsc-"));

export default defineConfig({
	files: "out/test/**/*.test.js",
	launchArgs: ["--user-data-dir", userDataDir],
	mocha: {
		ui: "tdd",
		color: true,
	},
});
