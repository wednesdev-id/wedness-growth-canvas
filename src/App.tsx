import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Products from "./pages/Products";
import Learn from "./pages/Learn";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/products/ProductList";
import BlogList from "./pages/admin/blog/BlogList";
import { BlogReviewQueue } from "./pages/admin/blog/BlogReviewQueue";
import LearningList from "./pages/admin/learn/LearningList";
import PortfolioList from "./pages/admin/portfolio/PortfolioList";
import TestimonialList from "./pages/admin/testimonials/TestimonialList";
import ServicePackageList from "./pages/admin/services/ServicePackageList";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Auth Provider Wrapper */}
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <GoogleAnalytics />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                {/* Admin Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="blog" element={<BlogList />} />
                  <Route path="blog/review" element={<BlogReviewQueue />} />
                  <Route path="learn" element={<LearningList />} />
                  <Route path="portfolio" element={<PortfolioList />} />
                  <Route path="testimonials" element={<TestimonialList />} />
                  <Route path="services" element={<ServicePackageList />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
