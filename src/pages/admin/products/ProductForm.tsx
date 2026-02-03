import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product } from "@/types/database.types";
import { useCreateProduct, useUpdateProduct } from "@/hooks/useProductMutations";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import { ImageUpload } from "@/components/ui/image-upload";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";

// Schema
const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    // price removed from form
    // price: z.string().min(1, "Price is required"),
    image_url: z.string().url("Must be a valid URL").or(z.literal("")),
    gallery: z.array(z.string()).optional(), // Gallery images
    product_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    status: z.enum(["available", "coming_soon"]),
    features: z.string().optional(), // We'll handle comma-separated string for simplicity
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: Product;
    onSuccess: () => void;
}

export function ProductForm({ initialData, onSuccess }: ProductFormProps) {
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            // price: "",
            // price: "",
            image_url: "",
            gallery: [],
            product_url: "",
            status: "available",
            features: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description || "",
                category: initialData.category || "",
                // price: initialData.price || "",
                // price: initialData.price || "",
                image_url: initialData.image_url || "",
                gallery: initialData.gallery || [],
                product_url: initialData.product_url || "",
                status: initialData.status as "available" | "coming_soon",
                features: initialData.features?.join(", ") || "",
            });
        }
    }, [initialData, form]);

    const isSubmitting = createProduct.isPending || updateProduct.isPending;

    const onSubmit = async (data: ProductFormValues) => {
        const featuresArray = data.features ? data.features.split(",").map((f) => f.trim()).filter(Boolean) : [];

        const payload = {
            ...data,
            features: featuresArray,
        };

        try {
            if (initialData) {
                await updateProduct.mutateAsync({ id: initialData.id, updates: payload });
            } else {
                await createProduct.mutateAsync(payload as any);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit product", error);
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="SaaS, Enterprise..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="coming_soon">Coming Soon</SelectItem>
                                </SelectContent>
                            </Select>
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
                                    folder="products"
                                    label="Upload Main Image"
                                />
                            </FormControl>
                            <FormDescription>Upload a main image for the product.</FormDescription>
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
                                    folder="products/gallery"
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
                    name="product_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormDescription>Direct link to the product (not demo)</FormDescription>
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
                                <Textarea placeholder="Product description..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Features (comma separated)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Feature 1, Feature 2, Feature 3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Product" : "Create Product"}
                </Button>
            </form>
        </Form>
    );
}
