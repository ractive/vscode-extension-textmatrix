import * as vscode from 'vscode';

type Elements = string[][];

export function activate(context: vscode.ExtensionContext) {
	function transpose(elements: Elements): Elements {
		let result: Elements = [];
		for (let c = 0; c < elements[0].length; c++) {
			const line: string[] = [];
			for (let i = 0; i < elements.length; i++) {
				line.push(elements[i][c]);
			}
			result.push(line);
		}
		return result;
	}

	function flipCharacters(elements: Elements): Elements {
		let result: Elements = [];
		for (let r = 0; r < elements.length; r++) {
			result.push(elements[r].reverse());
		}
		return result;
	}

	function flipLines(elements: Elements): Elements {
		let result: Elements = Array.from(elements);
		for (let r = 0; r < result.length / 2; r++) {
			const temp = result[r];
			result[r] = result[result.length - r - 1];
			result[result.length - r - 1] = temp;
		}
		return result;
	}

	function rotate(elements: Elements, degree: number): Elements {
		switch(degree) {
			case 90:
			case -270:
				return flipCharacters(transpose(elements));
			case 180:
			case -180:
				return flipLines(flipCharacters(elements));
			case -90:
			case 270:
				return flipLines(transpose(elements));
			default:
				throw new Error("Only 90 degree values supported");
		}
	}

	function toString(elements: Elements): string {
		let result: string = "";
		for (let r = 0; r < elements.length; r++) {
			for (let c = 0; c < elements[r].length; c++) {
				result += elements[r][c];
				if (c < elements[r].length - 1) {
					result += " ";
				}
			}
			result += "\n";
		}
		return result;
	}

	function elementsFromDocument(document: vscode.TextDocument): Elements {
		const elements: Elements = [];
		let columns = 0;
		for(let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i);
			if (!line.isEmptyOrWhitespace) {
				const tokens: string[] = line.text.substr(line.firstNonWhitespaceCharacterIndex).split(/\s+/);
				if (columns === 0) {
					columns = tokens.length;
				} else if (columns !== tokens.length) {
					vscode.window.showErrorMessage(`Text not in rectangular form: Line ${i + 1} has ${tokens.length} elements, while lines before had ${columns} elements.`);
					throw new Error("Text not in rectangular form");
				}
				elements.push(tokens);
			}
		}
		return elements;
	}

	function doCommand(command: (elements: Elements) => Elements) {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				try {
					const elements: Elements = elementsFromDocument(editor.document);
					let result = command(elements);
					
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
		doCommand(elements => transpose(elements));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.flipCharacters', () => {
		doCommand(elements => flipCharacters(elements));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.flipLines', () => {
		doCommand(elements => flipLines(elements));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate90', () => {
		doCommand(elements => rotate(elements, 90));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate180', () => {
		doCommand(elements => rotate(elements, 180));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('textmatrix.rotate270', () => {
		doCommand(elements => rotate(elements, 270));
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
