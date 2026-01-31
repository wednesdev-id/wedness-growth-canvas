import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeleteBlogPost } from "@/hooks/useBlogMutations";
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
import { BlogForm } from "./BlogForm";

const BlogList = () => {
    const navigate = useNavigate();
    const { data: posts, isLoading } = useBlogPosts();
    const deletePostMutation = useDeleteBlogPost();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editPost, setEditPost] = useState<BlogPost | undefined>(undefined);

    const handleCreate = () => {
        setEditPost(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditPost(post);
        setIsFormOpen(true);
    };

    const handleDelete = (post: BlogPost) => {
        setSelectedPost(post);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedPost) {
            await deletePostMutation.mutateAsync(selectedPost.id);
            setIsDeleteDialogOpen(false);
            setSelectedPost(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditPost(undefined);
    };

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/dashboard/blog/review')}>
                        Review Queue
                    </Button>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={posts || []}
                searchKey="title"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the post
                            "{selectedPost?.title}" and remove it from our servers.
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

            {/* Add/Edit Blog Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                        <DialogDescription>
                            {editPost ? "Make changes to the post here." : "Fill in the details for the new post."}
                        </DialogDescription>
                    </DialogHeader>
                    <BlogForm initialData={editPost} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BlogList;
