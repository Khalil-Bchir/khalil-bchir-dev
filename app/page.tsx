import { PortfolioLayout } from "@/components/layout";
import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/modules/home";
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
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/mohamed-khalil-bchir/",
  },
  {
    label: "GitHub",
    link: "https://github.com/Khalil-Bchir",
  },
  {
    label: "Upwork",
    link: "https://www.upwork.com/freelancers/~0119a7bea10c4d7b73?mp_source=share",
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
