import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold" style={{color: '#111218'}}>404</h1>
        <p className="mb-4 text-xl" style={{color: '#111218'}}>Oops! Page not found</p>
        <a href="/" className="underline hover:text-primary/80" style={{color: '#111218'}}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
