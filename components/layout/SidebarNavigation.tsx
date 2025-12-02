"use client";

import React, { useEffect, useState, useRef } from "react";
import { StaggeredMenu, StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTheme } from "@/contexts/ThemeContext";

export interface SidebarNavigationProps {
    menuItems?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    logoUrl?: string;
    accentColor?: string;
    colors?: string[];
    activeSectionId?: string;
    onItemClick?: (link: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
    menuItems = [],
    socialItems = [],
    logoUrl,
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
        <div className="fixed inset-y-0 left-0 z-50 w-full lg:hidden">
            <StaggeredMenu
                key={`mobile-menu-${theme}`}
                position="left"
                colors={sidebarColors}
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                logoUrl={logoUrl}
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

