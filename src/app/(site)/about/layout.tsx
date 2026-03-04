import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Top Cut Tree Felling",
  description: "Learn about Top Cut Tree Felling, an owner-operated tree service company with over 4 years of experience in South Africa.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 