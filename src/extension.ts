import * as vscode from 'vscode';

type TextMatrix = string[][];

export function transpose(textMatrix: TextMatrix): TextMatrix {
	let result: TextMatrix = [];
	if (textMatrix && textMatrix.length > 0) {
		for (let c = 0; c < textMatrix[0].length; c++) {
			const line: string[] = [];
			for (let i = 0; i < textMatrix.length; i++) {
				line.push(textMatrix[i][c]);
			}
			result.push(line);
		}
	}
	return result;
}

export function flipCharacters(textMatrix: TextMatrix): TextMatrix {
	let result: TextMatrix = [];
	for (let r = 0; r < textMatrix.length; r++) {
		result.push(textMatrix[r].reverse());
	}
	return result;
}

export function flipLines(textMatrix: TextMatrix): TextMatrix {
	let result: TextMatrix = Array.from(textMatrix);
	for (let r = 0; r < result.length / 2; r++) {
		const temp = result[r];
		result[r] = result[result.length - r - 1];
		result[result.length - r - 1] = temp;
	}
	return result;
}

export function rotate90(textMatrix: TextMatrix): TextMatrix {
	return flipCharacters(transpose(textMatrix));
}

export function rotate180(textMatrix: TextMatrix): TextMatrix {
	return flipLines(flipCharacters(textMatrix));
}

export function rotate270(textMatrix: TextMatrix): TextMatrix {
	return flipLines(transpose(textMatrix));
}

export function toString(textMatrix: TextMatrix): string {
	let result: string = "";
	for (let r = 0; r < textMatrix.length; r++) {
		for (let c = 0; c < textMatrix[r].length; c++) {
			result += textMatrix[r][c];
			if (c < textMatrix[r].length - 1) {
				result += " ";
			}
		}
		result += "\n";
	}
	return result;
}

export function activate(context: vscode.ExtensionContext) {
	function textMatrixFromDocument(document: vscode.TextDocument): TextMatrix {
		const textMatrix: TextMatrix = [];
		let columns = 0;
		for(let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i);
			if (!line.isEmptyOrWhitespace) {
				const tokens: string[] = line.text
					.substr(line.firstNonWhitespaceCharacterIndex)
					.trim()
					.split(/\s+/);
				if (columns === 0) {
					columns = tokens.length;
				} else if (columns !== tokens.length) {
					vscode.window.showErrorMessage(`Text not in rectangular form: Line ${i + 1} has ${tokens.length} elements, while lines before had ${columns} elements.`);
					throw new Error("Text not in rectangular form");
				}
				textMatrix.push(tokens);
			}
		}
		return textMatrix;
	}

	function doCommand(command: (textMatrix: TextMatrix) => TextMatrix) {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				try {
					const textMatrix: TextMatrix = textMatrixFromDocument(editor.document);
					let result = command(textMatrix);
					
					editBuilder.replace(new vscode.Range(
						new vscode.Position(0, 0),
						new vscode.Position(Number.MAX_VALUE, Number.MAX_VALUE)), toString(result)
					);
				} catch (e) {
					console.log("Error ", e);
				}
			});
		}
	}

	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.transpose', () => {
		doCommand(transpose);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.flipCharacters', () => {
		doCommand(flipCharacters);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.flipLines', () => {
		doCommand(flipLines);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate90', () => {
		doCommand(rotate90);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate180', () => {
		doCommand(rotate180);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate270', () => {
		doCommand(rotate270);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
