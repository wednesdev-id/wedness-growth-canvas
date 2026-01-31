"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useEffect, useCallback, useRef, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    ImageIcon,
    Undo,
    Redo,
} from "lucide-react";

export interface MarkdownEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    onImageUpload?: (file: File) => Promise<string>;
}

const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
    ({ value, onChange, placeholder, onImageUpload }, ref) => {
        const fileInputRef = useRef<HTMLInputElement>(null);
        const [isUploading, setIsUploading] = useState(false);

        const editor = useEditor({
            extensions: [
                StarterKit.configure({
                    // Disable built-in link to avoid duplicate
                }),
                Link.configure({
                    openOnClick: false,
                    autolink: true,
                }),
                Image,
                Placeholder.configure({
                    placeholder: placeholder || "Write your content...",
                }),
            ],
            content: value || "",
            onUpdate: ({ editor }) => {
                onChange?.(editor.getHTML());
            },
            editorProps: {
                attributes: {
                    class: "focus:outline-none min-h-[150px] p-3",
                },
            },
        });

        useEffect(() => {
            if (editor && value !== undefined && editor.getHTML() !== value) {
                // simple check to avoid cursor jumping, though perfect sync needs more complex logic
                // for this use case, if content significantly changes or is empty
                if (editor.getText() === "" && value === "") return;
                // Only update if content is actually different to prevent loop
                if (editor.getHTML() !== value) {
                    editor.commands.setContent(value);
                }
            }
        }, [value, editor]);

        const addImage = useCallback(() => {
            if (onImageUpload) {
                fileInputRef.current?.click();
            } else {
                const url = window.prompt("Enter image URL:");
                if (url && editor) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            }
        }, [editor, onImageUpload]);

        const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file || !editor || !onImageUpload) return;

            try {
                setIsUploading(true);
                const url = await onImageUpload(file);
                if (url) {
                    editor.chain().focus().setImage({ src: url }).run();
                }
            } catch (error) {
                console.error("Image upload failed:", error);
                // Optional: Notify parent or show toast
            } finally {
                setIsUploading(false);
                // Reset input
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        };

        const addLink = useCallback(() => {
            const url = window.prompt("Enter URL:");
            if (url && editor) {
                editor.chain().focus().setLink({ href: url }).run();
            }
        }, [editor]);

        if (!editor) {
            return null;
        }

        return (
            <div ref={ref} className="border border-input rounded-md overflow-hidden bg-background">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-1 p-2 border-b border-input bg-muted/50">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? "bg-accent" : ""}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive("italic") ? "bg-accent" : ""}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive("bulletList") ? "bg-accent" : ""}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive("orderedList") ? "bg-accent" : ""}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive("blockquote") ? "bg-accent" : ""}
                    >
                        <Quote className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={addLink}>
                        <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addImage}
                        disabled={isUploading}
                    >
                        <ImageIcon className={`h-4 w-4 ${isUploading ? 'animate-pulse text-primary' : ''}`} />
                    </Button>
                    <div className="flex-1" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {/* Editor Content */}
                <EditorContent editor={editor} />
            </div>
        );
    }
);

MarkdownEditor.displayName = "MarkdownEditor";

export { MarkdownEditor };
