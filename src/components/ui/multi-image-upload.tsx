import { useRef, useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X, Link as LinkIcon, Plus } from "lucide-react";
import { StorageService } from "@/services/storage.service";
import { Badge } from "@/components/ui/badge";

interface MultiImageUploadProps {
    value?: string[];
    onChange: (urls: string[]) => void;
    onRemove?: (url: string) => void;
    disabled?: boolean;
    folder?: string;
    label?: string;
    className?: string;
    maxFiles?: number;
}

export function MultiImageUpload({
    value = [],
    onChange,
    onRemove,
    disabled = false,
    folder = "uploads",
    label = "Upload Images",
    className = "",
    maxFiles = 5,
}: MultiImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Check file limit
        if (value.length + files.length > maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} images.`);
            return;
        }

        try {
            setIsUploading(true);
            const newUrls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const result = await StorageService.upload(files[i], folder);
                newUrls.push(result.url);
            }

            onChange([...value, ...newUrls]);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    };

    const handleUrlAdd = () => {
        if (!urlInput) return;

        // Simple URL validation
        try {
            new URL(urlInput);
        } catch (_) {
            return;
        }

        if (value.length >= maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} images.`);
            return;
        }

        onChange([...value, urlInput]);
        setUrlInput("");
    };

    const handleRemove = (urlToRemove: string) => {
        const newValue = value.filter(url => url !== urlToRemove);
        onChange(newValue);
        onRemove?.(urlToRemove);
    };

    return (
        <div className={`space-y-4 w-full ${className}`}>
            <div className="flex flex-col gap-4">
                {/* Image Grid */}
                {value.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {value.map((url, index) => (
                            <div key={index} className="relative rounded-lg overflow-hidden border border-border aspect-video bg-muted group">
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => handleRemove(url)}
                                        disabled={disabled}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="absolute top-2 left-2">
                                    <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs h-5 px-1.5">{index + 1}</Badge>
                                </div>
                            </div>
                        ))}

                        {/* Add More Button (if limit not reached) */}
                        {value.length < maxFiles && (
                            <div
                                className="border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center aspect-video bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer"
                                onClick={() => !disabled && inputRef.current?.click()}
                            >
                                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-xs text-muted-foreground">Add More</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Initial Upload Area (only if empty) */}
                {value.length === 0 && (
                    <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center h-48 w-full bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer"
                        onClick={() => !disabled && inputRef.current?.click()}
                    >
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-1">Max {maxFiles} images</p>
                    </div>
                )}

                {/* Hidden Input & URL Actions */}
                <div className="flex flex-col gap-3 w-full">
                    <input
                        type="file"
                        ref={inputRef}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        disabled={disabled || isUploading}
                    />

                    {value.length < maxFiles && (
                        <div className="flex gap-2">
                            {value.length > 0 && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => inputRef.current?.click()}
                                    disabled={disabled || isUploading}
                                    className="flex-shrink-0"
                                >
                                    {isUploading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="mr-2 h-4 w-4" />
                                    )}
                                    Upload Files
                                </Button>
                            )}

                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="url"
                                    placeholder="Add image via URL"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleUrlAdd();
                                        }
                                    }}
                                    disabled={disabled || isUploading || value.length >= maxFiles}
                                />
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1 h-8 w-8 p-0"
                                    onClick={handleUrlAdd}
                                    disabled={!urlInput}
                                    type="button"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
