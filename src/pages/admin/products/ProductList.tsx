import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/database.types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDeleteProduct } from "@/hooks/useProductMutations";
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
import { ProductForm } from "./ProductForm";

const ProductList = () => {
    const { data: products, isLoading } = useProducts();
    const deleteProductMutation = useDeleteProduct();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | undefined>(undefined);

    const handleCreate = () => {
        setEditProduct(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (product: Product) => {
        console.log("Edit product", product);
        setEditProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedProduct) {
            await deleteProductMutation.mutateAsync(selectedProduct.id);
            setIsDeleteDialogOpen(false);
            setSelectedProduct(null);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        setEditProduct(undefined);
    };

    if (isLoading) {
        return <div>Loading products...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <DataTable
                columns={columns({ onEdit: handleEdit, onDelete: handleDelete })}
                data={products || []}
                searchKey="name"
            />

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product
                            "{selectedProduct?.name}" and remove it from our servers.
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

            {/* Add/Edit Product Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-lg overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{editProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                        <DialogDescription>
                            {editProduct ? "Make changes to the product here." : "Fill in the details for the new product."}
                        </DialogDescription>
                    </DialogHeader>
                    <ProductForm initialData={editProduct} onSuccess={handleFormSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductList;
