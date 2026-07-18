import { useState, useEffect } from "react";

function useCheckResize(breakpoint = 768 ) {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useCheckResize