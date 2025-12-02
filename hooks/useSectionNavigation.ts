"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export const useSectionNavigation = (isDesktop: boolean) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Register a section
  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionsRef.current.set(id, element);
    } else {
      sectionsRef.current.delete(id);
    }
  }, []);

  // Navigate to a section
  const navigateToSection = useCallback(
    (link: string) => {
      // Extract section ID from link (remove #)
      const sectionId = link.replace('#', '');
      
      if (!isDesktop) {
        // On mobile, allow normal anchor navigation
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      // On desktop, programmatic navigation
      const section = sectionsRef.current.get(sectionId);
      if (section) {
        const main = document.querySelector('main');
        if (main) {
          const sectionTop = section.offsetTop;
          main.scrollTo({ top: sectionTop, behavior: "smooth" });
        }
        setActiveSection(sectionId);
      }
    },
    [isDesktop]
  );

  // Disable all user scrolling on desktop (only programmatic navigation allowed)
  useEffect(() => {
    if (!isDesktop) {
      // Re-enable scrolling on mobile
      document.body.style.overflow = '';
      return;
    }

    // Disable body scrolling on desktop
    document.body.style.overflow = 'hidden';

    // Prevent all wheel and touch events (user cannot scroll)
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isDesktop]);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const sections = Array.from(sectionsRef.current.values());
        let scrollPosition: number;
        let scrollElement: HTMLElement | Window;

        if (isDesktop) {
          // On desktop, track scroll in main container
          const main = document.querySelector('main');
          if (!main) return;
          scrollElement = main;
          scrollPosition = main.scrollTop + main.clientHeight / 2;
        } else {
          // On mobile, track window scroll
          scrollElement = window;
          scrollPosition = window.scrollY + window.innerHeight / 2;
        }

        // Find the section that's currently in view
        for (const section of sections) {
          let sectionTop: number;
          if (isDesktop) {
            const main = document.querySelector('main');
            if (!main) return;
            sectionTop = section.offsetTop;
          } else {
            const rect = section.getBoundingClientRect();
            sectionTop = rect.top + window.scrollY;
          }
          
          const sectionHeight = section.offsetHeight;
          
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            const id = section.id;
            if (id) {
              setActiveSection(id);
            }
            break;
          }
        }
      }, 100);
    };

    if (isDesktop) {
      const main = document.querySelector('main');
      if (main) {
        main.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => {
          main.removeEventListener("scroll", handleScroll);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      }
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Initial check
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isDesktop]);

  return {
    activeSection,
    setActiveSection,
    registerSection,
    navigateToSection,
  };
};

