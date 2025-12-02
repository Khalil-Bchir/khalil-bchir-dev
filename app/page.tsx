import { PortfolioLayout } from "@/components/layout";
import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/sections";
import { StaggeredMenuItem, StaggeredMenuSocialItem } from "@/components/StaggeredMenu";

// Navigation menu items
const menuItems: StaggeredMenuItem[] = [
  {
    label: "Home",
    ariaLabel: "Go to home section",
    link: "#hero",
  },
  {
    label: "About",
    ariaLabel: "Go to about section",
    link: "#about",
  },
  {
    label: "Projects",
    ariaLabel: "Go to projects section",
    link: "#projects",
  },
  {
    label: "Contact",
    ariaLabel: "Go to contact section",
    link: "#contact",
  },
];

// Social links
const socialItems: StaggeredMenuSocialItem[] = [
  {
    label: "GitHub",
    link: "https://github.com/yourusername",
  },
  {
    label: "LinkedIn",
    link: "https://linkedin.com/in/yourprofile",
  },
  {
    label: "Twitter",
    link: "https://twitter.com/yourusername",
  },
];

export default function Home() {
  return (
    <PortfolioLayout
      sidebarProps={{
        menuItems,
        socialItems,
        // Colors will be automatically pulled from theme via useThemeColors hook
      }}
    >
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </PortfolioLayout>
  );
}
