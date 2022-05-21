import * as vsc from 'vscode'

let counter = 0;

export class CompletionProvider implements vsc.CompletionItemProvider {
    provideCompletionItems(document: vsc.TextDocument, position: vsc.Position, token: vsc.CancellationToken, context: vsc.CompletionContext): vsc.ProviderResult<vsc.CompletionItem[] | vsc.CompletionList<vsc.CompletionItem>> {
        return [
            new vsc.CompletionItem('test1'),
            new vsc.CompletionItem('test2'),
            new vsc.CompletionItem('test3'),
        ]
    }

    resolveCompletionItem(item: vsc.CompletionItem, _token: vsc.CancellationToken): vsc.ProviderResult<vsc.CompletionItem> {
        counter++
        console.log(`Current counter: ${counter}`);
        return item
    }
}

export const getCounter = () => counter
