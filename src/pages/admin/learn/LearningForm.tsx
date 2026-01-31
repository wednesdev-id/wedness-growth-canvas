import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LearningResource } from "@/types/database.types";
import { useCreateLearningResource, useUpdateLearningResource } from "@/hooks/useLearningMutations";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

// Schema
const learningSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional(),
    type: z.string().min(1, "Type is required"), // Video, Article, etc.
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    duration: z.string().min(1, "Duration is required"),
    instructor: z.string().optional(),
    image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    link_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    tags: z.string().optional(), // Comma separated string
});

type LearningFormValues = z.infer<typeof learningSchema>;

interface LearningFormProps {
    initialData?: LearningResource;
    onSuccess: () => void;
}

export function LearningForm({ initialData, onSuccess }: LearningFormProps) {
    const createResource = useCreateLearningResource();
    const updateResource = useUpdateLearningResource();

    const form = useForm<LearningFormValues>({
        resolver: zodResolver(learningSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "Video",
            level: "Beginner",
            duration: "",
            instructor: "",
            image_url: "",
            link_url: "",
            tags: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description || "",
                type: initialData.type || "Video",
                level: initialData.level,
                duration: initialData.duration || "",
                instructor: initialData.instructor || "",
                image_url: initialData.image_url || "",
                link_url: initialData.link_url || "",
                tags: initialData.tags?.join(", ") || "",
            });
        }
    }, [initialData, form]);

    const isSubmitting = createResource.isPending || updateResource.isPending;

    const onSubmit = async (data: LearningFormValues) => {
        const tagsArray = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

        const payload = {
            ...data,
            tags: tagsArray,
        };

        try {
            if (initialData) {
                await updateResource.mutateAsync({ id: initialData.id, updates: payload });
            } else {
                await createResource.mutateAsync(payload as any);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit learning resource", error);
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
                                <Input placeholder="Resource Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Video, Article, Course" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                    <Input placeholder="2 Hours, 15 Mins" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="instructor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instructor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Instructor Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="link_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Link URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="React, Frontend, Web" {...field} />
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
                                <Textarea placeholder="Description..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Resource" : "Create Resource"}
                </Button>
            </form>
        </Form>
    );
}
