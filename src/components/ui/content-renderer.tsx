"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { CustomImage } from "./extensions/custom-image";
import { useMemo } from "react";

export interface ContentRendererProps {
    content: string;
    className?: string;
    /** If provided, the first image matching this URL will be hidden from content */
    coverImageUrl?: string;
}

// Medium/Substack-style typography classes - optimized for readability
const mediumProseClasses = [
    // Base prose - larger for reading comfort
    "prose",
    "prose-lg",
    "lg:prose-xl",
    "dark:prose-invert",
    "max-w-none",

    // Headings - Clean, bold, proper spacing
    "prose-headings:font-bold",
    "prose-headings:tracking-tight",
    "prose-headings:text-foreground",
    "prose-h1:text-4xl",
    "lg:prose-h1:text-5xl",
    "prose-h1:mt-14",
    "prose-h1:mb-8",
    "prose-h2:text-3xl",
    "lg:prose-h2:text-4xl",
    "prose-h2:mt-12",
    "prose-h2:mb-6",
    "prose-h3:text-2xl",
    "lg:prose-h3:text-3xl",
    "prose-h3:mt-10",
    "prose-h3:mb-4",

    // Paragraphs - Extra large, comfortable reading (24px)
    "prose-p:text-foreground/90",
    "prose-p:text-2xl",
    "prose-p:leading-[1.75]",
    "prose-p:mb-8",
    "prose-p:tracking-[0.01em]",

    // Links - Subtle underline, primary color
    "prose-a:text-primary",
    "prose-a:font-medium",
    "prose-a:underline",
    "prose-a:underline-offset-2",
    "hover:prose-a:text-primary/80",

    // Lists - Clean spacing, larger text
    "prose-li:text-foreground/90",
    "prose-li:text-2xl",
    "prose-li:leading-[1.75]",
    "prose-li:mb-3",
    "prose-ul:my-8",
    "prose-ol:my-8",

    // Blockquotes - Medium/Substack style (left border, italic, larger)
    "prose-blockquote:border-l-4",
    "prose-blockquote:border-primary/40",
    "prose-blockquote:pl-8",
    "prose-blockquote:italic",
    "prose-blockquote:text-foreground/70",
    "prose-blockquote:text-2xl",
    "prose-blockquote:leading-relaxed",
    "prose-blockquote:my-10",
    "prose-blockquote:font-serif",

    // Images - Rounded, full width, good margins
    "prose-img:rounded-xl",
    "prose-img:shadow-lg",
    "prose-img:my-10",

    // Code blocks - Clean, readable
    "prose-code:bg-muted",
    "prose-code:px-2",
    "prose-code:py-1",
    "prose-code:rounded-md",
    "prose-code:text-base",
    "prose-code:font-mono",
    "prose-code:before:content-none",
    "prose-code:after:content-none",

    // Strong/Bold
    "prose-strong:font-bold",
    "prose-strong:text-foreground",
].join(" ");

/**
 * Remove the first image from HTML content if it matches the cover image URL.
 */
function removeFirstImageIfMatchesCover(html: string, coverUrl: string): string {
    if (!coverUrl || !html) return html;

    // Match the first img tag
    const firstImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
    const match = html.match(firstImgRegex);

    if (match && match[1]) {
        // Check if the first image URL matches the cover URL
        const imgSrc = match[1];
        if (imgSrc === coverUrl) {
            // Remove the first img tag (and its wrapper p tag if exists)
            return html.replace(/<p>\s*<img[^>]+src=["']([^"']+)["'][^>]*>\s*<\/p>/i, '')
                .replace(firstImgRegex, '');
        }
    }

    return html;
}

/**
 * Read-only content renderer using Tiptap.
 * Uses Medium-style typography for clean, readable blog posts.
 */
export function ContentRenderer({ content, className, coverImageUrl }: ContentRendererProps) {
    // Remove cover image from content to avoid duplication
    const processedContent = useMemo(() => {
        if (coverImageUrl) {
            return removeFirstImageIfMatchesCover(content, coverImageUrl);
        }
        return content;
    }, [content, coverImageUrl]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: true,
            }),
            CustomImage,
        ],
        content: processedContent || "",
        editable: false,
        editorProps: {
            attributes: {
                class: className || mediumProseClasses,
            },
        },
    });

    if (!editor) {
        return null;
    }

    return <EditorContent editor={editor} />;
}
