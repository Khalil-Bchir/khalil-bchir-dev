"use client";

import React, { useEffect, useState, useRef } from "react";
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTheme } from "@/contexts/ThemeContext";

const defaultSidebarLogo = (
    <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden
        >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
        <span className="font-semibold text-base tracking-tight">Khalil Bchir</span>
    </>
);

export interface SidebarNavigationProps {
    menuItems?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    logoUrl?: string;
    /** Replaces default zap + name branding when set */
    logoContent?: React.ReactNode;
    accentColor?: string;
    colors?: string[];
    activeSectionId?: string;
    onItemClick?: (link: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
    menuItems = [],
    socialItems = [],
    logoUrl,
    logoContent,
    accentColor,
    colors,
    activeSectionId,
    onItemClick,
}) => {
    const themeColors = useThemeColors();
    const { theme } = useTheme(); // Track theme changes to force re-render
    
    // Use theme colors as defaults if not provided
    const accent = accentColor || themeColors.primary;
    const sidebarColors = colors || [
        themeColors.sidebar,
        themeColors.primary,
    ];
    const [isDesktop, setIsDesktop] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const mountedRef = useRef(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const desktop = window.innerWidth >= 1024; // lg breakpoint
            setIsDesktop(desktop);
            // On desktop, always keep sidebar open
            if (desktop) {
                setIsOpen(true);
            } else if (!mountedRef.current) {
                setIsOpen(false);
            }
            mountedRef.current = true;
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleMenuOpen = () => {
        if (!isDesktop) {
            setIsOpen(true);
        }
    };

    const handleMenuClose = () => {
        if (!isDesktop) {
            setIsOpen(false);
        }
    };

    const brand = logoContent ?? defaultSidebarLogo;

    // On desktop, render sidebar always visible
    if (isDesktop) {
        return (
                <aside className="fixed inset-y-0 left-0 z-50 w-1/4 overflow-hidden border rounded-lg m-4">
                    <StaggeredMenu
                        key={`sidebar-${theme}`}
                        position="left"
                        colors={sidebarColors}
                        items={menuItems}
                        socialItems={socialItems}
                        displaySocials={true}
                        displayItemNumbering={true}
                        logoUrl={logoUrl}
                        logoContent={brand}
                        menuButtonColor={themeColors.sidebarForeground}
                        openMenuButtonColor={themeColors.sidebarForeground}
                        accentColor={accent}
                        isFixed={true}
                        sidebarMode={true}
                        changeMenuColorOnOpen={false}
                        closeOnClickAway={false}
                        activeSectionId={activeSectionId}
                        onItemClick={onItemClick}
                        className="h-full"
                    />
                </aside>
        );
    }

    // On mobile/tablet, render slide-in menu
    // StaggeredMenu handles its own toggle button and animations
    return (
        <div className="pointer-events-none fixed inset-y-0 left-0 z-50 w-full lg:hidden">
            {/* Pass-through clicks to main (e.g. project links); interactive bits use pointer-events-auto */}
            <StaggeredMenu
                key={`mobile-menu-${theme}`}
                position="left"
                colors={sidebarColors}
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                logoUrl={logoUrl}
                logoContent={brand}
                menuButtonColor={themeColors.sidebarForeground}
                openMenuButtonColor={themeColors.sidebarForeground}
                accentColor={accent}
                isFixed={false}
                changeMenuColorOnOpen={true}
                closeOnClickAway={true}
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                className="h-full"
            />
        </div>
    );
};

export default SidebarNavigation;

