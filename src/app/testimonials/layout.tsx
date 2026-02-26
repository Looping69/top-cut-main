import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Top Cut Tree Felling",
  description: "Read what our satisfied customers have to say about our professional tree services.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 