"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface HtmlCleanerEditorProps {
  value: string
  onChange: (content: string) => void
  height?: number
  placeholder?: string
}

export function HtmlCleanerEditor({ value, onChange, height = 500, placeholder }: HtmlCleanerEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editorContent, setEditorContent] = useState(value)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setEditorContent(value)
  }, [value])

  const handleOpenEditor = () => {
    setIsOpen(true)
    // Pre-fill the editor with current content
    setEditorContent(value)
  }

  const handleCopyFromEditor = async () => {
    if (textareaRef.current) {
      const content = textareaRef.current.value
      onChange(content)
      setIsOpen(false)
      toast.success("Content updated successfully")
    }
  }

  const handleCopyToClipboard = async () => {
    if (textareaRef.current) {
      await navigator.clipboard.writeText(textareaRef.current.value)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="html-cleaner-editor space-y-2">
      {/* Textarea for editing HTML directly */}
      <textarea
        ref={textareaRef}
        value={editorContent}
        onChange={(e) => {
          setEditorContent(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={placeholder || "Enter HTML content here..."}
        className="w-full min-h-[400px] p-4 border rounded-md font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ height: `${height}px` }}
      />
      
      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleOpenEditor}
          className="flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open in HTML Cleaner
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <span className="text-xs text-gray-500 ml-auto">
          Edit HTML directly or use HTML Cleaner for advanced cleaning
        </span>
      </div>

      {/* Dialog with HTML Cleaner iframe */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>HTML Cleaner Editor</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://html-cleaner.com/html-editor/"
              width="100%"
              height="100%"
              style={{ border: "none", minHeight: "600px" }}
              title="HTML Cleaner Editor"
              allow="clipboard-read; clipboard-write"
            />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-500">
              After cleaning your HTML in the editor above, paste it into the textarea below:
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.readText().then((text) => {
                    setEditorContent(text)
                    onChange(text)
                    toast.success("Pasted from clipboard!")
                  })
                }}
              >
                Paste from Clipboard
              </Button>
              <Button type="button" onClick={handleCopyFromEditor}>
                Update Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
