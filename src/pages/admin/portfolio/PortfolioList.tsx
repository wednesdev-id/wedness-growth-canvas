import { useState } from "react";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";
import { PortfolioProject } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeletePortfolioProject } from "@/hooks/usePortfolioMutations";
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
import { PortfolioForm } from "./PortfolioForm";

const PortfolioList = () => {
    const { data: projects, isLoading } = usePortfolioProjects();
    const deleteProjectMutation = useDeletePortfolioProject();
    const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editProject, setEditProject] = useState<PortfolioProject | undefined>(undefined);

    const handleCreate = () => {
        setEditProject(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (project: PortfolioProject) => {
        setEditProject(project);
        setIsFormOpen(true);
    };

    const handleDelete = (project: PortfolioProject) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedProject) {
            await deleteProjectMutation.mutateAsync(selectedProject.id);
            setIsDeleteDialogOpen(false);
            setSelectedProject(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditProject(undefined);
    };

    if (isLoading) {
        return <div>Loading portfolio...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={projects || []}
                searchKey="title"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project
                            "{selectedProject?.title}" and remove it from our servers.
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

            {/* Add/Edit Portfolio Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                        <DialogDescription>
                            {editProject ? "Make changes to the project here." : "Fill in the details for the new project."}
                        </DialogDescription>
                    </DialogHeader>
                    <PortfolioForm initialData={editProject} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PortfolioList;
