import { ColumnDef } from "@tanstack/react-table";
import { BlogPost } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type BlogColumnActions = {
    onEdit: (post: BlogPost) => void;
    onDelete: (post: BlogPost) => void;
};

export const columns = ({ onEdit, onDelete }: BlogColumnActions): ColumnDef<BlogPost>[] => [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const colors: Record<string, string> = {
                published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                pending_review: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            };
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100'}`}>
                    {status?.replace('_', ' ').toUpperCase()}
                </span>
            );
        },
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string[] | null;
            return (
                <div className="flex flex-wrap gap-1">
                    {tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] border border-blue-100">
                            {tag}
                        </span>
                    ))}
                    {tags && tags.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{tags.length - 3}</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const post = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEdit(post)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(post)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
