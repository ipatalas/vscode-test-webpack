import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vsc from 'vscode';
import { getCounter } from '../../completionProvider';
// import * as myExtension from '../../extension';

export function delay(timeout: number) {
	return new Promise<void>(resolve => {
		setTimeout(resolve, timeout)
	})
}

suite('Extension Test Suite', () => {
	vsc.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('test', done => {
		vsc.workspace.openTextDocument({ language: 'plaintext' }).then((doc) => {
			return selectAndAcceptSuggestion(doc).then(async () => {
				await vsc.commands.executeCommand('workbench.action.closeActiveEditor')
				done()
			}).catch(async (reason: any) => {
				await vsc.commands.executeCommand('workbench.action.closeActiveEditor')
				done(reason)
			})
		})
	})
});


async function selectAndAcceptSuggestion(doc: vsc.TextDocument) {
	const editor = await vsc.window.showTextDocument(doc, vsc.ViewColumn.One)

	if (await editor.edit(edit => edit.insert(new vsc.Position(0, 0), 'input.'))) {
		await vsc.commands.executeCommand('editor.action.triggerSuggest')
		await delay(500)
		await vsc.commands.executeCommand('selectNextSuggestion')
		await delay(500)
		await vsc.commands.executeCommand('selectNextSuggestion')

		console.log(`Counter from test: ${getCounter()}`)		

		return vsc.commands.executeCommand('acceptSelectedSuggestion')
	}
}