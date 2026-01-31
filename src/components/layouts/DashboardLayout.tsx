import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    Package,
    BookOpen,
    GraduationCap,
    Briefcase,
    MessageSquare,
    Layers,
    LogOut,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Blog Posts", href: "/dashboard/blog", icon: BookOpen },
    { label: "Learning", href: "/dashboard/learn", icon: GraduationCap },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
    { label: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
    { label: "Services", href: "/dashboard/services", icon: Layers },
];

const Sidebar = ({ className }: { className?: string }) => {
    const { pathname } = useLocation();

    return (
        <div className={cn("pb-12 bg-card border-r border-border h-full", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
                        Admin Panel
                    </h2>
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.href} to={item.href}>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardLayout = () => {
    const { user, isLoading, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-background">
            {/* Mobile Sidebar */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
                <span className="font-bold text-lg">Admin Panel</span>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 flex-shrink-0">
                <Sidebar className="fixed w-64 min-h-screen" />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex h-16 items-center justify-end gap-4 border-b border-border bg-card px-6">
                    <span className="text-sm text-muted-foreground">
                        {user.email}
                    </span>
                    <Button variant="destructive" size="sm" onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </header>
                <div className="p-6 md:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
