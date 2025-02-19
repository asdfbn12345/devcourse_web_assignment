import { useEffect, useState } from "react";
import { getTheme } from "styles/theme";

export const useMediaQuery = () => {
  const mobileMediaQuery = getTheme("light").mediaQuery.mobile;
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(mobileMediaQuery).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileMediaQuery);
    setIsMobile(mediaQuery.matches);
  }, []);

  return { isMobile };
};
