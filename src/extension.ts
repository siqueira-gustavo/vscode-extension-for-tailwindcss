import { format } from 'prettier'
import { Disposable, Range, commands, window } from 'vscode'

function activate(context: { subscriptions: Disposable[] }) {
  let disposable = commands.registerCommand('extension.formatTailwind', () => {
    const editor = window.activeTextEditor
    if (editor) {
      const document = editor.document
      const text = document.getText()
      const formattedText = text.replace(/className={`(.*?)`}/g, (match) => {
        return 'className={\n' + format(match, { parser: 'babel' }) + '\n}'
      })
      const range = new Range(
        document.positionAt(0),
        document.positionAt(text.length)
      )
      editor.edit((editBuilder) => {
        editBuilder.replace(range, formattedText)
      })
    }
  })

  context.subscriptions.push(disposable)
}
const _activate = activate
export { _activate as activate }

function deactivate() {}

export default {
  activate,
  deactivate,
}
