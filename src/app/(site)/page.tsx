"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { ContactBlock } from "@/components/ContactBlock";
import { AnimatedLeaves } from "@/components/AnimatedLeaves";
import { Gallery } from "@/components/Gallery";
import { GoogleReviews } from "@/components/GoogleReviews";
import dynamic from "next/dynamic";

// Dynamically import components that are lower priority
// This helps with initial page load performance
const DynamicGallery = dynamic(() => import("@/components/Gallery").then(mod => ({ default: mod.Gallery })), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse"></div>
});

const DynamicGoogleReviews = dynamic(() => import("@/components/GoogleReviews").then(mod => ({ default: mod.GoogleReviews })), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse"></div>
});

const DynamicWhyChooseUs = dynamic(() => import("@/components/WhyChooseUs").then(mod => ({ default: mod.WhyChooseUs })), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse"></div>
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <>
      {/* Only show animated leaves on desktop for performance */}
      {!isMobile && <AnimatedLeaves />}
      
      <Hero />
      
      {/* Google Reviews section - Featured prominently as requested */}
      <DynamicGoogleReviews 
        placeId={process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || ""}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      />
      
      <Services />
      
      {/* About section (Why Choose Us) */}
      <DynamicWhyChooseUs />
      
      {/* Gallery section */}
      <DynamicGallery />
      
      {/* Add the contact block */}
      <ContactBlock />
      <CallToAction />
    </>
  );
}
