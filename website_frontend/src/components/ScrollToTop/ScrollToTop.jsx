import { useEffect } from "react";
import { useLocation } from "react-router";

// Scrolls the window to the top whenever the route (pathname) changes.
export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
