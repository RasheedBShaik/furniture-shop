import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This scrolls the window to the top-left corner whenever the URL path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything visually
};

export default ScrollToTop;