// This file will act as the layout for all pages within the /blog directory.
// It automatically inherits the Navbar and Footer from the root layout.

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now, this layout simply renders the page content (the 'children').
  // In the future, we could add a sidebar or other blog-specific elements here.
  return <section>{children}</section>;
}
