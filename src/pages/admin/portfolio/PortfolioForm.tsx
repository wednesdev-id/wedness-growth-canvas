import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PortfolioProject } from "@/types/database.types";
import { useCreatePortfolioProject, useUpdatePortfolioProject } from "@/hooks/usePortfolioMutations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

import { MultiImageUpload } from "@/components/ui/multi-image-upload";

// Schema
const portfolioSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    image_url: z.string().url("Must be a valid URL").or(z.literal("")),
    gallery: z.array(z.string()).optional(), // Gallery images
    results: z.string().optional(), // CRLF or comma separated
    tech: z.string().optional(), // Comma separated
    // rating removed from form, will default to 5 in submit logic
    publish_date: z.string().min(1, "Date is required"),
    link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    review: z.string().optional(),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
    initialData?: PortfolioProject;
    onSuccess: () => void;
}

export function PortfolioForm({ initialData, onSuccess }: PortfolioFormProps) {
    const createProject = useCreatePortfolioProject();
    const updateProject = useUpdatePortfolioProject();

    const form = useForm<PortfolioFormValues>({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            image_url: "",
            gallery: [],
            results: "",
            tech: "",
            // rating: 5, // handled in submit
            publish_date: new Date().toISOString().split('T')[0],
            link: "",
            review: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description || "",
                category: initialData.category || "",
                image_url: initialData.image_url || "",
                gallery: initialData.gallery || [],
                results: initialData.results?.join("\n") || "",
                tech: initialData.tech?.join(", ") || "",
                // rating: initialData.rating || 5,
                publish_date: initialData.publish_date,
                link: initialData.link || "",
                review: initialData.review || "",
            });
        }
    }, [initialData, form]);

    const isSubmitting = createProject.isPending || updateProject.isPending;

    const onSubmit = async (data: PortfolioFormValues) => {
        const techArray = data.tech ? data.tech.split(",").map((t) => t.trim()).filter(Boolean) : [];
        const resultsArray = data.results ? data.results.split("\n").map((r) => r.trim()).filter(Boolean) : [];

        const payload = {
            ...data,
            tech: techArray,
            results: resultsArray,
            rating: 5, // Default rating since field is removed
        };

        try {
            if (initialData) {
                await updateProject.mutateAsync({ id: initialData.id, updates: payload });
            } else {
                await createProject.mutateAsync(payload as any);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit portfolio project", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="Web App, Mobile App" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="publish_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Publish Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="YYYY-MM-DD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Link</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Main Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    folder="portfolio"
                                    label="Upload Main Image"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gallery"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gallery Images</FormLabel>
                            <FormControl>
                                <MultiImageUpload
                                    value={field.value || []}
                                    onChange={field.onChange}
                                    folder="portfolio/gallery"
                                    label="Upload Gallery Images"
                                    maxFiles={8}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tech"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Technologies (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="React, Node.js, Postgres" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="results"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Results (one per line)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Increased conversions by 20%&#10;Reduced load time by 50%" className="h-24" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Project description..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Review (Optional)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Client testimonial..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Project" : "Create Project"}
                </Button>
            </form>
        </Form>
    );
}
