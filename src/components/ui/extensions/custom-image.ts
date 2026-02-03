import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'

export const CustomImage = Image.extend({
    renderHTML({ HTMLAttributes }) {
        const { alt } = HTMLAttributes

        // Default classes for the image
        const imageClasses = 'rounded-xl shadow-lg w-auto max-w-full max-h-[500px] object-contain'

        // Classes for the figure container
        const figureClasses = 'my-10 flex flex-col items-center'

        // Classes for the caption
        const captionClasses = 'text-center text-muted-foreground text-sm mt-3 italic max-w-2xl px-4 font-serif leading-relaxed'

        if (alt) {
            return [
                'figure',
                { class: figureClasses },
                ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: imageClasses })],
                ['figcaption', { class: captionClasses }, alt]
            ]
        }

        // If no alt text, just return the image with styling but wrapped in figure for consistent spacing
        return [
            'figure',
            { class: figureClasses },
            ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: imageClasses })]
        ]
    },
})
