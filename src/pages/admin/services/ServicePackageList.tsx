import { useState } from "react";
import { useServicePackages } from "@/hooks/useServicePackages";
import { ServicePackage } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeleteServicePackage } from "@/hooks/useServicePackageMutations";
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
import { ServicePackageForm } from "./ServicePackageForm";

const ServicePackageList = () => {
    const { data: packages, isLoading } = useServicePackages();
    const deletePackageMutation = useDeleteServicePackage();
    const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editPackage, setEditPackage] = useState<ServicePackage | undefined>(undefined);

    const handleCreate = () => {
        setEditPackage(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (pkg: ServicePackage) => {
        setEditPackage(pkg);
        setIsFormOpen(true);
    };

    const handleDelete = (pkg: ServicePackage) => {
        setSelectedPackage(pkg);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedPackage) {
            await deletePackageMutation.mutateAsync(selectedPackage.id);
            setIsDeleteDialogOpen(false);
            setSelectedPackage(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditPackage(undefined);
    };

    if (isLoading) {
        return <div>Loading packages...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Service Packages</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={packages || []}
                searchKey="name"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the package
                            "{selectedPackage?.name}" and remove it from our servers.
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

            {/* Add/Edit Service Package Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
                        <DialogDescription>
                            {editPackage ? "Make changes to the package here." : "Fill in the details for the new package."}
                        </DialogDescription>
                    </DialogHeader>
                    <ServicePackageForm initialData={editPackage} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ServicePackageList;
