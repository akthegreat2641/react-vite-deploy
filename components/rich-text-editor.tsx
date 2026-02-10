"use client"

import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
  placeholder?: string
}

export function RichTextEditor({ value, onChange, height = 400, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <div className="rich-text-editor border rounded-md overflow-hidden">
      <Editor
        apiKey="1mog2g8hwwn35h86xkcc6bteu3jqnfzjf9u1t4ixv428rl14"
        onInit={(evt, editor) => {
          editorRef.current = editor
        }}
        value={value}
        onEditorChange={(content) => {
          onChange(content)
        }}
        init={{
          height,
          menubar: "file edit insert view format table tools",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "emoticons",
            "directionality",
            "pagebreak",
            "nonbreaking",
            // "template", // removed
            // "hr", // removed
            // "print", // removed to fix console error
            "save",
            "visualchars",
            // "noneditable", // removed
            "quickbars",
            "accordion",
            "checklist",
          ],
          toolbar:
            "undo redo | formatselect | fontsize | " +
            "bold italic underline strikethrough | forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | " +
            "removeformat | link image media | " +
            "code preview fullscreen | help",
          content_style: "body {font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; }",
          placeholder,
          branding: false,
          promotion: false,
          resize: true,
          elementpath: true,
          statusbar: true,
          paste_data_images: true,
          font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
          formats: {
            bold: { inline: "strong" },
            italic: { inline: "em" },
            underline: { inline: "u", exact: true },
            strikethrough: { inline: "del" },
          },
          block_formats: "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre",
          images_upload_handler: async (blobInfo) => {
            // You can implement image upload here
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.readAsDataURL(blobInfo.blob())
              reader.onload = () => {
                resolve(reader.result as string)
              }
            })
          },
          style_formats: [
            { title: 'Button', selector: 'a', classes: 'btn' }
          ],
          style_formats_merge: true,
        }}
      />
    </div>
  )
}

