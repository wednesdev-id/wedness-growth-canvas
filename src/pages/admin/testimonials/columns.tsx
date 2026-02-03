import { ColumnDef } from "@tanstack/react-table";
import { Testimonial } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TestimonialColumnActions = {
    onEdit: (testimonial: Testimonial) => void;
    onDelete: (testimonial: Testimonial) => void;
};

export const columns = ({ onEdit, onDelete }: TestimonialColumnActions): ColumnDef<Testimonial>[] => [
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            const avatar = row.getValue("avatar") as string;
            return (
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt={name} className="object-cover" />
                    <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("rating")}/5</Badge>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const testimonial = row.original;

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
                        <DropdownMenuItem onClick={() => onEdit(testimonial)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(testimonial)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
