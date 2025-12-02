"use client";

import { useEffect, useState } from "react";

/**
 * Hook to get theme colors from CSS custom properties
 * Converts oklch colors to hex for use in components that expect hex values
 */
export const useThemeColors = () => {
  const [colors, setColors] = useState({
    primary: "#8B5CF6", // Fallback
    accent: "#8B5CF6",
    sidebar: "#FFFFFF",
    sidebarForeground: "#1F1F1F",
  });

  useEffect(() => {
    const getCSSVariable = (varName: string, fallback: string) => {
      if (typeof window === "undefined") return fallback;
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      return value || fallback;
    };

    // Convert oklch to hex (simplified - uses computed style which browser converts)
    const getColorAsHex = (varName: string, fallback: string) => {
      if (typeof window === "undefined") return fallback;
      
      // Create a temporary element to get computed color
      const tempEl = document.createElement("div");
      tempEl.style.color = `var(${varName})`;
      tempEl.style.position = "absolute";
      tempEl.style.visibility = "hidden";
      document.body.appendChild(tempEl);
      
      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
      
      // Convert rgb/rgba to hex
      if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
        const rgb = computedColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const r = parseInt(rgb[0]).toString(16).padStart(2, "0");
          const g = parseInt(rgb[1]).toString(16).padStart(2, "0");
          const b = parseInt(rgb[2]).toString(16).padStart(2, "0");
          return `#${r}${g}${b}`.toUpperCase();
        }
      }
      
      return fallback;
    };

    const updateColors = () => {
      setColors({
        primary: getColorAsHex("--sidebar-primary", "#8B5CF6"),
        accent: getColorAsHex("--sidebar-primary", "#8B5CF6"), // Use sidebar-primary as accent
        sidebar: getColorAsHex("--sidebar", "#FFFFFF"),
        sidebarForeground: getColorAsHex("--sidebar-foreground", "#1F1F1F"),
      });
    };

    // Initial update
    updateColors();

    // Update colors when theme changes (class attribute on html element)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Small delay to ensure CSS variables are updated
          setTimeout(updateColors, 50);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Also listen for storage changes (in case theme is changed in another tab)
    const handleStorageChange = () => {
      setTimeout(updateColors, 50);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return colors;
};

