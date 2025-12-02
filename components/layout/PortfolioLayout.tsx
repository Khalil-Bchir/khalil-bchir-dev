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
    <div className={`relative bg-background text-foreground ${isDesktop ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Sidebar Navigation */}
      <SidebarNavigation 
        {...sidebarProps} 
        activeSectionId={activeSection}
        onItemClick={navigateToSection}
      />

      {/* Main Content Area */}
      <main 
        className={`relative transition-all duration-300 lg:ml-[25%] lg:w-3/4 ${isDesktop ? 'h-screen overflow-y-auto' : 'min-h-screen'}`}
        style={isDesktop ? { scrollBehavior: 'smooth' } : undefined}
      >
        {childrenWithProps}
      </main>
    </div>
  );
};

export default PortfolioLayout;

