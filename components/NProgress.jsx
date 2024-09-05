// components/NProgress.js
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the CSS for the progress bar

NProgress.configure({ showSpinner: false });

const NProgressComponent = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [pathname]);

  return null;
};

export default NProgressComponent;
