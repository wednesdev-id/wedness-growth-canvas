import { useState } from "react";
import { useLearningResources } from "@/hooks/useLearningResources";
import { LearningResource } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeleteLearningResource } from "@/hooks/useLearningMutations";
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
import { LearningForm } from "./LearningForm";

const LearningList = () => {
    const { data: resources, isLoading } = useLearningResources();
    const deleteResourceMutation = useDeleteLearningResource();
    const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editResource, setEditResource] = useState<LearningResource | undefined>(undefined);

    const handleCreate = () => {
        setEditResource(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (resource: LearningResource) => {
        setEditResource(resource);
        setIsFormOpen(true);
    };

    const handleDelete = (resource: LearningResource) => {
        setSelectedResource(resource);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedResource) {
            await deleteResourceMutation.mutateAsync(selectedResource.id);
            setIsDeleteDialogOpen(false);
            setSelectedResource(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditResource(undefined);
    };

    if (isLoading) {
        return <div>Loading resources...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Learning Resources</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={resources || []}
                searchKey="title"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the resource
                            "{selectedResource?.title}" and remove it from our servers.
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

            {/* Add/Edit Learning Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
                        <DialogDescription>
                            {editResource ? "Make changes to the resource here." : "Fill in the details for the new resource."}
                        </DialogDescription>
                    </DialogHeader>
                    <LearningForm initialData={editResource} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LearningList;
