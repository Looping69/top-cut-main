import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Top Cut Tree Felling",
  description: "Explore our comprehensive range of professional tree services including tree felling, trimming, stump removal, and more.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 