import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

export default function ArticleEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[320px]',
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/50 bg-white/40 px-4 py-3">
        <div className="mr-2 text-xs font-semibold uppercase tracking-[0.28em] text-teal">Editor</div>
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded px-2 py-1 text-sm font-bold ${editor.isActive('bold') ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded px-2 py-1 text-sm italic ${editor.isActive('italic') ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`rounded px-2 py-1 text-sm font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`rounded px-2 py-1 text-sm font-semibold ${editor.isActive('heading', { level: 3 }) ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded px-2 py-1 text-sm ${editor.isActive('bulletList') ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded px-2 py-1 text-sm ${editor.isActive('blockquote') ? 'bg-ink text-white' : 'hover:bg-white/60'}`}
          >
            " Quote
          </button>
        </div>
      </div>
      <div className="p-4 bg-white/20">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

