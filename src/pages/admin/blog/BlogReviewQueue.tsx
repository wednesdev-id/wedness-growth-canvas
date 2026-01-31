import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogService } from "@/services/blog.service";
import { BlogPost } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, FileEdit, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function BlogReviewQueue() {
    const queryClient = useQueryClient();
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_changes' | null>(null);

    // Fetch posts pending review
    const { data: posts, isLoading } = useQuery({
        queryKey: ['blog_posts', 'pending_review'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('status', 'pending_review')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data as BlogPost[];
        }
    });

    // Update Post Status Mutation
    const updateStatus = useMutation({
        mutationFn: async ({ id, status, reason }: { id: number, status: string, reason?: string }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const updates: any = {
                status,
                reviewed_by: user.id,
                reviewed_at: new Date().toISOString(),
            };

            if (status === 'published') {
                updates.published_at = new Date().toISOString();
            }
            if (status === 'rejected' && reason) {
                updates.rejection_reason = reason;
            }

            const { error } = await supabase
                .from('blog_posts')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            setSelectedPost(null);
            setActionType(null);
            setRejectReason("");
            toast.success("Post status updated successfully");
        },
        onError: (error) => {
            toast.error(`Failed to update post: ${error.message}`);
        }
    });

    const handleAction = async () => {
        if (!selectedPost || !actionType) return;

        if (actionType === 'reject' && !rejectReason.trim()) {
            toast.error("Please provide a reason for rejection");
            return;
        }

        let status = 'draft'; // default fallback
        if (actionType === 'approve') status = 'published';
        if (actionType === 'reject') status = 'rejected';
        if (actionType === 'request_changes') status = 'draft';

        await updateStatus.mutateAsync({
            id: selectedPost.id,
            status,
            reason: rejectReason
        });
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Review Queue</h2>
            <p className="text-muted-foreground">Manage posts waiting for approval.</p>

            {posts?.length === 0 ? (
                <div className="text-center p-12 border rounded-lg bg-muted/10">
                    <p className="text-muted-foreground">No posts pending review.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {posts?.map(post => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            By {post.author} • Submitted on {new Date(post.created_at).toLocaleDateString()}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                        Pending Review
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                                    {post.excerpt || "No excerpt provided."}
                                </p>
                                <div className="flex gap-2 mt-3">
                                    {post.tags?.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    setSelectedPost(post);
                                    setActionType(null); // Just viewing
                                }}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                        setSelectedPost(post);
                                        setActionType('approve');
                                    }}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                        setSelectedPost(post);
                                        setActionType('reject');
                                    }}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {/* Action Dialog */}
            <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedPost?.title}</DialogTitle>
                        <DialogDescription>
                            Author: {selectedPost?.author} • {selectedPost?.read_time}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="my-4 space-y-4">
                        {/* Content Preview */}
                        <div className="prose dark:prose-invert max-w-none border p-4 rounded-md bg-muted/30">
                            <div dangerouslySetInnerHTML={{ __html: selectedPost?.content || '' }} />
                        </div>

                        {/* Action Context */}
                        {actionType === 'approve' && (
                            <div className="bg-green-50 text-green-700 p-3 rounded border border-green-200">
                                <p className="font-medium">Approve this post?</p>
                                <p className="text-sm">It will be published immediately to the live site.</p>
                            </div>
                        )}

                        {(actionType === 'reject' || actionType === 'request_changes') && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Reason for {actionType === 'reject' ? 'Rejection' : 'Changes'}
                                </label>
                                <Textarea
                                    placeholder="Explain why this post is being returned..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setSelectedPost(null)}>
                            Cancel
                        </Button>

                        {actionType ? (
                            <Button
                                onClick={handleAction}
                                disabled={updateStatus.isPending}
                                variant={actionType === 'reject' ? 'destructive' : 'default'}
                                className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                                {updateStatus.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {actionType === 'approve' && "Confirm Approval"}
                                {actionType === 'reject' && "Confirm Rejection"}
                                {actionType === 'request_changes' && "Request Changes"}
                            </Button>
                        ) : (
                            // View Mode Actions
                            <>
                                <Button variant="secondary" onClick={() => setActionType('request_changes')}>
                                    <FileEdit className="w-4 h-4 mr-2" />
                                    Request Changes
                                </Button>
                                <Button variant="destructive" onClick={() => setActionType('reject')}>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setActionType('approve')}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
