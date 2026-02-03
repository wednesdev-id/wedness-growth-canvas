import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Testimonial } from "@/types/database.types";
import { useCreateTestimonial, useUpdateTestimonial } from "@/hooks/useTestimonialMutations";
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

// Schema
const testimonialSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    avatar: z.string().url("Must be a valid URL").or(z.literal("")),
    rating: z.coerce.number().min(0).max(5),
    testimonial: z.string().min(10, "Testimonial must be at least 10 characters"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
    initialData?: Testimonial;
    onSuccess: () => void;
}

export function TestimonialForm({ initialData, onSuccess }: TestimonialFormProps) {
    const createTestimonial = useCreateTestimonial();
    const updateTestimonial = useUpdateTestimonial();

    const form = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            name: "",
            role: "",
            company: "",
            avatar: "",
            rating: 5,
            testimonial: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                role: initialData.role,
                company: initialData.company,
                avatar: initialData.avatar,
                rating: initialData.rating,
                testimonial: initialData.testimonial,
            });
        }
    }, [initialData, form]);

    const isSubmitting = createTestimonial.isPending || updateTestimonial.isPending;

    const onSubmit = async (data: TestimonialFormValues) => {
        try {
            if (initialData) {
                await updateTestimonial.mutateAsync({ id: initialData.id, updates: data });
            } else {
                await createTestimonial.mutateAsync(data);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit testimonial", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="CEO" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Corp" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    folder="testimonials"
                                    label="Upload Avatar"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="testimonial"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Testimonial Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Great service..." className="h-24" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Testimonial" : "Create Testimonial"}
                </Button>
            </form>
        </Form>
    );
}
