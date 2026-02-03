import { useEffect, useState } from "react";
import { DashboardService, DashboardStats } from "@/services/dashboard.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, BookOpen, GraduationCap, Briefcase, MessageSquare, Layers, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await DashboardService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!stats) return null;

    const statCards = [
        { title: "Products", value: stats.products, icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Blog Posts", value: stats.blogPosts, icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
        { title: "Learning", value: stats.learningResources, icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
        { title: "Portfolio", value: stats.portfolioProjects, icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10" },
        { title: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "text-pink-500", bg: "bg-pink-500/10" },
        { title: "Services", value: stats.servicePackages, icon: Layers, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    ];

    const chartData = [
        { name: "Products", count: stats.products, fill: "#3b82f6" },
        { name: "Blog", count: stats.blogPosts, fill: "#22c55e" },
        { name: "Learning", count: stats.learningResources, fill: "#a855f7" },
        { name: "Portfolio", count: stats.portfolioProjects, fill: "#f97316" },
        { name: "Testimonials", count: stats.testimonials, fill: "#ec4899" },
        { name: "Services", count: stats.servicePackages, fill: "#06b6d4" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to the WednesDev Growth Canvas Admin Panel. Here's a quick overview of your content.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${item.bg}`}>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Chart */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Content Distribution</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="name"
                                    className="text-xs font-medium text-muted-foreground"
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    className="text-xs font-medium text-muted-foreground"
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid hsl(var(--border))',
                                        backgroundColor: 'hsl(var(--card))'
                                    }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
