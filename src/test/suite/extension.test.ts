import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as textmatrix from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('transpose', () => {
		assert.deepStrictEqual(
			textmatrix.transpose(
				[
					["1", "2", "3"],
					["4", "5", "6"]
				]
			),
			[
				["1", "4"],
				["2", "5"],
				["3", "6"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.transpose(
				[
					["1", "2"],
					["3", "4"]
				]
			),
			[
				["1", "3"],
				["2", "4"],
			],
		);
	});

	test('flipCharacters', () => {
		assert.deepStrictEqual(
			textmatrix.flipCharacters(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			),
			[
				["3", "2", "1"],
				["6", "5", "4"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.flipCharacters(
				[
					["1", "2"],
					["3", "4"],
				]
			),
			[
				["2", "1"],
				["4", "3"],
			],
		);
	});

	test('flipLines', () => {
		assert.deepStrictEqual(
			textmatrix.flipLines(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			),
			[
				["4", "5", "6"],
				["1", "2", "3"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.flipLines(
				[
					["1", "2", "3"],
					["4", "5", "6"],
					["7", "8", "9"],
				]
			),
			[
				["7", "8", "9"],
				["4", "5", "6"],
				["1", "2", "3"],
			],
		);
	});

	test('rotate90', () => {
		assert.deepStrictEqual(
			textmatrix.rotate90(
				[
					["1", "2"],
					["3", "4"],
				]
			),
			[
				["3", "1"],
				["4", "2"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.rotate90(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			),
			[
				["4", "1"],
				["5", "2"],
				["6", "3"],
			],
		);
	});

	test('rotate180', () => {
		assert.deepStrictEqual(
			textmatrix.rotate180(
				[
					["1", "2"],
					["3", "4"],
				]
			),
			[
				["4", "3"],
				["2", "1"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.rotate180(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			),
			[
				["6", "5", "4"],
				["3", "2", "1"],
			],
		);
	});

	test('rotate270', () => {
		assert.deepStrictEqual(
			textmatrix.rotate270(
				[
					["1", "2"],
					["3", "4"],
				]
			),
			[
				["2", "4"],
				["1", "3"],
			],
		);

		assert.deepStrictEqual(
			textmatrix.rotate270(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			),
			[
				["3", "6"],
				["2", "5"],
				["1", "4"],
			],
		);
	});

	test('toString', () => {
		assert.equal(
			"1 2 3\n4 5 6\n",
			textmatrix.toString(
				[
					["1", "2", "3"],
					["4", "5", "6"],
				]
			)
		);
	});

	test('e2e test', async () => {
		if (!vscode.window.activeTextEditor) {
			await vscode.commands.executeCommand("workbench.action.files.newUntitledFile");
		}
		const result = await vscode.window.activeTextEditor?.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(0, 0), " 1 2  3\n4 5  6 ");
		})
		.then(
			() => vscode.commands.executeCommand("textmatrix.transpose"),
			(reason) => assert.fail("Error executing extension: " + reason)
		)
		.then(
			() => vscode.window.activeTextEditor?.document.getText(),
			(reason) => assert.fail("Error: " + reason)
		);

		assert.equal(result, "1 4\n2 5\n3 6\n");
	});
});
