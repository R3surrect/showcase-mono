import Button from "@/components/entities/Button/Button";
import Stack from "@/components/entities/Stack/Stack";
import { Editor, useEditorState } from "@tiptap/react";
import { Bold, Code, Italic, List, ListOrdered, Quote, Redo, Strikethrough, Underline, Undo } from "lucide-react";

const EditorToolbar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor,
        selector: () => ({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            isStrike: editor.isActive('strike'),
            isUnderline: editor.isActive('underline'),
            isCode: editor.isActive('code'),
            isBulletList: editor.isActive('bulletList'),
            isOrderedList: editor.isActive('orderedList'),
            isBlockquote: editor.isActive('blockquote'),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
        }),
    });

    return <Stack direction='row' gap='sm' justify='start'>
        <Button
            type="button"
            size='sm'
            variant={editorState.isBold ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleBold().run()}
        >
            <Bold size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isItalic ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
        >
            <Italic size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isStrike ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
        >
            <Strikethrough size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isUnderline ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
            <Underline size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isCode ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleCode().run()}
        >
            <Code size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isBulletList ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
            <List size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isOrderedList ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
            <ListOrdered size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant={editorState.isBlockquote ? 'accent' : 'outline'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
            <Quote size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant="outline"
            disabled={!editorState.canUndo}
            onClick={() => editor.chain().focus().undo().run()}
        >
            <Undo size="14" />
        </Button>
        <Button
            type="button"
            size='sm'
            variant="outline"
            disabled={!editorState.canRedo}
            onClick={() => editor.chain().focus().redo().run()}
        >
            <Redo size="14" />
        </Button>
    </Stack>

}

export default EditorToolbar;