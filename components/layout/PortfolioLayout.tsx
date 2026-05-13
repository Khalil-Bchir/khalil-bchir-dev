"use client";

import React, { useEffect, useState } from "react";
import SidebarNavigation, { SidebarNavigationProps } from "./SidebarNavigation";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

export interface PortfolioLayoutProps {
  children: React.ReactNode;
  sidebarProps?: SidebarNavigationProps;
}

export const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({
  children,
  sidebarProps,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { activeSection, registerSection, navigateToSection } = useSectionNavigation(isDesktop);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Clone children to inject section registration
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        registerSection,
        navigateToSection,
        isDesktop,
      } as any);
    }
    return child;
  });

  return (
    <div
      className={`relative min-h-screen bg-background text-foreground ${
        isDesktop ? "lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-hidden" : ""
      }`}
    >
      {/* Sidebar Navigation */}
      <SidebarNavigation
        {...sidebarProps}
        activeSectionId={activeSection}
        onItemClick={navigateToSection}
      />

      {/* Main: scroll container on lg; document scroll on smaller viewports */}
      <main
        className={`relative min-h-screen w-full max-w-full transition-all duration-300 lg:ml-[25%] lg:w-3/4 ${
          isDesktop
            ? "lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-y-auto lg:overscroll-y-contain"
            : "max-lg:scroll-pt-[calc(env(safe-area-inset-top,0px)+3.75rem)] max-lg:pt-[calc(env(safe-area-inset-top,0px)+3.75rem)]"
        }`}
        style={isDesktop ? { scrollBehavior: "smooth" } : { scrollBehavior: "smooth" }}
      >
        {childrenWithProps}
      </main>
    </div>
  );
};

export default PortfolioLayout;

