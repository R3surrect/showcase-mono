import type { Editor } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";
import stylesObj from './EditorView.module.css'

const EditorView = ({ editor }: { editor: Editor }) => {
    return <EditorContent className={stylesObj.editorView} editor={editor} />
}

export default EditorView;