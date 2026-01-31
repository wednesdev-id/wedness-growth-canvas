import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ServicePackage } from "@/types/database.types";
import { useCreateServicePackage, useUpdateServicePackage } from "@/hooks/useServicePackageMutations";
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
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

// Schema
const serviceSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    price_label: z.string().min(1, "Price is required"),
    target: z.string().optional(),
    features: z.string().min(1, "At least one feature is required"), // comma separated
    duration: z.string().min(1, "Duration is required"),
    optional_note: z.string().optional(),
    popular: z.boolean().default(false),
    sort_order: z.coerce.number().min(0),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServicePackageFormProps {
    initialData?: ServicePackage;
    onSuccess: () => void;
}

export function ServicePackageForm({ initialData, onSuccess }: ServicePackageFormProps) {
    const createService = useCreateServicePackage();
    const updateService = useUpdateServicePackage();

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
            price_label: "",
            target: "",
            features: "",
            duration: "",
            optional_note: "",
            popular: false,
            sort_order: 1,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                price_label: initialData.price_label,
                target: initialData.target || "",
                features: initialData.features?.join(", ") || "",
                duration: initialData.duration,
                optional_note: initialData.optional_note || "",
                popular: initialData.popular,
                sort_order: initialData.sort_order,
            });
        }
    }, [initialData, form]);

    const isSubmitting = createService.isPending || updateService.isPending;

    const onSubmit = async (data: ServiceFormValues) => {
        const featuresArray = data.features ? data.features.split(",").map((f) => f.trim()).filter(Boolean) : [];

        const payload = {
            ...data,
            features: featuresArray,
        };

        try {
            if (initialData) {
                await updateService.mutateAsync({ id: initialData.id, updates: payload });
            } else {
                await createService.mutateAsync(payload as any);
            }
            onSuccess();
        } catch (error) {
            console.error("Failed to submit service package", error);
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
                            <FormLabel>Package Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Starter" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="price_label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Label</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rp 500rb" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sort_order"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sort Order</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
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
                                    <Input placeholder="1 Month" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="target"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Audience</FormLabel>
                                <FormControl>
                                    <Input placeholder="For Individuals" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Features (comma separated)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Feature 1, Feature 2, Feature 3" className="h-24" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="optional_note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Optional Note</FormLabel>
                            <FormControl>
                                <Input placeholder="Includes basic support" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="popular"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Popular Package</FormLabel>
                                <FormDescription>
                                    Mark this package as most popular/recommended.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Package" : "Create Package"}
                </Button>
            </form>
        </Form>
    );
}
