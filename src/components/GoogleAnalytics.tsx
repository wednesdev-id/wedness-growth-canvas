import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize GA4 only once
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

        if (measurementId) {
            if (!window.ga_initialized) {
                ReactGA.initialize(measurementId);
                window.ga_initialized = true;
            }

            // Send pageview with a custom path
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        } else {
            console.warn("GA Measurement ID is missing in .env");
        }
    }, [location]);

    return null;
};

// Add type definition for the global window object to avoid TS errors
declare global {
    interface Window {
        ga_initialized?: boolean;
    }
}

export default GoogleAnalytics;
