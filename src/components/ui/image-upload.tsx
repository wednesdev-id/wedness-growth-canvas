import { useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Link as LinkIcon } from "lucide-react";
import { StorageService } from "@/services/storage.service";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove?: () => void;
    disabled?: boolean;
    folder?: string;
    label?: string;
    className?: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    disabled = false,
    folder = "uploads",
    label = "Upload Image",
    className = "",
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const result = await StorageService.upload(file, folder);
            onChange(result.url);
        } catch (error) {
            console.error("Upload failed:", error);
            // You might want to add toast notification here
        } finally {
            setIsUploading(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange("");
        onRemove?.();
    };

    return (
        <div className={`space-y-4 w-full ${className}`}>
            <div className="flex flex-col gap-4">
                {/* Image Preview */}
                {value ? (
                    <div className="relative rounded-lg overflow-hidden border border-border aspect-video w-full max-w-sm bg-muted">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={handleRemove}
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center h-48 w-full max-w-sm bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer"
                        onClick={() => !disabled && inputRef.current?.click()}
                    >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">{label}</p>
                    </div>
                )}

                {/* Hidden Input & Button */}
                <div className="flex flex-col gap-3 w-full max-w-sm">
                    <input
                        type="file"
                        ref={inputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={disabled || isUploading}
                    />
                    {!value && (
                        <>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => inputRef.current?.click()}
                                disabled={disabled || isUploading}
                                className="w-full"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    "Choose File"
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or paste URL</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        onChange={(e) => onChange(e.target.value)}
                                        disabled={disabled || isUploading}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
