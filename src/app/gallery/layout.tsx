import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Top Cut Tree Felling",
  description: "View our portfolio of completed tree service projects including tree felling, trimming, and stump removal.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 