import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useDeviceType() {
  const [device, setDevice] = React.useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < MOBILE_BREAKPOINT) {
        setDevice("mobile");
      } else if (width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
    device,
  };
}
