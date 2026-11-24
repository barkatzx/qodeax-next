export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
];

export const footerNavigation = {
  company: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact", href: "/#contact" },
  ],
  product: [
    { label: "QDMS overview", href: "/products" },
    { label: "Capabilities", href: "/products#capabilities" },
    { label: "Book a demo", href: "https://calendly.com/barkatzx" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
