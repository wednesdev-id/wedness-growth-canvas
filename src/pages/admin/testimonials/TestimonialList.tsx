import { useState } from "react";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Testimonial } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeleteTestimonial } from "@/hooks/useTestimonialMutations";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TestimonialForm } from "./TestimonialForm";

const TestimonialList = () => {
    const { data: testimonials, isLoading } = useTestimonials();
    const deleteTestimonialMutation = useDeleteTestimonial();
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editTestimonial, setEditTestimonial] = useState<Testimonial | undefined>(undefined);

    const handleCreate = () => {
        setEditTestimonial(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditTestimonial(testimonial);
        setIsFormOpen(true);
    };

    const handleDelete = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedTestimonial) {
            await deleteTestimonialMutation.mutateAsync(selectedTestimonial.id);
            setIsDeleteDialogOpen(false);
            setSelectedTestimonial(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditTestimonial(undefined);
    };

    if (isLoading) {
        return <div>Loading testimonials...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={testimonials || []}
                searchKey="name"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the testimonial
                            from "{selectedTestimonial?.name}" and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Add/Edit Testimonial Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                        <DialogDescription>
                            {editTestimonial ? "Make changes to the testimonial here." : "Fill in the details for the new testimonial."}
                        </DialogDescription>
                    </DialogHeader>
                    <TestimonialForm initialData={editTestimonial} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TestimonialList;
